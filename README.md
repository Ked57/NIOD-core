Latest build tests and linting
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
initNiod = (): Promise<any>
```

This function will init Niod and resolve once done

```typescript
spawnGroup = (groupName: string, callback: Callback)
```

This function will spawn a group and execute the callback once it's done, the callback takes one parameter which is the name of the group that was spawned

```typescript
spawnGroupInZone = (groupName: string, zoneName: string, callback: Callback, randomize?: boolean)
```

The function will spawn a group in a specific zone and exectute the callback, the callback takes one parameter which is the name of the group that was spawned

```typescript
addTrigger = ( type: string,
  groupName: string,
  zoneName: string,
  frequency: "once" | "repeat",
  callback: Callback)
```

This function will add a "trigger", it means that Niod will execute the callback function when something happens (depending on the trigger). The "type" argument defines the trigger that will be added, the only one implemented at the moment is: "GroupPartlyOrCompletelyInZone"

```typescript
addA2ADispatcher = ({
  name: string; // The name you want to give to your dispatcher
  detection: {
    prefixes: string[]; // Prefixes for the EWR groups
    range: number; // The detection range
  };
  border: {
    name: string; // Name of the zone that acts as border
  };
  engageRadius: number; // The engage radius
  squadrons: {
    name: string; // Name of the squadron
    map: "Caucasus" | "Nevada" | "Normandy" | "PersianGulf"; // Map you're running the mission on
    airbase: string; // Name of the Airbase
    groupLength: number; // The number of units per group there should be
    takeofMethod: "Air" | "Runway" | "Hot" | "Cold"; // Takeoff method
    landingMethod: "Air" | "Runway" | "Hot" | "Cold"; // Landing method
    cap?: { // There should be either a CAP or GCI field, not both
      zoneName: string; // Name of the zone to do CAP on
      minCAPAlt: number; // The minimal altitude to patrol at
      maxCAPAlt: number; // The maximal altitude to patrol at
      minCAPSpeed: number; // Minimal speed for patrol
      maxCAPSPeed: number; // Maximal speed for patrol
      minCAPInterceptSpeed: number; // Minimum intercept speed
      maxCAPInterceptSpeed: number; // Maximum intercept speed
      mesureType: "BARO" | "RADIO"; // Type of mesurement for altitude
      numberPerGroup: number; // The number of units per group there should be
      lowerCheckTime: number; // The minimum amount of time between decisions of the dispatcher
      upperCheckTime: number; // The maximum amount of time between decisions of the dispatcher
      decisionWeight: number; // The weight of the decision to spawn new units for the dispatcher
    };
    gci?: {
      minInterceptSpeed: number; // Minimum intercept speed
      maxInterceptSpeed: number; // Maximum intercept speed
    };
  }[];
}, callback: Callback);
```

This function will return information about the groups present in the game

```typescript
getGroupInfo = ()
```

## Special thanks

Thanks to Drex from Dynamic DCS for all the help on sockets, go check his server out
