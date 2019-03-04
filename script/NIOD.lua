-- Thanks to Drex from Dynamic DCS for all the help on sockets, go check his server out

package.path  = package.path..";.\\LuaSocket\\?.lua;"
package.cpath = package.cpath..";.\\LuaSocket\\?.dll;"

local socket = require('socket')
local JSON = loadfile("Scripts\\JSON.lua")()
local niod = {}

local templateGroups = {}
local templateZones = {}


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

-- Native functions wrappers
niod.mooseFunctions = {
	registerZone = function(args)
		templateZones[args.zoneName] = ZONE:New( args.zoneName )
		return 1
	end,
	newSpawnTemplate = function(args)
		templateGroups[args.groupName] = SPAWN:New( args.groupName )
		return 1
	end,
	spawn = function(args)
		if not args.groupName then
			return 0
		end
		if not templateGroups[args.groupName] then
			niod.mooseFunctions["newSpawnTemplate"](args)
		end
		return templateGroups[args.groupName]:Spawn():GetName()
	end,
	spawnInZone = function(args)
		if not args.zoneName or not args.groupName then
			return 0
		end
		local randomize = true
		if not templateGroups[args.groupName] then
			niod.mooseFunctions["newSpawnTemplate"](args)
		end
		if not templateZones[args.zoneName] then
			niod.mooseFunctions["registerZone"](args)
		end
		if not args.randomize then
			randomize = args.randomize
		end
		return templateGroups[args.groupName]:SpawnInZone(templateZones[args.zoneName], randomize):GetName()
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
				niod.log("Processing native function")
				response.data = niod.mooseFunctions[request.data.name](request.data.args)
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

niod.setDevEnv()
niod.bind()
world.addEventHandler(niod.eventHandler)

timer.scheduleFunction(function(arg, time)
	local success, error = pcall(niod.step)
	if not success then
		niod.log("Error: " .. error)
	end
	return timer.getTime() + niod.DATA_TIMEOUT_SEC
end, nil, timer.getTime() + niod.DATA_TIMEOUT_SEC)


niod.log("Started NIOD")