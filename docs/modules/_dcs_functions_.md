[niod](../README.md) › [Globals](../globals.md) › ["dcs/functions"](_dcs_functions_.md)

# Module: "dcs/functions"

## Index

### Type aliases

* [GetGroupsPayload](_dcs_functions_.md#getgroupspayload)
* [GetGroupsReturn](_dcs_functions_.md#getgroupsreturn)
* [GetUnitsPayload](_dcs_functions_.md#getunitspayload)
* [GetUnitsReturn](_dcs_functions_.md#getunitsreturn)

### Functions

* [executeFunction](_dcs_functions_.md#const-executefunction)
* [getGroups](_dcs_functions_.md#const-getgroups)
* [getUnits](_dcs_functions_.md#const-getunits)

## Type aliases

###  GetGroupsPayload

Ƭ **GetGroupsPayload**: *object*

*Defined in [dcs/functions.ts:3](https://github.com/Ked57/NIOD/blob/1fd2777/src/dcs/functions.ts#L3)*

#### Type declaration:

* **coalitionId**: *number*

* **groupCategory**? : *undefined | number*

___

###  GetGroupsReturn

Ƭ **GetGroupsReturn**: *object[]*

*Defined in [dcs/functions.ts:7](https://github.com/Ked57/NIOD/blob/1fd2777/src/dcs/functions.ts#L7)*

___

###  GetUnitsPayload

Ƭ **GetUnitsPayload**: *object*

*Defined in [dcs/functions.ts:27](https://github.com/Ked57/NIOD/blob/1fd2777/src/dcs/functions.ts#L27)*

#### Type declaration:

* **groupName**: *string*

___

###  GetUnitsReturn

Ƭ **GetUnitsReturn**: *object*

*Defined in [dcs/functions.ts:30](https://github.com/Ked57/NIOD/blob/1fd2777/src/dcs/functions.ts#L30)*

#### Type declaration:

## Functions

### `Const` executeFunction

▸ **executeFunction**‹**T**, **R**›(`functionName`: string, `args`: T): *Promise‹R›*

*Defined in [dcs/functions.ts:46](https://github.com/Ked57/NIOD/blob/1fd2777/src/dcs/functions.ts#L46)*

Allows to execute any function in the lua `niod.function` table

**Type parameters:**

▪ **T**

The type of the arguments you want to pass to the function.

▪ **R**

The type of the result you expect.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`functionName` | string | The name of the function you want to execute |
`args` | T | The arguments you want to pass to the function  |

**Returns:** *Promise‹R›*

___

### `Const` getGroups

▸ **getGroups**(`coalitionId`: number, `groupCategory?`: undefined | number): *Promise‹object[]›*

*Defined in [dcs/functions.ts:21](https://github.com/Ked57/NIOD/blob/1fd2777/src/dcs/functions.ts#L21)*

Allows to retrieve informations about groups from a coalition

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`coalitionId` | number | The id of the coalition you want to retrieve the groups from. Note: you should use the constants in the COALITIONS object |
`groupCategory?` | undefined &#124; number | The category of the group, I'm not sure what it corresponds to  |

**Returns:** *Promise‹object[]›*

___

### `Const` getUnits

▸ **getUnits**(`groupName`: string): *Promise‹object›*

*Defined in [dcs/functions.ts:36](https://github.com/Ked57/NIOD/blob/1fd2777/src/dcs/functions.ts#L36)*

Allows to retrieve informations about units from a group

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`groupName` | string | The name of the group you want to retrieve the units from  |

**Returns:** *Promise‹object›*
