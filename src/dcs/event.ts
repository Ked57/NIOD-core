import { v4 as uuidv4 } from "uuid";
import { Vector3 } from "../utils";
import { getStore } from "../store/store";
import { mutate, mutationNames } from "../store/mutation";

/**
 * Represents an unit returned by a DCS event
 */
export type EventUnit = {
  _id: number;
};

/**
 * Represents an airbase returned by a DCS event
 */
export type EventAirbase = {
  _id: number;
};

/**
 * Represents a weapon returned by a DCS event
 */
export type EventWeapon = {
  _id: number;
};

/**
 * Represents an object returned by a DCS event
 */
export type EventObject = {
  _id: number;
};

/**
 * Represents the neutral coalition returned by a DCS event
 */
export type EventNeutralCoalition = -1;

/**
 * Represents the red coalition returned by a DCS event
 */
export type EventRedCoalition = 1;

/**
 * Represents the blue returned by a DCS event
 */
export type EventBlueCoalition = 2;

/**
 * Occurs when a ground unit captures either an airbase or a farp. Source: [https://wiki.hoggitworld.com/view/DCS_event_base_captured](https://wiki.hoggitworld.com/view/DCS_event_base_captured)
 */
export type EventBaseCaptured = {
  id: 10;
  time: number;
  initiator: EventUnit;
  place: EventAirbase;
  subplace: 0;
};

/**
 * Occurs when any object is spawned into the mission. Source: [https://wiki.hoggitworld.com/view/DCS_event_birth](https://wiki.hoggitworld.com/view/DCS_event_birth)
 */
export type EventBirth = {
  id: 15;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when any aircraft crashes into the ground and is completely destroyed. Source: [https://wiki.hoggitworld.com/view/DCS_event_crash](https://wiki.hoggitworld.com/view/DCS_event_crash)
 */
export type EventCrash = {
  id: 5;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when an object is completely destroyed. Source: [https://wiki.hoggitworld.com/view/DCS_event_dead](https://wiki.hoggitworld.com/view/DCS_event_dead)
 */
export type EventDead = {
  id: 8;
  time: number;
  initiator: EventUnit;
};

/**
 * Unknown precisely what creates this event, likely tied into newer damage model. Will update this page when new information become available. Source: [https://wiki.hoggitworld.com/view/DCS_event_detailed_failure](https://wiki.hoggitworld.com/view/DCS_event_detailed_failure)
 */
export type EventDetailedFailure = {
  id: 17;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when a pilot ejects from an aircraft. Source: [https://wiki.hoggitworld.com/view/DCS_event_ejection](https://wiki.hoggitworld.com/view/DCS_event_ejection)
 */
export type EventEjection = {
  id: 6;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when any aircraft shuts down its engines. Source: [https://wiki.hoggitworld.com/view/DCS_event_engine_shutdown](https://wiki.hoggitworld.com/view/DCS_event_engine_shutdown)
 */
export type EventEngineShutdown = {
  id: 19;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when any aircraft starts its engines. Source: [https://wiki.hoggitworld.com/view/DCS_event_engine_startup](https://wiki.hoggitworld.com/view/DCS_event_engine_startup)
 */
export type EventEngineStartup = {
  id: 18;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs whenever an object is hit by a weapon. Source: [https://wiki.hoggitworld.com/view/DCS_event_hit](https://wiki.hoggitworld.com/view/DCS_event_hit)
 */
export type EventHit = {
  id: 2;
  time: number;
  initiator: EventUnit;
  weapon: EventWeapon;
  target: EventObject;
};

/**
 * Occurs when any system fails on a human controlled aircraft. Source: [https://wiki.hoggitworld.com/view/DCS_event_human_failure](https://wiki.hoggitworld.com/view/DCS_event_human_failure)
 */
export type EventHumanFailure = {
  id: 16;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs on the death of a unit. Contains more and different information. Similar to unit_lost it will occur for aircraft before the aircraft crash event occurs. Source: [https://wiki.hoggitworld.com/view/DCS_event_kill](https://wiki.hoggitworld.com/view/DCS_event_kill)
 */
export type EventKill = {
  id: 28;
  time: number;
  initiator: EventUnit;
  target: EventUnit;
  weapon: EventWeapon;
  weapon_name: string;
};

/**
 * Occurs when an aircraft lands at an airbase, farp or ship. Source: [https://wiki.hoggitworld.com/view/DCS_event_land](https://wiki.hoggitworld.com/view/DCS_event_land)
 */
export type EventLand = {
  id: 4;
  time: number;
  initiator: EventUnit;
  place: EventObject;
  sbuPlace: 0;
};

/**
 * Occurs shortly after the landing animation of an ejected pilot touching the ground and standing up. Source: [https://wiki.hoggitworld.com/view/DCS_event_landing_after_ejection](https://wiki.hoggitworld.com/view/DCS_event_landing_after_ejection)
 */
export type EventLandingAfterEjection = {
  id: 31;
  time: number;
  initiator: EventUnit;
  place: EventUnit;
  subplace: 0;
};

/**
 * Occurs when mark panels get added to the mission by players or scripting functions. Source: [https://wiki.hoggitworld.com/view/DCS_event_mark_added](https://wiki.hoggitworld.com/view/DCS_event_mark_added)
 */
export type EventMarkAdded = {
  id: 25;
  idx: number;
  time: number;
  initiator: EventUnit;
  coalition: EventNeutralCoalition | EventRedCoalition | EventBlueCoalition;
  groupID: number;
  text: string;
  pos: Vector3;
};

/**
 * Occurs when a mark panel is modified by a player. Source: [https://wiki.hoggitworld.com/view/DCS_event_mark_change](https://wiki.hoggitworld.com/view/DCS_event_mark_change)
 */
export type EventMarkChange = {
  id: 26;
  idx: number;
  time: number;
  initiator: EventUnit;
  coalition: EventNeutralCoalition | EventRedCoalition | EventBlueCoalition;
  groupID: number;
  text: string;
  pos: Vector3;
};

/**
 * Occurs when mark panels get removed from the mission by players or scripting functions. Source: [https://wiki.hoggitworld.com/view/DCS_event_mark_remove](https://wiki.hoggitworld.com/view/DCS_event_mark_remove)
 */
export type EventMarkRemove = {
  id: 27;
  idx: number;
  time: number;
  initiator: EventUnit;
  coalition: EventNeutralCoalition | EventRedCoalition | EventBlueCoalition;
  groupID: number;
  text: string;
  pos: Vector3;
};

/**
 * Occurs when a mission ends. Source: [https://wiki.hoggitworld.com/view/DCS_event_mission_end](https://wiki.hoggitworld.com/view/DCS_event_mission_end)
 */
export type EventMissionEnd = {
  id: 12;
  time: number;
};

/**
 * Occurs when a mission starts. Source: [https://wiki.hoggitworld.com/view/DCS_event_mission_start](https://wiki.hoggitworld.com/view/DCS_event_mission_start)
 */
export type EventMissionStart = {
  id: 1;
  time: number;
};

/**
 * Occurs when the pilot of an aircraft is killed. Can occur either if the player is alive and crashes or if a weapon kills the pilot without completely destroying the plane. Source: [https://wiki.hoggitworld.com/view/DCS_event_pilot_dead](https://wiki.hoggitworld.com/view/DCS_event_pilot_dead)
 */
export type EventPilotDead = {
  id: 9;
  time: number;
  initiator: EventUnit;
};

/**
 * Typically corresponds to generalized events that create a triggered message called directly from the game itself. Currently the only known cause appears to display a landing score when AI and occasionally when players land on an aircraft carrier. Source: [https://wiki.hoggitworld.com/view/DCS_event_player_comment](https://wiki.hoggitworld.com/view/DCS_event_player_comment)
 */
export type EventPlayerComment = {
  id: 22;
  time: number;
  comment: string;
};

/**
 * Occurs when any player assumes direct control of a unit. Source: [https://wiki.hoggitworld.com/view/DCS_event_player_enter_unit](https://wiki.hoggitworld.com/view/DCS_event_player_enter_unit)
 */
export type EventPlayerEnterUnit = {
  id: 20;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when any player relieves control of a unit to the AI. Source: [https://wiki.hoggitworld.com/view/DCS_event_player_leave_unit](https://wiki.hoggitworld.com/view/DCS_event_player_leave_unit)
 */
export type EventLeaveUnit = {
  id: 21;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when an aircraft connects with a tanker and begins taking on fuel. Source: [https://wiki.hoggitworld.com/view/DCS_event_refueling](https://wiki.hoggitworld.com/view/DCS_event_refueling)
 */
export type EventRefueling = {
  id: 7;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when an aircraft is finished taking fuel. Source: [https://wiki.hoggitworld.com/view/DCS_event_refueling_stop](https://wiki.hoggitworld.com/view/DCS_event_refueling_stop)
 */
export type EventRefuelingStop = {
  id: 14;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when any modification to the "Score" as seen on the debrief menu would occur. There is no information on what values the score was changed to. Event is likely similar to player_comment in this regard. Source: [https://wiki.hoggitworld.com/view/DCS_event_score](https://wiki.hoggitworld.com/view/DCS_event_score)
 */
export type EventScore = {
  id: 29;
  time: number;
};

/**
 * Occurs when any unit stops firing its weapon. Event will always correspond with a shooting start event. Source: [https://wiki.hoggitworld.com/view/DCS_event_shooting_end](https://wiki.hoggitworld.com/view/DCS_event_shooting_end)
 */
export type EventShootingEnd = {
  id: 24;
  time: number;
  initiator: EventUnit;
};

/**
 * Occurs when any unit begins firing a weapon that has a high rate of fire. Most common with aircraft cannons (GAU-8), autocannons, and machine guns. Source: [https://wiki.hoggitworld.com/view/DCS_event_shooting_start](https://wiki.hoggitworld.com/view/DCS_event_shooting_start)
 */
export type EventShootingStart = {
  id: 23;
  time: number;
  initiator: EventUnit;
  target: EventUnit;
};

/**
 * Occurs whenever any unit in a mission fires a weapon. But not any machine gun or autocannon based weapon, those are handled by shooting_start. Source: [https://wiki.hoggitworld.com/view/DCS_event_shot](https://wiki.hoggitworld.com/view/DCS_event_shot)
 */
export type EventShot = {
  id: 1;
  time: number;
  initiator: EventUnit;
  weapon: EventWeapon;
};

/**
 * Occurs when an aircraft takes off from an airbase, farp, or ship. Source: [https://wiki.hoggitworld.com/view/DCS_event_takeoff](https://wiki.hoggitworld.com/view/DCS_event_takeoff)
 */
export type EventTakeoff = {
  id: 3;
  time: number;
  initiator: EventUnit;
  place: EventObject;
  subPlace: 0;
};

/**
 * Occurs when the game thinks an object is destroyed. Source: [https://wiki.hoggitworld.com/view/DCS_event_unit_lost](https://wiki.hoggitworld.com/view/DCS_event_unit_lost)
 */
export type EventUnitLost = {
  id: 30;
  time: number;
  initiator: EventUnit;
};

export type Event =
  | EventBaseCaptured
  | EventBirth
  | EventCrash
  | EventDead
  | EventDetailedFailure
  | EventEjection
  | EventEngineShutdown
  | EventEngineStartup
  | EventHit
  | EventKill
  | EventLand
  | EventLandingAfterEjection
  | EventMarkAdded
  | EventMarkChange
  | EventMarkRemove
  | EventMissionEnd
  | EventMissionStart
  | EventPilotDead
  | EventPlayerComment
  | EventPlayerEnterUnit
  | EventLeaveUnit
  | EventRefueling
  | EventRefuelingStop
  | EventScore
  | EventShootingEnd
  | EventShootingStart
  | EventShot
  | EventTakeoff
  | EventUnitLost;

export const EVENTS = {
  EventBaseCaptured: 10,
  EventBirth: 15,
  EventCrash: 5,
  EventDead: 8,
  EventDetailedFailure: 17,
  EventEjection: 6,
  EventEngineShutdown: 19,
  EventEngineStartup: 18,
  EventHit: 2,
  EventKill: 28,
  EventLand: 4,
  EventLandingAfterEjection: 31,
  EventMarkAdded: 25,
  EventMarkChange: 26,
  EventMarkRemove: 27,
  EventMissionEnd: 12,
  EventMissionStart: 1,
  EventPilotDead: 9,
  EventPlayerComment: 22,
  EventPlayerEnterUnit: 20,
  EventLeaveUnit: 21,
  EventRefueling: 7,
  EventRefuelingStop: 14,
  EventScore: 29,
  EventShootingEnd: 24,
  EventShootingStart: 23,
  EventShot: 1,
  EventTakeoff: 3,
  EventUnitLost: 30
};
export type EventHandler<T> = (payload: T) => void;

/**
 * @typeParam T  The type of the event payload that is handled.
 * @param id  The id of the event that is handled. Note: you should use the constants in the EVENTS object
 * @param payload The payload passed to the handler
 */
export const handleEvent = <T>(id: number, payload: T) => {
  if (id === -1) {
    console.error("ERROR: Received unknown event", payload);
    return;
  }
  const eventHandlers = getStore().eventHandlers;
  if (!eventHandlers || !eventHandlers[id]) {
    return;
  }
  getStore().eventHandlers[id].forEach(handler => handler(payload));
};

/**
 * @typeParam T  The type of the event payload that will be handled.
 * @param id  The id of the event that is handled. Note: you should use the constants in the EVENTS object
 * @param handler The function handling the event, this is a generic function si a type must be provided
 * @returns the id of the handler that was created
 */
export const addEventHandler = <T>(id: number, handler: EventHandler<T>) => {
  const eventHandlers = getStore().eventHandlers;
  const handlerId = uuidv4().toString();
  if (!eventHandlers[id]) {
    eventHandlers[id] = new Map<string, EventHandler<T>>();
  }
  eventHandlers[id].set(handlerId, handler);
  mutate(mutationNames.SET_EVENT_HANDLERS, { eventHandlers });
  return handlerId;
};

/**
 * @param id  The id of the event that is handled. Note: you should use the constants in the EVENTS object
 * @param handlerId The id of the handler, you can retrieve this when adding a handler
 */
export const removeEventHandler = (id: number, handlerId: string) => {
  const eventHandlers = getStore().eventHandlers;
  eventHandlers[id].delete(handlerId);
  mutate(mutationNames.SET_EVENT_HANDLERS, eventHandlers);
};
