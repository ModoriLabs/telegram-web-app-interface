import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    queryId: bigint;
    new_owner: Address;
    url: string;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(794301230, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_owner);
        b_0.storeStringRefTail(src.url);
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 794301230) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadIntBig(257);
    let _new_owner = sc_0.loadAddress();
    let _url = sc_0.loadStringRefTail();
    return { $$type: 'Transfer' as const, queryId: _queryId, new_owner: _new_owner, url: _url };
}

function loadTupleTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _url = source.readString();
    return { $$type: 'Transfer' as const, queryId: _queryId, new_owner: _new_owner, url: _url };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_owner);
    builder.writeString(source.url);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type SetReward = {
    $$type: 'SetReward';
    reward: bigint;
}

export function storeSetReward(src: SetReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2357565552, 32);
        b_0.storeInt(src.reward, 257);
    };
}

export function loadSetReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2357565552) { throw Error('Invalid prefix'); }
    let _reward = sc_0.loadIntBig(257);
    return { $$type: 'SetReward' as const, reward: _reward };
}

function loadTupleSetReward(source: TupleReader) {
    let _reward = source.readBigNumber();
    return { $$type: 'SetReward' as const, reward: _reward };
}

function storeTupleSetReward(source: SetReward) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.reward);
    return builder.build();
}

function dictValueParserSetReward(): DictionaryValue<SetReward> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetReward(src)).endCell());
        },
        parse: (src) => {
            return loadSetReward(src.loadRef().beginParse());
        }
    }
}

export type UpdateUrl = {
    $$type: 'UpdateUrl';
    url: string;
}

export function storeUpdateUrl(src: UpdateUrl) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(938250763, 32);
        b_0.storeStringRefTail(src.url);
    };
}

export function loadUpdateUrl(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 938250763) { throw Error('Invalid prefix'); }
    let _url = sc_0.loadStringRefTail();
    return { $$type: 'UpdateUrl' as const, url: _url };
}

function loadTupleUpdateUrl(source: TupleReader) {
    let _url = source.readString();
    return { $$type: 'UpdateUrl' as const, url: _url };
}

function storeTupleUpdateUrl(source: UpdateUrl) {
    let builder = new TupleBuilder();
    builder.writeString(source.url);
    return builder.build();
}

function dictValueParserUpdateUrl(): DictionaryValue<UpdateUrl> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateUrl(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateUrl(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    url: string;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2007586958, 32);
        b_0.storeStringRefTail(src.url);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2007586958) { throw Error('Invalid prefix'); }
    let _url = sc_0.loadStringRefTail();
    return { $$type: 'Mint' as const, url: _url };
}

function loadTupleMint(source: TupleReader) {
    let _url = source.readString();
    return { $$type: 'Mint' as const, url: _url };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeString(source.url);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type ItemData = {
    $$type: 'ItemData';
    owner: Address;
    collection_address: Address;
    item_index: bigint;
    url: string;
    reward: bigint;
}

export function storeItemData(src: ItemData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeStringRefTail(src.url);
        let b_1 = new Builder();
        b_1.storeInt(src.reward, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadItemData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _collection_address = sc_0.loadAddress();
    let _item_index = sc_0.loadIntBig(257);
    let _url = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _reward = sc_1.loadIntBig(257);
    return { $$type: 'ItemData' as const, owner: _owner, collection_address: _collection_address, item_index: _item_index, url: _url, reward: _reward };
}

function loadTupleItemData(source: TupleReader) {
    let _owner = source.readAddress();
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _url = source.readString();
    let _reward = source.readBigNumber();
    return { $$type: 'ItemData' as const, owner: _owner, collection_address: _collection_address, item_index: _item_index, url: _url, reward: _reward };
}

function storeTupleItemData(source: ItemData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.collection_address);
    builder.writeNumber(source.item_index);
    builder.writeString(source.url);
    builder.writeNumber(source.reward);
    return builder.build();
}

function dictValueParserItemData(): DictionaryValue<ItemData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeItemData(src)).endCell());
        },
        parse: (src) => {
            return loadItemData(src.loadRef().beginParse());
        }
    }
}

export type CollectionMetadata = {
    $$type: 'CollectionMetadata';
    image: string;
    name: string;
    description: string;
}

export function storeCollectionMetadata(src: CollectionMetadata) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.image);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
    };
}

export function loadCollectionMetadata(slice: Slice) {
    let sc_0 = slice;
    let _image = sc_0.loadStringRefTail();
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    return { $$type: 'CollectionMetadata' as const, image: _image, name: _name, description: _description };
}

function loadTupleCollectionMetadata(source: TupleReader) {
    let _image = source.readString();
    let _name = source.readString();
    let _description = source.readString();
    return { $$type: 'CollectionMetadata' as const, image: _image, name: _name, description: _description };
}

function storeTupleCollectionMetadata(source: CollectionMetadata) {
    let builder = new TupleBuilder();
    builder.writeString(source.image);
    builder.writeString(source.name);
    builder.writeString(source.description);
    return builder.build();
}

function dictValueParserCollectionMetadata(): DictionaryValue<CollectionMetadata> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionMetadata(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionMetadata(src.loadRef().beginParse());
        }
    }
}

 type NftItem_init_args = {
    $$type: 'NftItem_init_args';
    owner: Address;
    collection_address: Address;
    item_index: bigint;
    url: string;
    reward: bigint;
}

function initNftItem_init_args(src: NftItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeStringRefTail(src.url);
        let b_1 = new Builder();
        b_1.storeInt(src.reward, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function NftItem_init(owner: Address, collection_address: Address, item_index: bigint, url: string, reward: bigint) {
    const __code = Cell.fromBase64('te6ccgECHQEABKEAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCFgQFAgEgDA0E7u2i7fsBkjB/4HAh10nCH5UwINcLH94gghCMhZhwuo6dMNMfAYIQjIWYcLry4IGBAQHXAAExVUDbPDBVA3/gIIIQL1gTLrrjAiCCEDfskgu6jpww0x8BghA37JILuvLggdQB0DFVQNs8MRA0QTB/4CCCEJRqmLa6CAYIBwC0yPhDAcx/AcoAVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLH8hQA88WyVjMAfoCye1UAY4w0x8BghAvWBMuuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdBDMGwTMhBGEDVGVts8MTNafwgC9I6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAI7H+QGC8C/TxTlKmhf6HxQIguNnDZlCi8qX3ndeyi9oKqh971VAuo6f+CdvEPhBbyQTXwOhUhC2CPhCf1hxECNtbW3bPH/bMeCRMOJwCQoAEvhCUlDHBfLghAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwKAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAODwIBIBkaAhG4es2zzbPGxVgWEAIBIBESAA5UcjRTQxAkAgEgExQCEbSku2ebZ42KMBYXAhGxR3bPNs8bFGAWFwIRsN52zzbPGxRgFhUAAiEByO1E0NQB+GPSAAGOTPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9QB0AH6AFVAbBXg+CjXCwqDCbry4IkYAAIkALT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdAB1AHQgQEB1wAwFRRDMAXRVQMAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcEDOdWnnFfnSULAdYW4mR7KAIBSBscABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVE5MlZZdmprbm9DUkFKTVRpdFVwOHpFckUySFFISlNIckhZcHRvc3drV2pTgg');
    const __system = Cell.fromBase64('te6cckECHwEABKsAAQHAAQEFoPPVAgEU/wD0pBP0vPLICwMCAWIUBAIBIAoFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtUTkyVll2amtub0NSQUpNVGl0VXA4ekVyRTJIUUhKU0hySFlwdG9zd2tXalOCAAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgEgEgsCASANDAIRtKS7Z5tnjYowHRECASAQDgIRsN52zzbPGxRgHQ8AAiECEbFHds82zxsUYB0RAAIkAhG4es2zzbPGxVgdEwAOVHI0U0MQJAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLggh0WFQC0yPhDAcx/AcoAVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLH8hQA88WyVjMAfoCye1UBO7tou37AZIwf+BwIddJwh+VMCDXCx/eIIIQjIWYcLqOnTDTHwGCEIyFmHC68uCBgQEB1wABMVVA2zwwVQN/4CCCEC9YEy664wIgghA37JILuo6cMNMfAYIQN+ySC7ry4IHUAdAxVUDbPDEQNEEwf+AgghCUapi2uhwbHBcC9I6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAI7H+QGC8C/TxTlKmhf6HxQIguNnDZlCi8qX3ndeyi9oKqh971VAuo6f+CdvEPhBbyQTXwOhUhC2CPhCf1hxECNtbW3bPH/bMeCRMOJwGBkBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8GQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAaAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAY4w0x8BghAvWBMuuvLggYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdBDMGwTMhBGEDVGVts8MTNafxwAEvhCUlDHBfLghAHI7UTQ1AH4Y9IAAY5M+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf1AHQAfoAVUBsFeD4KNcLCoMJuvLgiR4AtPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQB0AHUAdCBAQHXADAVFEMwBdFVA3E1xWA=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftItem_init_args({ $$type: 'NftItem_init_args', owner, collection_address, item_index, url, reward })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftItem_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    57218: { message: `not enough value` },
    62742: { message: `non-sequential NFTs` },
}

const NftItem_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":794301230,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"url","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"SetReward","header":2357565552,"fields":[{"name":"reward","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateUrl","header":938250763,"fields":[{"name":"url","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Mint","header":2007586958,"fields":[{"name":"url","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ItemData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"url","type":{"kind":"simple","type":"string","optional":false}},{"name":"reward","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CollectionMetadata","header":null,"fields":[{"name":"image","type":{"kind":"simple","type":"string","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
]

const NftItem_getters: ABIGetter[] = [
    {"name":"getItemData","arguments":[],"returnType":{"kind":"simple","type":"ItemData","optional":false}},
    {"name":"getUrl","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"getOwnerAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const NftItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"Claim"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetReward"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Transfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateUrl"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class NftItem implements Contract {
    
    static async init(owner: Address, collection_address: Address, item_index: bigint, url: string, reward: bigint) {
        return await NftItem_init(owner, collection_address, item_index, url, reward);
    }
    
    static async fromInit(owner: Address, collection_address: Address, item_index: bigint, url: string, reward: bigint) {
        const init = await NftItem_init(owner, collection_address, item_index, url, reward);
        const address = contractAddress(0, init);
        return new NftItem(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftItem_types,
        getters: NftItem_getters,
        receivers: NftItem_receivers,
        errors: NftItem_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Claim' | SetReward | Transfer | UpdateUrl | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'Claim') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetReward') {
            body = beginCell().store(storeSetReward(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Transfer') {
            body = beginCell().store(storeTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateUrl') {
            body = beginCell().store(storeUpdateUrl(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetItemData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getItemData', builder.build())).stack;
        const result = loadTupleItemData(source);
        return result;
    }
    
    async getGetUrl(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getUrl', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getGetOwnerAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getOwnerAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}