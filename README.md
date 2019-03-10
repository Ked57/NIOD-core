Latest build tests and liting
[![CircleCI](https://circleci.com/gh/Ked57/NIOD.svg?style=svg)](https://circleci.com/gh/Ked57/NIOD)

# NIOD

## Introduction

NIOD is a npm package that let's you connect to DCS World using a socket. Then you can use some of the functions at your disposal to spawn groups. We're still in the early phase of this package so there aren't many functions implemented yet but it will grow !

## How does this work ?

The nodejs server stores callbacks linked to a callback id, this id is passed to the lua server which pass it
back with the returned data. The dispatcher will then execute the right stored callback

Here's a basic example

```javascript
const { initNiod, spawnGroup } = require("niod");

initNiod().then(() => {
  spawnGroup("template_group", () =>
    console.log("your group has been spawned")
  );
});
```

## Instalation

### Unsanitize the require function

Niod requires DCS to import some functionalities from LUA so it can create a socket, you'll need to "unsanitize" it. To do so go into your DCS installation folder DCS World\Scripts\MissionScripting.lua and edit this line

```lua
require = nil
```

to

```lua
--require = nil
```

### Mission Editor

Then you need to create a mission that loads the MOOSE lua file (found here: https://github.com/FlightControl-Master/MOOSE/releases) and then loads the NIOD lua file found in the "script" folder.

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

```typescript
initNiod(): Promise<core.Express>
```

This function will init Niod and resolve the express server

```typescript
spawnGroup = (groupName: string, callback: Callback)
```

This function will spawn a group and execute the callback once it's done, the callback takes one parameter which is the name of the group that was spawned

```typescript
spawnGroupInZone = (groupName: string, zoneName: string, callback: Callback, randomize?: boolean)
```

```typescript
addTrigger = ( type: string,
  groupName: string,
  zoneName: string,
  frequency: "once" | "repeat",
  callback: Callback)
```

This function will add a "trigger", it means that Niod will execute the callback function when something happens (depending on the trigger). The "type" argument defines the trigger that will be added, the only one implemented at the moment is: "GroupPartlyOrCompletelyInZone"

## Special thanks

Thanks to Drex from Dynamic DCS for all the help on sockets, go check his server out
