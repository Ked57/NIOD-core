Latest build
[![CircleCI](https://circleci.com/gh/Ked57/NIOD.svg?style=svg)](https://circleci.com/gh/Ked57/NIOD)

![NIOD Logo](/docs/static/assets/niod.png)

# NIOD

[![Discord logo](https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-64.png "Join us on discord !") Join us on discord !](https://discord.gg/WUW24w8)



## Introduction

NIOD is a npm package that lets you connect to DCS World using a socket. Once connected, it offers a variety of functionalities :

- Events: You can listen to events from DCS World
- Functions: You can call functions from the DCS Mission Scripting API

This is a pretty low level package, mission makers should probably not use NIOD directly but a package that uses NIOD to get higher level functionalities. My plan is to make one in the near future.

## How does this work ?

A socket is created in the mission scripting environment, NIOD connects to it and sends / receives commands discribing events and functions. 

The nodejs server stores callbacks linked to a callback id, this id is passed to the lua server which pass it
back with the returned data. The dispatcher will then execute the right stored callback.

Here's a basic example

```javascript
const { initNiod, getGroups, addEventHandler, COALITIONS, EVENTS } = require("niod");
initNiod().then(async () => {
  // Log information on all the groups in the blue coalition
  console.log(await getGroups(COALITIONS.BLUE));
  // Log position of new added marks
  addEventHandler(EVENTS.EventMarkAdded, (event) => {
	  console.log("A mark was added at position", event.pos);
  })
});
```

## Instalation

### Unsanitize the require function

Niod requires DCS to import some functionalities from LUA so it can create a socket and access the OS time API, you'll need to "unsanitize" it. To do so go into your DCS installation folder `DCS World\Scripts\MissionScripting.lua` and edit these line.

```lua
do
	sanitizeModule('os')
	sanitizeModule('io')
	sanitizeModule('lfs')
	require = nil
	loadlib = nil
end
```

to

```lua

do
	--sanitizeModule('os')
	sanitizeModule('io')
	sanitizeModule('lfs')
	--require = nil
	loadlib = nil
end
```

### Mission Editor

Then you need to create a mission that loads the NIOD lua file found in the "script" folder.

And there you go ! You're all set, you can import niod in your project and start the server using

```javascript
const { initNiod } = require("niod");
initNiod().then(() => {
  // your mission code goes here
});
```

and start coding !

## Typescript support

Niod is written in typescript, so the npm package is shipped with all the type declarations. Which means auto-completion depending on your code editor

## API

You can find the complete docs [here](https://ked57.github.io/NIOD/globals)

Since there is a lot of documented functions you probably won't need, here are links to:

- [Events documentation](https://ked57.github.io/NIOD/modules/_dcs_event_.html)
- [Functions documentation](https://ked57.github.io/NIOD/modules/_dcs_functions_.html)

## Guides

I'll be writing guides with examples, links will be down below

## Special thanks

Thanks to Drex from Dynamic DCS for all the help on sockets, go check his server out
