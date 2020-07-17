[niod](../README.md) › [Globals](../globals.md) › ["queue"](_queue_.md)

# Module: "queue"

## Index

### Functions

* [dequeue](_queue_.md#const-dequeue)
* [enqueue](_queue_.md#const-enqueue)
* [handleQueue](_queue_.md#const-handlequeue)
* [removeFromQueue](_queue_.md#const-removefromqueue)

## Functions

### `Const` dequeue

▸ **dequeue**(`queue`: [Message](_types_message_types_.md#message)[], `setter`: function): *[Message](_types_message_types_.md#message) | undefined*

*Defined in [queue.ts:12](https://github.com/Ked57/NIOD/blob/1fd2777/src/queue.ts#L12)*

**Parameters:**

▪ **queue**: *[Message](_types_message_types_.md#message)[]*

▪ **setter**: *function*

▸ (`messages`: [Message](_types_message_types_.md#message)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`messages` | [Message](_types_message_types_.md#message)[] |

**Returns:** *[Message](_types_message_types_.md#message) | undefined*

___

### `Const` enqueue

▸ **enqueue**(`message`: [Message](_types_message_types_.md#message), `queue`: [Message](_types_message_types_.md#message)[], `setter`: function): *void*

*Defined in [queue.ts:3](https://github.com/Ked57/NIOD/blob/1fd2777/src/queue.ts#L3)*

**Parameters:**

▪ **message**: *[Message](_types_message_types_.md#message)*

▪ **queue**: *[Message](_types_message_types_.md#message)[]*

▪ **setter**: *function*

▸ (`messages`: [Message](_types_message_types_.md#message)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`messages` | [Message](_types_message_types_.md#message)[] |

**Returns:** *void*

___

### `Const` handleQueue

▸ **handleQueue**(`queue`: [Message](_types_message_types_.md#message)[], `setter`: function, `messageHandler`: function): *void*

*Defined in [queue.ts:38](https://github.com/Ked57/NIOD/blob/1fd2777/src/queue.ts#L38)*

**Parameters:**

▪ **queue**: *[Message](_types_message_types_.md#message)[]*

▪ **setter**: *function*

▸ (`messages`: [Message](_types_message_types_.md#message)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`messages` | [Message](_types_message_types_.md#message)[] |

▪ **messageHandler**: *function*

▸ (`message`: [Message](_types_message_types_.md#message)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`message` | [Message](_types_message_types_.md#message) |

**Returns:** *void*

___

### `Const` removeFromQueue

▸ **removeFromQueue**(`message`: [Message](_types_message_types_.md#message), `queue`: [Message](_types_message_types_.md#message)[], `setter`: function): *[Message](_types_message_types_.md#message) | undefined*

*Defined in [queue.ts:21](https://github.com/Ked57/NIOD/blob/1fd2777/src/queue.ts#L21)*

**Parameters:**

▪ **message**: *[Message](_types_message_types_.md#message)*

▪ **queue**: *[Message](_types_message_types_.md#message)[]*

▪ **setter**: *function*

▸ (`messages`: [Message](_types_message_types_.md#message)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`messages` | [Message](_types_message_types_.md#message)[] |

**Returns:** *[Message](_types_message_types_.md#message) | undefined*
