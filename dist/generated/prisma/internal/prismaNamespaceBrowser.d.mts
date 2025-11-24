import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.mjs';
export type * from './prismaNamespace.mjs';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Collection: "Collection";
    readonly Token: "Token";
    readonly TokenAttribute: "TokenAttribute";
    readonly Listing: "Listing";
    readonly Order: "Order";
    readonly EventCursor: "EventCursor";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly walletAddress: "walletAddress";
    readonly email: "email";
    readonly avatarUrl: "avatarUrl";
    readonly bio: "bio";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CollectionScalarFieldEnum: {
    readonly id: "id";
    readonly status: "status";
    readonly userId: "userId";
    readonly creatorAddress: "creatorAddress";
    readonly name: "name";
    readonly symbol: "symbol";
    readonly description: "description";
    readonly image: "image";
    readonly royaltyFeeBps: "royaltyFeeBps";
    readonly txHash: "txHash";
    readonly contractAddress: "contractAddress";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CollectionScalarFieldEnum = (typeof CollectionScalarFieldEnum)[keyof typeof CollectionScalarFieldEnum];
export declare const TokenScalarFieldEnum: {
    readonly id: "id";
    readonly contractAddress: "contractAddress";
    readonly tokenId: "tokenId";
    readonly ownerAddress: "ownerAddress";
    readonly tokenUri: "tokenUri";
    readonly name: "name";
    readonly description: "description";
    readonly image: "image";
    readonly metadataJson: "metadataJson";
    readonly mintTxHash: "mintTxHash";
    readonly firstSeenAt: "firstSeenAt";
    readonly lastSyncedAt: "lastSyncedAt";
    readonly collectionId: "collectionId";
};
export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum];
export declare const TokenAttributeScalarFieldEnum: {
    readonly id: "id";
    readonly tokenId: "tokenId";
    readonly traitType: "traitType";
    readonly value: "value";
    readonly rarity: "rarity";
};
export type TokenAttributeScalarFieldEnum = (typeof TokenAttributeScalarFieldEnum)[keyof typeof TokenAttributeScalarFieldEnum];
export declare const ListingScalarFieldEnum: {
    readonly id: "id";
    readonly tokenId: "tokenId";
    readonly sellerAddress: "sellerAddress";
    readonly price: "price";
    readonly currency: "currency";
    readonly status: "status";
    readonly expiresAt: "expiresAt";
    readonly source: "source";
    readonly orderData: "orderData";
    readonly txHash: "txHash";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly listingId: "listingId";
    readonly buyer: "buyer";
    readonly seller: "seller";
    readonly price: "price";
    readonly txHash: "txHash";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const EventCursorScalarFieldEnum: {
    readonly id: "id";
    readonly lastBlock: "lastBlock";
};
export type EventCursorScalarFieldEnum = (typeof EventCursorScalarFieldEnum)[keyof typeof EventCursorScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
