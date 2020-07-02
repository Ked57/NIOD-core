package.path = package.path .. ";.\\LuaSocket\\?.lua"
package.cpath = package.cpath .. ";.\\LuaSocket\\?.dll"

local socket = require("socket")
local JSON = loadfile("Scripts\\JSON.lua")()

niod = {}
niod.isDev = true
niod.host = "127.0.0.1"
niod.clientPort = 15487
niod.serverPort = 15488
niod.dataTimeoutSec = 0.2

niod.functions = {}

niod.udpClient = socket.udp()
assert(niod.udpClient:setpeername(niod.host, niod.clientPort))

niod.udpServer = socket.udp()
assert(niod.udpServer:settimeout(0))
assert(niod.udpServer:setsockname(niod.host, niod.serverPort))

-- NIOD UTILS
function niod.log(msg, indent)
    if type(msg) ~= "table" then
        env.info("NIOD => " .. msg)
        return
    end
    if not indent then indent = 0 end
    for k, v in pairs(msg) do
        formatting = string.rep("  ", indent) .. k .. ": "
        if type(v) == "table" then
            env.info(formatting)
            niod.log(v, indent + 1)
        elseif type(v) == 'boolean' then
            env.info(formatting .. tostring(v))
        else
            env.info(formatting .. tostring(v))
        end
    end
end

function niod.setDevEnv(isDev) env.setErrorMessageBoxEnabled(isDev) end

-- NIOD FUNCTIONS --

function niod.functions.log(args)
    niod.log(args.message)
    return {message = args.message}
end

--
function niod.handleFunction(request)
    local result = niod.functions[request.payload.functionName](
                       request.payload.args)
    if type(result) ~= "table" then result = {} end
    local response = {
        id = request.id,
        type = "received",
        sent = os.time(),
        payload = result
    }
    niod.send(response)
end

function niod.handle(request)
    if not request.id or not request.type or not request.payload then
        niod.log("ERROR: Received a unvalid request")
        return
    end
    if request.type == "function" then niod.handleFunction(request) end
end

function niod.send(payload)
    niod.udpClient:send(JSON:encode(payload))
    --[[ niod.log({
        sent = payload
    })]] --
end

function niod.receive(args, time)
    local request = niod.udpServer:receive()
    if request ~= nil then
        -- niod.log(request)
        local decodedRequest = JSON:decode(request)
        --[[ niod.log({
            received = decodedRequest
        }) ]] --
        niod.handle(decodedRequest)
    end
    return time + niod.dataTimeoutSec
end

function JSON:onDecodeError(message)
    niod.log("ERROR: While decoding JSON data -> " .. message)
    timer.scheduleFunction(niod.receive, {},
                           timer.getTime() + niod.dataTimeoutSec)
end

timer.scheduleFunction(niod.receive, {}, timer.getTime() + niod.dataTimeoutSec)

niod.setDevEnv(niod.isDev)
niod.log("Started NIOD")
