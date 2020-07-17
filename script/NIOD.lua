package.path = package.path .. ";.\\LuaSocket\\?.lua"
package.cpath = package.cpath .. ";.\\LuaSocket\\?.dll"

local socket = require("socket")
local JSON = loadfile("Scripts\\JSON.lua")()

niod = {}
niod.isDev = false
niod.host = "127.0.0.1"
niod.clientPort = 15487
niod.serverPort = 15488
niod.dataTimeoutSec = 0.2

niod.functions = {}
niod.eventHandler = {}

niod.udpClient = socket.udp()
assert(niod.udpClient:setpeername(niod.host, niod.clientPort))

niod.udpServer = socket.udp()
assert(niod.udpServer:settimeout(0))
assert(niod.udpServer:setsockname(niod.host, niod.serverPort))

-- NIOD UTILS
function niod.log(msg, indent)
    if type(msg) ~= "table" then
        env.info(timer.getTime() .. " [NIOD] => " .. msg)
        return
    end
    env.info(timer.getTime() .. " [NIOD] Table => ")
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

function niod.err(msg, indent)
    if type(msg) ~= "table" then
        env.error(timer.getTime() .. " [NIOD] ERROR => " .. msg)
        return
    end
    env.error(timer.getTime() .. " [NIOD] ERROR Table => ")
    if not indent then indent = 0 end
    for k, v in pairs(msg) do
        formatting = string.rep("  ", indent) .. k .. ": "
        if type(v) == "table" then
            env.error(formatting)
            niod.err(v, indent + 1)
        elseif type(v) == 'boolean' then
            env.error(formatting .. tostring(v))
        else
            env.error(formatting .. tostring(v))
        end
    end
end

function niod.setDevEnv(isDev) env.setErrorMessageBoxEnabled(isDev) end

-- NIOD FUNCTIONS --

function niod.functions.getGroups(args)
    local groups = {}
    local coalitionGroups = coalition.getGroups(args.coalitionId,
                                                args.groupCategory)
    for groupId, group in pairs(coalitionGroups) do
        local groupInfo = {}
        if not group:isExist() then
            niod.log({"Group does not exist: ", group})
            return
        end
        groupInfo.id = groupId
        groupInfo.name = group:getName()
        groupInfo.category = group:getCategory()
        groupInfo.coalition = group:getCoalition()
        groupInfo.size = group:getSize()
        groupInfo.initialSize = group:getInitialSize()
        table.insert(groups, groupInfo)
    end
    return groups
end

function niod.functions.getUnits(args)
    local units = {}
    local group = Group.getByName(args.groupName)
    if not group:isExist() then
        niod.log({"Group does not exist: ", group})
        return
    end
    local units = {}
    for unitId, unit in pairs(group:getUnits()) do
        local unitInfo = {}
        unitInfo.id = unitId
        unitInfo.name = unit:getName()
        unitInfo.fuel = unit:getFuel()
        unitInfo.ammo = unit:getAmmo()
        unitInfo.sensors = unit:getSensors()
        unitInfo.callsign = unit:getCallsign()
        unitInfo.hasRadar, unitInfo.trackedObject = unit:getRadar()
        unitInfo.type = unit:getTypeName()
        unitInfo.desc = unit:getDesc()
        unitInfo.inAir = unit:inAir()
        unitInfo.isActive = unit:isActive()
        unitInfo.life = unit:getLife()
        unitInfo.life0 = unit:getLife0()
        unitInfo.position = unit:getPosition()
        unitInfo.velocity = unit:getVelocity()
        unitInfo.nearestCargos = unit:getNearestCargos()
        table.insert(units, unitInfo)
    end
    return units
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
        niod.err("Received a unvalid request")
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
    niod.err({"While decoding JSON data -> ", message})
    timer.scheduleFunction(niod.receive, {},
                           timer.getTime() + niod.dataTimeoutSec)
end

function JSON:onEncodeError(message)
    niod.err({"While encoding JSON data -> ", message})
end

timer.scheduleFunction(niod.receive, {}, timer.getTime() + niod.dataTimeoutSec)

function niod.eventHandler.onEvent(handler, event)
    niod.send({id = "", type = "event", sent = os.time(), payload = event})
end

world.addEventHandler(niod.eventHandler)
niod.setDevEnv(niod.isDev)
niod.log("Started NIOD")
