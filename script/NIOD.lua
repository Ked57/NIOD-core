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

-- functions

function niod.log(message)
    if message then
        env.info(message)
    end
end

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
    	response.data = {
    	    message = "hey"
		}
	end
	return response
end


function niod.step()
	if not niod.client then
		niod.client = niod.tcp:accept()
			if niod.client then
			niod.client:settimeout(0)
			niod.log("Connection established")
			--send all unit updates
			--niod.update()
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
				niod.log("sent this back:")
				niod.log(outMsg)
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