[niod-core](../README.md) › [Globals](../globals.md) › ["types/network_types"](_types_network_types_.md)

# Module: "types/network_types"

## Index

### Type aliases

* [NetWorkOnListen](_types_network_types_.md#networkonlisten)
* [NetworkOnError](_types_network_types_.md#networkonerror)
* [NetworkOnMessage](_types_network_types_.md#networkonmessage)
* [NetworkSend](_types_network_types_.md#networksend)

## Type aliases

###  NetWorkOnListen

Ƭ **NetWorkOnListen**: *function*

*Defined in [types/network_types.ts:5](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/network_types.ts#L5)*

#### Type declaration:

▸ (): *Promise‹void›*

___

###  NetworkOnError

Ƭ **NetworkOnError**: *function*

*Defined in [types/network_types.ts:3](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/network_types.ts#L3)*

#### Type declaration:

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

___

###  NetworkOnMessage

Ƭ **NetworkOnMessage**: *function*

*Defined in [types/network_types.ts:4](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/network_types.ts#L4)*

#### Type declaration:

▸ (`msg`: Buffer, `rinfo`: AddressInfo): *void*

**Parameters:**

Name | Type |
------ | ------ |
`msg` | Buffer |
`rinfo` | AddressInfo |

___

###  NetworkSend

Ƭ **NetworkSend**: *function*

*Defined in [types/network_types.ts:7](https://github.com/Ked57/NIOD/blob/87bd7cb/src/types/network_types.ts#L7)*

#### Type declaration:

▸ (`payload`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`payload` | string |
