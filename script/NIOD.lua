package.path  = package.path..";.\\LuaSocket\\?.lua;"
package.cpath = package.cpath..";.\\LuaSocket\\?.dll;"

local socket = require('socket')
local JSON = loadfile("Scripts\\JSON.lua")()
local niod = {}

niod.scope = "127.0.0.1"
niod.port = 15487
niod.DATA_TIMEOUT_SEC = 0.2
niod.JSON = JSON

niod.tcp = socket.tcp()
niod.tcp:settimeout(0)

-- Util functions

function niod.log(message)
    if message then
        env.info(message)
    end
end

-- Native functions wrappers
niod.nativeFunctions = {
	getGroups = function(args)
		local groups = {}
		if args then
			local dcsGroups = coalition.getGroups(args[1])
			for i,v in ipairs(dcsGroups) do
				local group = {}
				group.id = v:getID()
				group.isExist = v:isExist()
				group.category = v:getCategory()
				group.coalition = v:getCoalition()
				group.name = v:getName()
				local units = v:getUnits()
				group.units = {}
				for ui,uv in ipairs(units) do
					local unit = {}
					unit.isActive = uv:isActive()
					unit.desc = uv:getDesc()
					unit.playerName = uv:getPlayerName()
					unit.id = uv:getID()
					unit.index = uv:getNumber()
					unit.detectedTarget = uv:getController():getDetectedTargets()
					unit.callsign = uv:getCallsign()
					unit.life = uv:getLife()
					unit.maxLife = uv:getLife0()
					unit.fuel = uv:getFuel()
					unit.ammo = uv:getAmmo()
					unit.sensors = uv:getSensors()
					unit.hasRadar, unit.target = uv:getRadar()
					table.insert(group.units, unit)
				end
				group.size = v:getSize()
				group.initialSize = v:getInitialSize()
				local controller = v:getController()
				group.hasTask = controller:hasTask()
				table.insert(groups, group)
			end
		end
		return groups
	end
}

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
	if code == 'encode' then
		if type(niod.JSON:encode(jsonstring)) ~= "string" then
			error("encode expects a string after function")
		end
	end
	if code == 'decode' then
		if type(jsonstring) ~= "string" then
			error("decode expects string")
		end
	end
end

function niod.handleEvent()
--handle events here
end

function niod.processRequest(request)
    local response = {}
    if request and request.type and request.callbackId then
    	response.type = request.type
    	response.callbackId = request.callbackId
		if request.data then
			if request.type == "function" and request.data.name then
				niod.log("Processing native function")
				response.data = niod.nativeFunctions[request.data.name](request.data.args)
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
		local line, err = niod.client:receive('*l')
		--niod.client:send('\n')
        local data = {}
		if line ~= nil then
			niod.log(line)
			local success, error = pcall(niod.checkJSON, line, 'decode')
			if success then
                local incMsg = niod.JSON:decode(line)
                niod.log(incMsg)
				data = niod.processRequest(incMsg);
			else
				niod.log("Error: " .. error)
			end
		end
		-- if there was no error, send it back to the niod.client
		if not err and data then
			local dataPayload = data --getDataMessage()
			local success, error = pcall(niod.checkJSON, dataPayload, 'encode')
			if success then
				local outMsg = niod.JSON:encode(dataPayload)
				local bytes, status, lastbyte = niod.client:send(outMsg .. "\n")
				if not bytes then
					niod.log("Connection lost")
					niod.client = nil
				end;
			else
				niod.log("Error: " .. error)
			end
		end
	end
end

niod.bind()

timer.scheduleFunction(function(arg, time)
	local success, error = pcall(niod.step)
	if not success then
		niod.log("Error: " .. error)
	end
	return timer.getTime() + niod.DATA_TIMEOUT_SEC
end, nil, timer.getTime() + niod.DATA_TIMEOUT_SEC)


niod.log("Started NIOD")