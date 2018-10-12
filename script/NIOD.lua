local socket = require('socket')
niod = {}

niod.scope = "127.0.0.1"
niod.port = 15487
niod.DATA_TIMEOUT_SEC = 0.2

niod.tcp = socket.tcp()
niod.tcp:settimeout(0)

-- functions

function niod.log(message)
    if message then
        env.info("[NIOD] "..message)
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
		if type(JSON:encode(jsonstring)) ~= "string" then
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
    if request AND request.type AND request.callbackId
    response.type = request.type
    response.callbackId = request.callbackId
    response.data = {
        message = "hey"
    }
end

local client
function niod.step()
	if not client then
		client = niod.tcp:accept()
		niod.tcp:settimeout(0)
			if client then
			niod.log("Connection established")
			--send all unit updates
			update()
		end
	end
	if client then
        local line, err = client:receive('*l')
        local data = {}
		if line ~= nil then
			niod.log(line)
			local success, error = pcall(checkJSON, line, 'decode')
			if success then
                local incMsg = JSON:decode(line)
                niod.log(incMsg)
				data = niod.processRequest(incMsg);
			else
				niod.log("Error: " .. error)
			end
		end
		-- if there was no error, send it back to the client
		if not err then
			local dataPayload = data --getDataMessage()
			local success, error = pcall(checkJSON, dataPayload, 'encode')
			if success then
				local outMsg = JSON:encode(dataPayload)
				local bytes, status, lastbyte = client:send(outMsg .. "\n")
				if not bytes then
					niod.log("Connection lost")
					client = nil
				end;
			else
				niod.log("Error: " .. error)
			end
		else
			niod.log("Connection lost")
			client = nil
		end
	end
end

niod.log("Starting NIOD")

timer.scheduleFunction(function(arg, time)
	local success, error = pcall(niod.step)
	if not success then
		niod.log("Error: " .. error)
	end
	return timer.getTime() + niod.DATA_TIMEOUT_SEC
end, nil, timer.getTime() + niod.DATA_TIMEOUT_SEC)