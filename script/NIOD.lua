-- Thanks to Drex from Dynamic DCS for all the help on sockets, go check his server out

package.path = package.path .. ";.\\LuaSocket\\?.lua;"
package.cpath = package.cpath .. ";.\\LuaSocket\\?.dll;"

local socket = require("socket")
local JSON = loadfile("Scripts\\JSON.lua")()
local niod = {}

local templateGroups = {}
local templateZones = {}
local triggers = {}
local A2ADispatchers = {}

local triggerScheduler =
	SCHEDULER:New(
	nil,
	function()
		checkTriggers()
		niod.send(formGroupInfoPayload(getGroupsInfo()))
		niod.checkTimeout()
	end,
	{},
	5,
	1
)

niod.scope = "127.0.0.1"
niod.port = 15487
niod.DATA_TIMEOUT_SEC = 0.2

niod.JSON = JSON
niod.isDev = true

niod.eventHandler = {
	handleEvents = true
}

niod.tcp = socket.tcp()
niod.tcp:settimeout(0)

-- Util functions

function niod.log(message)
	if message then
		env.info(message)
	end
end

function niod.setDevEnv(isDev)
	env.setErrorMessageBoxEnabled(niod.isDev)
end

function registerZone(zoneName)
	if not templateZones[zoneName] then
		if trigger.misc.getZone(zoneName) then
			templateZones[zoneName] = ZONE:New(zoneName)
		elseif GROUP:FindByName(zoneName) then
			templateZones[zoneName] = ZONE_POLYGON:New(zoneName, GROUP:FindByName(zoneName))
		else
			niod.log(
				"ERROR: couldn't register zone " ..
					zoneName .. " . It's neither a TriggerZone nor a group suitable for Polygon Zones"
			)
			return nil
		end
	end
	return templateZones[zoneName]
end

function newSpawnTemplate(args)
	templateGroups[args.groupName] = SPAWN:New(args.groupName)
	return templateGroups[args.groupName]
end

-- MOOSE functions wrappers
niod.mooseFunctions = {
	spawn = function(args)
		if not args.groupName then
			return 0
		end
		if not templateGroups[args.groupName] then
			newSpawnTemplate(args)
		end
		return templateGroups[args.groupName]:Spawn():GetName()
	end,
	spawnInZone = function(args)
		if not args.zoneName or not args.groupName then
			return 0
		end
		local randomize = true
		if not templateGroups[args.groupName] then
			newSpawnTemplate(args)
		end
		if not templateZones[args.zoneName] then
			registerZone(args.zoneName)
		end
		if args.randomize then
			randomize = args.randomize
		end
		return templateGroups[args.groupName]:SpawnInZone(templateZones[args.zoneName], randomize):GetName()
	end,
	addA2ADispatcher = function(args)
		addA2ADispatcher(args)
		return 1
	end
}

-- Triggers

function addTrigger(args)
	table.insert(triggers, args)
end

function checkTriggers()
	for i = 1, #triggers do
		checkTrigger(triggers[i])
	end
end

function checkTrigger(trigger)
	if trigger.data.type == "GroupPartlyOrCompletelyInZone" then
		checkGroupPartlyOrCompletelyInZone(trigger)
	end
end

function checkGroupPartlyOrCompletelyInZone(trigger)
	local group = GROUP:FindByName(trigger.data.groupName)
	local zone = ZONE:FindByName(trigger.data.zoneName)
	if not group or not zone then
		return
	end
	if group:IsPartlyOrCompletelyInZone(zone) then
		niod.sendTrigger(
			{
				type = "trigger",
				callbackId = trigger.callbackId,
				data = {}
			}
		)
		if trigger.data.frequency == "once" then
			removeTrigger(trigger.callbackId)
		end
	end
end

function removeTrigger(id)
	for i = 1, #triggers do
		if triggers[i].callbackId == id then
			table.remove(triggers, i)
		end
	end
end

-- A2A Dispatcher

function addA2ADispatcher(data)
	if not data then
		niod.log("Error trying to add an A2A Dispatcher, no data provided")
		return
	end

	A2ADispatchers[data.name] = {}

	A2ADispatchers[data.name].detectionSet = SET_GROUP:New()
	A2ADispatchers[data.name].detectionSet:FilterPrefixes(data.detection.prefixes)
	A2ADispatchers[data.name].detectionSet:FilterStart()

	A2ADispatchers[data.name].detectionArea =
		DETECTION_AREAS:New(A2ADispatchers[data.name].detectionSet, data.detection.range)

	A2ADispatchers[data.name].dispatcher = AI_A2A_DISPATCHER:New(A2ADispatchers[data.name].detectionArea)

	A2ADispatchers[data.name].border = registerZone(data.border.name)
	if not A2ADispatchers[data.name].border then
		niod.log("couldn't find the zone to define the border, aborting...")
		A2ADispatchers[data.name] = {}
		return
	end
	A2ADispatchers[data.name].dispatcher:SetBorderZone({A2ADispatchers[data.name].border})

	A2ADispatchers[data.name].dispatcher:SetEngageRadius(data.engageRadius)

	for i = 1, #data.squadrons do
		A2ADispatchers[data.name].dispatcher:SetSquadron(
			data.squadrons[i].name,
			AIRBASE[data.squadrons[i].map][data.squadrons[i].airbase],
			{data.squadrons[i].name},
			data.squadrons[i].number
		)
		A2ADispatchers[data.name].dispatcher:SetSquadronGrouping(data.squadrons[i].name, data.squadrons[i].groupLength)
		A2ADispatchers[data.name].dispatcher:SetSquadronTakeoff(
			data.squadrons[i].name,
			AI_A2A_DISPATCHER.Takeoff[data.squadrons[i].takeoffMethod]
		)
		A2ADispatchers[data.name].dispatcher:SetSquadronLanding(
			data.squadrons[i].name,
			AI_A2A_DISPATCHER.Landing[data.squadrons[i].landingMethod]
		)
		if data.squadrons[i].cap then
			registerZone(data.squadrons[i].cap.zoneName)

			A2ADispatchers[data.name].dispatcher:SetSquadronCap(
				data.squadrons[i].name,
				templateZones[data.squadrons[i].cap.zoneName],
				data.squadrons[i].cap.minCAPAlt,
				data.squadrons[i].cap.maxCAPAlt,
				data.squadrons[i].cap.minCAPSpeed,
				data.squadrons[i].cap.maxCAPSpeed,
				data.squadrons[i].cap.minCAPInterceptSpeed,
				data.squadrons[i].cap.maxCAPInterceptSpeed,
				data.squadrons[i].cap.mesureType --"BARO" or "RADIO"
			)
			A2ADispatchers[data.name].dispatcher:SetSquadronCapInterval(
				data.squadrons[i].name,
				data.squadrons[i].cap.numberPerGroup,
				data.squadrons[i].cap.lowerCheckTime,
				data.squadrons[i].cap.upperCheckTime,
				data.squadrons[i].cap.decisionWeight
			)
		elseif data.squadrons[i].gci then
			A2ADispatchers[data.name].dispatcher:SetSquadronGci(
				data.squadrons[i].name,
				data.squadrons[i].gci.minInterceptSpeed,
				data.squadrons[i].gci.maxInterceptSpeed
			)
		end
	end
	A2ADispatchers[data.name].dispatcher:Start()
end

function getGroupsInfo()
	local groups = {}
	local groupsSet = SET_GROUP:New():FilterStart()
	groupsSet:ForEach(
		function(group)
			local groupInfo = {}
			groupInfo.coalitionName = group:GetCoalitionName()
			groupInfo.categoryName = group:GetCategoryName()
			groupInfo.country = group:GetCountry()
			groupInfo.units = {}
			for UnitId, UnitData in pairs(group:GetUnits()) do
				local unit = {}
				unit.fuel = UnitData:GetFuel()
				unit.callsign = UnitData:GetCallsign()
				unit.inAir = UnitData:InAir()
				unit.isActive = UnitData:IsActive()
				unit.isAlive = UnitData:IsAlive()
				unit.name = UnitData:Name()
				unit.pitch = UnitData:GetPitch()
				unit.roll = UnitData:GetRoll()
				unit.yaw = UnitData:GetYaw()
				unit.position = UnitData:GetPosition()
				table.insert(groupInfo.units, unit)
			end
			table.insert(groups, groupInfo)
		end
	)
	return groups
end

function formGroupInfoPayload(groups)
	return {
		type = "groupInfo",
		callbackId = "groupInfo",
		data = groups
	}
end

-- NIOD functions

function niod.bind()
	local bound, error = niod.tcp:bind(niod.scope, niod.port)
	if not bound then
		niod.log("Could not bind: " .. error)
		return
	end
	niod.log("Port " .. niod.port .. " bound")
	local serverStarted, error = niod.tcp:listen(1)
	if not serverStarted then
		niod.log("Could not start server: " .. error)
		return
	end
	niod.log("Server started")
end
function niod.checkJSON(jsonstring, code)
	if code == "encode" then
		if type(niod.JSON:encode(jsonstring)) ~= "string" then
			error("encode expects a string after function")
		end
	end
	if code == "decode" then
		if type(jsonstring) ~= "string" then
			error("decode expects string")
		end
	end
end

function niod.eventHandler.onEvent(event)
	niod.log("event")
	niod.log(event)
end

function niod.processRequest(request)
	local response = {}
	if request and request.type and request.callbackId then
		response.type = request.type
		response.callbackId = request.callbackId
		if request.data then
			if request.type == "function" and request.data.name then
				response.data = niod.mooseFunctions[request.data.name](request.data.args)
			elseif request.type == "trigger" and request.data then
				addTrigger(request)
				response.type = "triggerInit"
				response.data = {}
			elseif request.type == "noTimeout" then
				response.data = {}
			end
		end
	end
	return response
end

function niod.step()
	if not niod.client then
		niod.client = niod.tcp:accept()
		if niod.client then
			niod.client:settimeout(0)
			niod.log("Connection established")
		end
	end
	if niod.client then
		local line, err = niod.client:receive("*l")
		--niod.client:send('\n')
		local data = {}
		if line ~= nil then
			local success, error = pcall(niod.checkJSON, line, "decode")
			if success then
				local incMsg = niod.JSON:decode(line)
				niod.log(incMsg)
				data = niod.processRequest(incMsg)
			else
				niod.log("Error: " .. error)
			end
		end
		-- if there was no error, send it back to the niod.client
		if not err and data then
			local dataPayload = data --getDataMessage()
			niod.send(dataPayload)
		end
	end
end

function niod.sendTrigger(data)
	local dataPayload = data
	niod.send(dataPayload)
end

function niod.checkTimeout()
	local dataPayload = {
		type = "noTimeout",
		callbackId = "noTimeout",
		data = {}
	}
	niod.send(dataPayload)
end

function niod.send(dataPayload)
	if not niod.client then
		niod.log("Error: Connection lost")
		return
	end
	local success, error = pcall(niod.checkJSON, dataPayload, "encode")
	if success then
		local outMsg = niod.JSON:encode(dataPayload)
		local bytes, status, lastbyte = niod.client:send(outMsg .. "\n")
		if not bytes then
			niod.log("Error: Connection lost")
			niod.client = nil
		end
	else
		niod.log("Error: " .. error)
	end
end

niod.setDevEnv()
niod.bind()
world.addEventHandler(niod.eventHandler)

timer.scheduleFunction(
	function(arg, time)
		local success, error = pcall(niod.step)
		if not success then
			niod.log("Error: " .. error)
		end
		return timer.getTime() + niod.DATA_TIMEOUT_SEC
	end,
	nil,
	timer.getTime() + niod.DATA_TIMEOUT_SEC
)

niod.log("Started NIOD")
