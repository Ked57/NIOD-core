[niod](../README.md) › [Globals](../globals.md) › ["dcs/event"](_dcs_event_.md)

# Module: "dcs/event"

## Index

### Type aliases

* [Event](_dcs_event_.md#event)
* [EventAirbase](_dcs_event_.md#eventairbase)
* [EventBaseCaptured](_dcs_event_.md#eventbasecaptured)
* [EventBirth](_dcs_event_.md#eventbirth)
* [EventBlueCoalition](_dcs_event_.md#eventbluecoalition)
* [EventCrash](_dcs_event_.md#eventcrash)
* [EventDead](_dcs_event_.md#eventdead)
* [EventDetailedFailure](_dcs_event_.md#eventdetailedfailure)
* [EventEjection](_dcs_event_.md#eventejection)
* [EventEngineShutdown](_dcs_event_.md#eventengineshutdown)
* [EventEngineStartup](_dcs_event_.md#eventenginestartup)
* [EventHandler](_dcs_event_.md#eventhandler)
* [EventHit](_dcs_event_.md#eventhit)
* [EventHumanFailure](_dcs_event_.md#eventhumanfailure)
* [EventKill](_dcs_event_.md#eventkill)
* [EventLand](_dcs_event_.md#eventland)
* [EventLandingAfterEjection](_dcs_event_.md#eventlandingafterejection)
* [EventLeaveUnit](_dcs_event_.md#eventleaveunit)
* [EventMarkAdded](_dcs_event_.md#eventmarkadded)
* [EventMarkChange](_dcs_event_.md#eventmarkchange)
* [EventMarkRemove](_dcs_event_.md#eventmarkremove)
* [EventMissionEnd](_dcs_event_.md#eventmissionend)
* [EventMissionStart](_dcs_event_.md#eventmissionstart)
* [EventNeutralCoalition](_dcs_event_.md#eventneutralcoalition)
* [EventObject](_dcs_event_.md#eventobject)
* [EventPilotDead](_dcs_event_.md#eventpilotdead)
* [EventPlayerComment](_dcs_event_.md#eventplayercomment)
* [EventPlayerEnterUnit](_dcs_event_.md#eventplayerenterunit)
* [EventRedCoalition](_dcs_event_.md#eventredcoalition)
* [EventRefueling](_dcs_event_.md#eventrefueling)
* [EventRefuelingStop](_dcs_event_.md#eventrefuelingstop)
* [EventScore](_dcs_event_.md#eventscore)
* [EventShootingEnd](_dcs_event_.md#eventshootingend)
* [EventShootingStart](_dcs_event_.md#eventshootingstart)
* [EventShot](_dcs_event_.md#eventshot)
* [EventTakeoff](_dcs_event_.md#eventtakeoff)
* [EventUnit](_dcs_event_.md#eventunit)
* [EventUnitLost](_dcs_event_.md#eventunitlost)
* [EventWeapon](_dcs_event_.md#eventweapon)

### Functions

* [addEventHandler](_dcs_event_.md#const-addeventhandler)
* [handleEvent](_dcs_event_.md#const-handleevent)
* [removeEventHandler](_dcs_event_.md#const-removeeventhandler)

### Object literals

* [EVENTS](_dcs_event_.md#const-events)

## Type aliases

###  Event

Ƭ **Event**: *[EventBaseCaptured](_dcs_event_.md#eventbasecaptured) | [EventBirth](_dcs_event_.md#eventbirth) | [EventCrash](_dcs_event_.md#eventcrash) | [EventDead](_dcs_event_.md#eventdead) | [EventDetailedFailure](_dcs_event_.md#eventdetailedfailure) | [EventEjection](_dcs_event_.md#eventejection) | [EventEngineShutdown](_dcs_event_.md#eventengineshutdown) | [EventEngineStartup](_dcs_event_.md#eventenginestartup) | [EventHit](_dcs_event_.md#eventhit) | [EventKill](_dcs_event_.md#eventkill) | [EventLand](_dcs_event_.md#eventland) | [EventLandingAfterEjection](_dcs_event_.md#eventlandingafterejection) | [EventMarkAdded](_dcs_event_.md#eventmarkadded) | [EventMarkChange](_dcs_event_.md#eventmarkchange) | [EventMarkRemove](_dcs_event_.md#eventmarkremove) | [EventMissionEnd](_dcs_event_.md#eventmissionend) | [EventMissionStart](_dcs_event_.md#eventmissionstart) | [EventPilotDead](_dcs_event_.md#eventpilotdead) | [EventPlayerComment](_dcs_event_.md#eventplayercomment) | [EventPlayerEnterUnit](_dcs_event_.md#eventplayerenterunit) | [EventLeaveUnit](_dcs_event_.md#eventleaveunit) | [EventRefueling](_dcs_event_.md#eventrefueling) | [EventRefuelingStop](_dcs_event_.md#eventrefuelingstop) | [EventScore](_dcs_event_.md#eventscore) | [EventShootingEnd](_dcs_event_.md#eventshootingend) | [EventShootingStart](_dcs_event_.md#eventshootingstart) | [EventShot](_dcs_event_.md#eventshot) | [EventTakeoff](_dcs_event_.md#eventtakeoff) | [EventUnitLost](_dcs_event_.md#eventunitlost)*

*Defined in [dcs/event.ts:346](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L346)*

___

###  EventAirbase

Ƭ **EventAirbase**: *object*

*Defined in [dcs/event.ts:16](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L16)*

Represents an airbase returned by a DCS event

#### Type declaration:

* **_id**: *number*

___

###  EventBaseCaptured

Ƭ **EventBaseCaptured**: *object*

*Defined in [dcs/event.ts:52](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L52)*

Occurs when a ground unit captures either an airbase or a farp. Source: [https://wiki.hoggitworld.com/view/DCS_event_base_captured](https://wiki.hoggitworld.com/view/DCS_event_base_captured)

#### Type declaration:

* **id**: *10*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **place**: *[EventAirbase](_dcs_event_.md#eventairbase)*

* **subplace**: *0*

* **time**: *number*

___

###  EventBirth

Ƭ **EventBirth**: *object*

*Defined in [dcs/event.ts:63](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L63)*

Occurs when any object is spawned into the mission. Source: [https://wiki.hoggitworld.com/view/DCS_event_birth](https://wiki.hoggitworld.com/view/DCS_event_birth)

#### Type declaration:

* **id**: *15*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventBlueCoalition

Ƭ **EventBlueCoalition**: *2*

*Defined in [dcs/event.ts:47](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L47)*

Represents the blue returned by a DCS event

___

###  EventCrash

Ƭ **EventCrash**: *object*

*Defined in [dcs/event.ts:72](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L72)*

Occurs when any aircraft crashes into the ground and is completely destroyed. Source: [https://wiki.hoggitworld.com/view/DCS_event_crash](https://wiki.hoggitworld.com/view/DCS_event_crash)

#### Type declaration:

* **id**: *5*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventDead

Ƭ **EventDead**: *object*

*Defined in [dcs/event.ts:81](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L81)*

Occurs when an object is completely destroyed. Source: [https://wiki.hoggitworld.com/view/DCS_event_dead](https://wiki.hoggitworld.com/view/DCS_event_dead)

#### Type declaration:

* **id**: *8*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventDetailedFailure

Ƭ **EventDetailedFailure**: *object*

*Defined in [dcs/event.ts:90](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L90)*

Unknown precisely what creates this event, likely tied into newer damage model. Will update this page when new information become available. Source: [https://wiki.hoggitworld.com/view/DCS_event_detailed_failure](https://wiki.hoggitworld.com/view/DCS_event_detailed_failure)

#### Type declaration:

* **id**: *17*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventEjection

Ƭ **EventEjection**: *object*

*Defined in [dcs/event.ts:99](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L99)*

Occurs when a pilot ejects from an aircraft. Source: [https://wiki.hoggitworld.com/view/DCS_event_ejection](https://wiki.hoggitworld.com/view/DCS_event_ejection)

#### Type declaration:

* **id**: *6*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventEngineShutdown

Ƭ **EventEngineShutdown**: *object*

*Defined in [dcs/event.ts:108](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L108)*

Occurs when any aircraft shuts down its engines. Source: [https://wiki.hoggitworld.com/view/DCS_event_engine_shutdown](https://wiki.hoggitworld.com/view/DCS_event_engine_shutdown)

#### Type declaration:

* **id**: *19*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventEngineStartup

Ƭ **EventEngineStartup**: *object*

*Defined in [dcs/event.ts:117](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L117)*

Occurs when any aircraft starts its engines. Source: [https://wiki.hoggitworld.com/view/DCS_event_engine_startup](https://wiki.hoggitworld.com/view/DCS_event_engine_startup)

#### Type declaration:

* **id**: *18*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventHandler

Ƭ **EventHandler**: *function*

*Defined in [dcs/event.ts:408](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L408)*

#### Type declaration:

▸ (`payload`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | T |

___

###  EventHit

Ƭ **EventHit**: *object*

*Defined in [dcs/event.ts:126](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L126)*

Occurs whenever an object is hit by a weapon. Source: [https://wiki.hoggitworld.com/view/DCS_event_hit](https://wiki.hoggitworld.com/view/DCS_event_hit)

#### Type declaration:

* **id**: *2*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **target**: *[EventObject](_dcs_event_.md#eventobject)*

* **time**: *number*

* **weapon**: *[EventWeapon](_dcs_event_.md#eventweapon)*

___

###  EventHumanFailure

Ƭ **EventHumanFailure**: *object*

*Defined in [dcs/event.ts:137](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L137)*

Occurs when any system fails on a human controlled aircraft. Source: [https://wiki.hoggitworld.com/view/DCS_event_human_failure](https://wiki.hoggitworld.com/view/DCS_event_human_failure)

#### Type declaration:

* **id**: *16*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventKill

Ƭ **EventKill**: *object*

*Defined in [dcs/event.ts:146](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L146)*

Occurs on the death of a unit. Contains more and different information. Similar to unit_lost it will occur for aircraft before the aircraft crash event occurs. Source: [https://wiki.hoggitworld.com/view/DCS_event_kill](https://wiki.hoggitworld.com/view/DCS_event_kill)

#### Type declaration:

* **id**: *28*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **target**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

* **weapon**: *[EventWeapon](_dcs_event_.md#eventweapon)*

* **weapon_name**: *string*

___

###  EventLand

Ƭ **EventLand**: *object*

*Defined in [dcs/event.ts:158](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L158)*

Occurs when an aircraft lands at an airbase, farp or ship. Source: [https://wiki.hoggitworld.com/view/DCS_event_land](https://wiki.hoggitworld.com/view/DCS_event_land)

#### Type declaration:

* **id**: *4*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **place**: *[EventObject](_dcs_event_.md#eventobject)*

* **sbuPlace**: *0*

* **time**: *number*

___

###  EventLandingAfterEjection

Ƭ **EventLandingAfterEjection**: *object*

*Defined in [dcs/event.ts:169](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L169)*

Occurs shortly after the landing animation of an ejected pilot touching the ground and standing up. Source: [https://wiki.hoggitworld.com/view/DCS_event_landing_after_ejection](https://wiki.hoggitworld.com/view/DCS_event_landing_after_ejection)

#### Type declaration:

* **id**: *31*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **place**: *[EventUnit](_dcs_event_.md#eventunit)*

* **subplace**: *0*

* **time**: *number*

___

###  EventLeaveUnit

Ƭ **EventLeaveUnit**: *object*

*Defined in [dcs/event.ts:265](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L265)*

Occurs when any player relieves control of a unit to the AI. Source: [https://wiki.hoggitworld.com/view/DCS_event_player_leave_unit](https://wiki.hoggitworld.com/view/DCS_event_player_leave_unit)

#### Type declaration:

* **id**: *21*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventMarkAdded

Ƭ **EventMarkAdded**: *object*

*Defined in [dcs/event.ts:180](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L180)*

Occurs when mark panels get added to the mission by players or scripting functions. Source: [https://wiki.hoggitworld.com/view/DCS_event_mark_added](https://wiki.hoggitworld.com/view/DCS_event_mark_added)

#### Type declaration:

* **coalition**: *[EventNeutralCoalition](_dcs_event_.md#eventneutralcoalition) | [EventRedCoalition](_dcs_event_.md#eventredcoalition) | [EventBlueCoalition](_dcs_event_.md#eventbluecoalition)*

* **groupID**: *number*

* **id**: *25*

* **idx**: *number*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **pos**: *[Vector3](_utils_.md#vector3)*

* **text**: *string*

* **time**: *number*

___

###  EventMarkChange

Ƭ **EventMarkChange**: *object*

*Defined in [dcs/event.ts:194](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L194)*

Occurs when a mark panel is modified by a player. Source: [https://wiki.hoggitworld.com/view/DCS_event_mark_change](https://wiki.hoggitworld.com/view/DCS_event_mark_change)

#### Type declaration:

* **coalition**: *[EventNeutralCoalition](_dcs_event_.md#eventneutralcoalition) | [EventRedCoalition](_dcs_event_.md#eventredcoalition) | [EventBlueCoalition](_dcs_event_.md#eventbluecoalition)*

* **groupID**: *number*

* **id**: *26*

* **idx**: *number*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **pos**: *[Vector3](_utils_.md#vector3)*

* **text**: *string*

* **time**: *number*

___

###  EventMarkRemove

Ƭ **EventMarkRemove**: *object*

*Defined in [dcs/event.ts:208](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L208)*

Occurs when mark panels get removed from the mission by players or scripting functions. Source: [https://wiki.hoggitworld.com/view/DCS_event_mark_remove](https://wiki.hoggitworld.com/view/DCS_event_mark_remove)

#### Type declaration:

* **coalition**: *[EventNeutralCoalition](_dcs_event_.md#eventneutralcoalition) | [EventRedCoalition](_dcs_event_.md#eventredcoalition) | [EventBlueCoalition](_dcs_event_.md#eventbluecoalition)*

* **groupID**: *number*

* **id**: *27*

* **idx**: *number*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **pos**: *[Vector3](_utils_.md#vector3)*

* **text**: *string*

* **time**: *number*

___

###  EventMissionEnd

Ƭ **EventMissionEnd**: *object*

*Defined in [dcs/event.ts:222](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L222)*

Occurs when a mission ends. Source: [https://wiki.hoggitworld.com/view/DCS_event_mission_end](https://wiki.hoggitworld.com/view/DCS_event_mission_end)

#### Type declaration:

* **id**: *12*

* **time**: *number*

___

###  EventMissionStart

Ƭ **EventMissionStart**: *object*

*Defined in [dcs/event.ts:230](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L230)*

Occurs when a mission starts. Source: [https://wiki.hoggitworld.com/view/DCS_event_mission_start](https://wiki.hoggitworld.com/view/DCS_event_mission_start)

#### Type declaration:

* **id**: *1*

* **time**: *number*

___

###  EventNeutralCoalition

Ƭ **EventNeutralCoalition**: *-1*

*Defined in [dcs/event.ts:37](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L37)*

Represents the neutral coalition returned by a DCS event

___

###  EventObject

Ƭ **EventObject**: *object*

*Defined in [dcs/event.ts:30](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L30)*

Represents an object returned by a DCS event

#### Type declaration:

* **_id**: *number*

___

###  EventPilotDead

Ƭ **EventPilotDead**: *object*

*Defined in [dcs/event.ts:238](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L238)*

Occurs when the pilot of an aircraft is killed. Can occur either if the player is alive and crashes or if a weapon kills the pilot without completely destroying the plane. Source: [https://wiki.hoggitworld.com/view/DCS_event_pilot_dead](https://wiki.hoggitworld.com/view/DCS_event_pilot_dead)

#### Type declaration:

* **id**: *9*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventPlayerComment

Ƭ **EventPlayerComment**: *object*

*Defined in [dcs/event.ts:247](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L247)*

Typically corresponds to generalized events that create a triggered message called directly from the game itself. Currently the only known cause appears to display a landing score when AI and occasionally when players land on an aircraft carrier. Source: [https://wiki.hoggitworld.com/view/DCS_event_player_comment](https://wiki.hoggitworld.com/view/DCS_event_player_comment)

#### Type declaration:

* **comment**: *string*

* **id**: *22*

* **time**: *number*

___

###  EventPlayerEnterUnit

Ƭ **EventPlayerEnterUnit**: *object*

*Defined in [dcs/event.ts:256](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L256)*

Occurs when any player assumes direct control of a unit. Source: [https://wiki.hoggitworld.com/view/DCS_event_player_enter_unit](https://wiki.hoggitworld.com/view/DCS_event_player_enter_unit)

#### Type declaration:

* **id**: *20*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventRedCoalition

Ƭ **EventRedCoalition**: *1*

*Defined in [dcs/event.ts:42](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L42)*

Represents the red coalition returned by a DCS event

___

###  EventRefueling

Ƭ **EventRefueling**: *object*

*Defined in [dcs/event.ts:274](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L274)*

Occurs when an aircraft connects with a tanker and begins taking on fuel. Source: [https://wiki.hoggitworld.com/view/DCS_event_refueling](https://wiki.hoggitworld.com/view/DCS_event_refueling)

#### Type declaration:

* **id**: *7*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventRefuelingStop

Ƭ **EventRefuelingStop**: *object*

*Defined in [dcs/event.ts:283](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L283)*

Occurs when an aircraft is finished taking fuel. Source: [https://wiki.hoggitworld.com/view/DCS_event_refueling_stop](https://wiki.hoggitworld.com/view/DCS_event_refueling_stop)

#### Type declaration:

* **id**: *14*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventScore

Ƭ **EventScore**: *object*

*Defined in [dcs/event.ts:292](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L292)*

Occurs when any modification to the "Score" as seen on the debrief menu would occur. There is no information on what values the score was changed to. Event is likely similar to player_comment in this regard. Source: [https://wiki.hoggitworld.com/view/DCS_event_score](https://wiki.hoggitworld.com/view/DCS_event_score)

#### Type declaration:

* **id**: *29*

* **time**: *number*

___

###  EventShootingEnd

Ƭ **EventShootingEnd**: *object*

*Defined in [dcs/event.ts:300](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L300)*

Occurs when any unit stops firing its weapon. Event will always correspond with a shooting start event. Source: [https://wiki.hoggitworld.com/view/DCS_event_shooting_end](https://wiki.hoggitworld.com/view/DCS_event_shooting_end)

#### Type declaration:

* **id**: *24*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventShootingStart

Ƭ **EventShootingStart**: *object*

*Defined in [dcs/event.ts:309](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L309)*

Occurs when any unit begins firing a weapon that has a high rate of fire. Most common with aircraft cannons (GAU-8), autocannons, and machine guns. Source: [https://wiki.hoggitworld.com/view/DCS_event_shooting_start](https://wiki.hoggitworld.com/view/DCS_event_shooting_start)

#### Type declaration:

* **id**: *23*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **target**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventShot

Ƭ **EventShot**: *object*

*Defined in [dcs/event.ts:319](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L319)*

Occurs whenever any unit in a mission fires a weapon. But not any machine gun or autocannon based weapon, those are handled by shooting_start. Source: [https://wiki.hoggitworld.com/view/DCS_event_shot](https://wiki.hoggitworld.com/view/DCS_event_shot)

#### Type declaration:

* **id**: *1*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

* **weapon**: *[EventWeapon](_dcs_event_.md#eventweapon)*

___

###  EventTakeoff

Ƭ **EventTakeoff**: *object*

*Defined in [dcs/event.ts:329](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L329)*

Occurs when an aircraft takes off from an airbase, farp, or ship. Source: [https://wiki.hoggitworld.com/view/DCS_event_takeoff](https://wiki.hoggitworld.com/view/DCS_event_takeoff)

#### Type declaration:

* **id**: *3*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **place**: *[EventObject](_dcs_event_.md#eventobject)*

* **subPlace**: *0*

* **time**: *number*

___

###  EventUnit

Ƭ **EventUnit**: *object*

*Defined in [dcs/event.ts:9](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L9)*

Represents an unit returned by a DCS event

#### Type declaration:

* **_id**: *number*

___

###  EventUnitLost

Ƭ **EventUnitLost**: *object*

*Defined in [dcs/event.ts:340](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L340)*

Occurs when the game thinks an object is destroyed. Source: [https://wiki.hoggitworld.com/view/DCS_event_unit_lost](https://wiki.hoggitworld.com/view/DCS_event_unit_lost)

#### Type declaration:

* **id**: *30*

* **initiator**: *[EventUnit](_dcs_event_.md#eventunit)*

* **time**: *number*

___

###  EventWeapon

Ƭ **EventWeapon**: *object*

*Defined in [dcs/event.ts:23](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L23)*

Represents a weapon returned by a DCS event

#### Type declaration:

* **_id**: *number*

## Functions

### `Const` addEventHandler

▸ **addEventHandler**‹**T**›(`id`: number, `handler`: [EventHandler](_dcs_event_.md#eventhandler)‹T›): *string*

*Defined in [dcs/event.ts:433](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L433)*

**Type parameters:**

▪ **T**

The type of the event payload that will be handled.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | number | The id of the event that is handled. Note: you should use the constants in the EVENTS object |
`handler` | [EventHandler](_dcs_event_.md#eventhandler)‹T› | The function handling the event, this is a generic function si a type must be provided |

**Returns:** *string*

the id of the handler that was created

___

### `Const` handleEvent

▸ **handleEvent**‹**T**›(`id`: number, `payload`: T): *void*

*Defined in [dcs/event.ts:415](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L415)*

**Type parameters:**

▪ **T**

The type of the event payload that is handled.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | number | The id of the event that is handled. Note: you should use the constants in the EVENTS object |
`payload` | T | The payload passed to the handler  |

**Returns:** *void*

___

### `Const` removeEventHandler

▸ **removeEventHandler**(`id`: number, `handlerId`: string): *void*

*Defined in [dcs/event.ts:448](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L448)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`id` | number | The id of the event that is handled. Note: you should use the constants in the EVENTS object |
`handlerId` | string | The id of the handler, you can retrieve this when adding a handler  |

**Returns:** *void*

## Object literals

### `Const` EVENTS

### ▪ **EVENTS**: *object*

*Defined in [dcs/event.ts:377](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L377)*

###  EventBaseCaptured

• **EventBaseCaptured**: *number* = 10

*Defined in [dcs/event.ts:378](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L378)*

###  EventBirth

• **EventBirth**: *number* = 15

*Defined in [dcs/event.ts:379](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L379)*

###  EventCrash

• **EventCrash**: *number* = 5

*Defined in [dcs/event.ts:380](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L380)*

###  EventDead

• **EventDead**: *number* = 8

*Defined in [dcs/event.ts:381](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L381)*

###  EventDetailedFailure

• **EventDetailedFailure**: *number* = 17

*Defined in [dcs/event.ts:382](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L382)*

###  EventEjection

• **EventEjection**: *number* = 6

*Defined in [dcs/event.ts:383](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L383)*

###  EventEngineShutdown

• **EventEngineShutdown**: *number* = 19

*Defined in [dcs/event.ts:384](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L384)*

###  EventEngineStartup

• **EventEngineStartup**: *number* = 18

*Defined in [dcs/event.ts:385](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L385)*

###  EventHit

• **EventHit**: *number* = 2

*Defined in [dcs/event.ts:386](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L386)*

###  EventKill

• **EventKill**: *number* = 28

*Defined in [dcs/event.ts:387](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L387)*

###  EventLand

• **EventLand**: *number* = 4

*Defined in [dcs/event.ts:388](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L388)*

###  EventLandingAfterEjection

• **EventLandingAfterEjection**: *number* = 31

*Defined in [dcs/event.ts:389](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L389)*

###  EventLeaveUnit

• **EventLeaveUnit**: *number* = 21

*Defined in [dcs/event.ts:398](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L398)*

###  EventMarkAdded

• **EventMarkAdded**: *number* = 25

*Defined in [dcs/event.ts:390](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L390)*

###  EventMarkChange

• **EventMarkChange**: *number* = 26

*Defined in [dcs/event.ts:391](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L391)*

###  EventMarkRemove

• **EventMarkRemove**: *number* = 27

*Defined in [dcs/event.ts:392](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L392)*

###  EventMissionEnd

• **EventMissionEnd**: *number* = 12

*Defined in [dcs/event.ts:393](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L393)*

###  EventMissionStart

• **EventMissionStart**: *number* = 1

*Defined in [dcs/event.ts:394](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L394)*

###  EventPilotDead

• **EventPilotDead**: *number* = 9

*Defined in [dcs/event.ts:395](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L395)*

###  EventPlayerComment

• **EventPlayerComment**: *number* = 22

*Defined in [dcs/event.ts:396](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L396)*

###  EventPlayerEnterUnit

• **EventPlayerEnterUnit**: *number* = 20

*Defined in [dcs/event.ts:397](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L397)*

###  EventRefueling

• **EventRefueling**: *number* = 7

*Defined in [dcs/event.ts:399](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L399)*

###  EventRefuelingStop

• **EventRefuelingStop**: *number* = 14

*Defined in [dcs/event.ts:400](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L400)*

###  EventScore

• **EventScore**: *number* = 29

*Defined in [dcs/event.ts:401](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L401)*

###  EventShootingEnd

• **EventShootingEnd**: *number* = 24

*Defined in [dcs/event.ts:402](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L402)*

###  EventShootingStart

• **EventShootingStart**: *number* = 23

*Defined in [dcs/event.ts:403](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L403)*

###  EventShot

• **EventShot**: *number* = 1

*Defined in [dcs/event.ts:404](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L404)*

###  EventTakeoff

• **EventTakeoff**: *number* = 3

*Defined in [dcs/event.ts:405](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L405)*

###  EventUnitLost

• **EventUnitLost**: *number* = 30

*Defined in [dcs/event.ts:406](https://github.com/Ked57/NIOD/blob/6c81e41/src/dcs/event.ts#L406)*
