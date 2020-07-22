[niod-core](../README.md) › [Globals](../globals.md) › ["types/message_types"](_types_message_types_.md)

# Module: "types/message_types"

## Index

### Type aliases

* [Message](_types_message_types_.md#message)
* [MessageType](_types_message_types_.md#messagetype)
* [MessageTypeEvent](_types_message_types_.md#messagetypeevent)
* [MessageTypeFunction](_types_message_types_.md#messagetypefunction)
* [MessageTypeReceived](_types_message_types_.md#messagetypereceived)

### Functions

* [isMessageType](_types_message_types_.md#const-ismessagetype)
* [isMessageTypeEvent](_types_message_types_.md#const-ismessagetypeevent)
* [isMessageTypeFunction](_types_message_types_.md#const-ismessagetypefunction)
* [isMessageTypeReceived](_types_message_types_.md#const-ismessagetypereceived)
* [isMesssage](_types_message_types_.md#const-ismesssage)

## Type aliases

###  Message

Ƭ **Message**: *object*

*Defined in [types/message_types.ts:12](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L12)*

#### Type declaration:

* **callbackId**: *string | undefined*

* **id**: *string*

* **payload**(): *object*

* **sent**: *number*

* **type**: *[MessageType](_types_message_types_.md#messagetype)*

___

###  MessageType

Ƭ **MessageType**: *[MessageTypeFunction](_types_message_types_.md#messagetypefunction) | [MessageTypeEvent](_types_message_types_.md#messagetypeevent) | [MessageTypeReceived](_types_message_types_.md#messagetypereceived)*

*Defined in [types/message_types.ts:7](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L7)*

___

###  MessageTypeEvent

Ƭ **MessageTypeEvent**: *"event"*

*Defined in [types/message_types.ts:3](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L3)*

___

###  MessageTypeFunction

Ƭ **MessageTypeFunction**: *"function"*

*Defined in [types/message_types.ts:1](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L1)*

___

###  MessageTypeReceived

Ƭ **MessageTypeReceived**: *"received"*

*Defined in [types/message_types.ts:5](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L5)*

## Functions

### `Const` isMessageType

▸ **isMessageType**(`input`: any): *input is MessageType*

*Defined in [types/message_types.ts:29](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | any |

**Returns:** *input is MessageType*

___

### `Const` isMessageTypeEvent

▸ **isMessageTypeEvent**(`input`: any): *input is MessageTypeEvent*

*Defined in [types/message_types.ts:23](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | any |

**Returns:** *input is MessageTypeEvent*

___

### `Const` isMessageTypeFunction

▸ **isMessageTypeFunction**(`input`: any): *input is MessageTypeFunction*

*Defined in [types/message_types.ts:20](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | any |

**Returns:** *input is MessageTypeFunction*

___

### `Const` isMessageTypeReceived

▸ **isMessageTypeReceived**(`input`: any): *input is MessageTypeReceived*

*Defined in [types/message_types.ts:25](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | any |

**Returns:** *input is MessageTypeReceived*

___

### `Const` isMesssage

▸ **isMesssage**(`data`: object): *data is Message*

*Defined in [types/message_types.ts:34](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/message_types.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | object |

**Returns:** *data is Message*
