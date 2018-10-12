# NIOD

NIOD is a web manager for DCS World lua natives, using a NodeJS server to communicate with a LUA library

NIOD uses JSON
It'll basicaly look like this:

{
"type": "connection",
"callbackId": "anIdForTheCallback",
"data": {
"token": "aRandomToken"
}
}

We hope to implement every function from: https://wiki.hoggitworld.com/view/Category:Functions
and every event from https://wiki.hoggitworld.com/view/Category:Events

example with getGroups(enum coalitionId , enum GroupCategory)

{
"type": "function",
"callbackId": "anIdForTheCallback",
"data": {
"name": "getGroups",
"args": [1,0]
}
}

result will be

{
"type": "data",
"callbackId": "anIdForTheCallback",
"data": { #thedata }
}

The nodejs server stores callbacks linked to a callback id, this id is passed to the lua server which pass it
back with the return data. The dispatcher will then execute the right stored callback
