[niod](../README.md) › [Globals](../globals.md) › ["types/store_types"](_types_store_types_.md)

# Module: "types/store_types"

## Index

### Type aliases

* [Mutate](_types_store_types_.md#mutate)
* [Store](_types_store_types_.md#store)

## Type aliases

###  Mutate

Ƭ **Mutate**: *function*

*Defined in [types/store_types.ts:22](https://github.com/Ked57/NIOD/blob/1fd2777/src/types/store_types.ts#L22)*

#### Type declaration:

▸ (`mutationName`: string, `args`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`mutationName` | string |
`args` | any |

___

###  Store

Ƭ **Store**: *object*

*Defined in [types/store_types.ts:7](https://github.com/Ked57/NIOD/blob/1fd2777/src/types/store_types.ts#L7)*

#### Type declaration:

* **callbacks**: *Map‹string, [Callback](_types_dispatch_types_.md#callback)‹any››*

* **config**(): *object*

  * **distantPort**: *number*

  * **ownPort**: *number*

* **eventHandlers**(): *object*

* **networkSend**: *[NetworkSend](_types_network_types_.md#networksend) | undefined*

* **receivedMessages**: *[Message](_types_message_types_.md#message)[]*

* **sentMessages**: *[Message](_types_message_types_.md#message)[]*

* **server**: *Socket | undefined*
