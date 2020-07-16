import { v4 as uuidv4 } from "uuid";
import { Vector3 } from "../utils";
import { getStore } from "../store/store";
import { mutate, mutationNames } from "../store/mutation";

export type EventUnit = {
  _id: number;
};

export type EventAirbase = {
  _id: number;
};

export type EventWeapon = {
  _id: number;
};

export type EventObject = {
  _id: number;
};

export type EventNeutralCoalition = -1;
export type EventRedCoalition = 1;
export type EventBlueCoalition = 2;

export type EventBaseCaptured = {
  id: 10;
  time: number;
  initiator: EventUnit;
  place: EventAirbase;
  subplace: 0;
};

export type EventBirth = {
  id: 15;
  time: number;
  initiator: EventUnit;
};

export type EventCrash = {
  id: 5;
  time: number;
  initiator: EventUnit;
};

export type EventDead = {
  id: 8;
  time: number;
  initiator: EventUnit;
};
export type EventDetailedFailure = {
  id: 17;
  time: number;
  initiator: EventUnit;
};

export type EventEjection = {
  id: 6;
  time: number;
  initiator: EventUnit;
};

export type EventEngineShutdown = {
  id: 19;
  time: number;
  initiator: EventUnit;
};

export type EventEngineStartup = {
  id: 18;
  time: number;
  initiator: EventUnit;
};

export type EventHit = {
  id: 2;
  time: number;
  initiator: EventUnit;
  weapon: EventWeapon;
  target: EventObject;
};

export type EventHumanFailure = {
  id: 16;
  time: number;
  initiator: EventUnit;
};

export type EventKill = {
  id: 28;
  time: number;
  initiator: EventUnit;
  target: EventUnit;
  weapon: EventWeapon;
  weapon_name: string;
};

export type EventLand = {
  id: 4;
  time: number;
  initiator: EventUnit;
  place: EventObject;
  sbuPlace: 0;
};

export type EventLandingAfterEjection = {
  id: 31;
  time: number;
  initiator: EventUnit;
  place: EventUnit;
  subplace: 0;
};

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

export type EventMissionEnd = {
  id: 12;
  time: number;
};

export type EventMissionStart = {
  id: 1;
  time: number;
};

export type EventPilotDead = {
  id: 9;
  time: number;
  initiator: EventUnit;
};

export type EventPlayerComment = {
  id: 22;
  time: number;
  comment: string;
};

export type EventPlayerEnterUnit = {
  id: 20;
  time: number;
  initiator: EventUnit;
};

export type EventLeaveUnit = {
  id: 21;
  time: number;
  initiator: EventUnit;
};

export type EventRefueling = {
  id: 7;
  time: number;
  initiator: EventUnit;
};

export type EventRefuelingStop = {
  id: 14;
  time: number;
  initiator: EventUnit;
};

export type EventScore = {
  id: 29;
  time: number;
};

export type EventShootingEnd = {
  id: 24;
  time: number;
  initiator: EventUnit;
};

export type EventShootingStart = {
  id: 23;
  time: number;
  initiator: EventUnit;
  target: EventUnit;
};

export type EventShot = {
  id: 1;
  time: number;
  initiator: EventUnit;
  weapon: EventWeapon;
};

export type EventTakeoff = {
  id: 3;
  time: number;
  initiator: EventUnit;
  place: EventObject;
  subPlace: 0;
};

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

export const removeEventHandler = (id: number, handlerId: string) => {
  const eventHandlers = getStore().eventHandlers;
  eventHandlers[id].delete(handlerId);
  mutate(mutationNames.SET_EVENT_HANDLERS, eventHandlers);
};
