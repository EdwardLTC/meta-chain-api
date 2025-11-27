import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "6.18.0",
    engine: "34b5a692b7bd79939a9a2c3ef97d816e749cda2f"
};
export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull,
    JsonNull: runtime.objectEnumValues.classes.JsonNull,
    AnyNull: runtime.objectEnumValues.classes.AnyNull,
};
export const DbNull = runtime.objectEnumValues.instances.DbNull;
export const JsonNull = runtime.objectEnumValues.instances.JsonNull;
export const AnyNull = runtime.objectEnumValues.instances.AnyNull;
export const ModelName = {
    User: 'User',
    Collection: 'Collection',
    Token: 'Token',
    Listing: 'Listing',
    Order: 'Order'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    username: 'username',
    walletAddress: 'walletAddress',
    email: 'email',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CollectionScalarFieldEnum = {
    id: 'id',
    status: 'status',
    userId: 'userId',
    creatorAddress: 'creatorAddress',
    name: 'name',
    symbol: 'symbol',
    description: 'description',
    image: 'image',
    royaltyFeeBps: 'royaltyFeeBps',
    txHash: 'txHash',
    contractAddress: 'contractAddress',
    txData: 'txData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TokenScalarFieldEnum = {
    id: 'id',
    collectionId: 'collectionId',
    contractAddress: 'contractAddress',
    tokenId: 'tokenId',
    ownerAddress: 'ownerAddress',
    tokenUri: 'tokenUri',
    name: 'name',
    description: 'description',
    image: 'image',
    mintTxHash: 'mintTxHash',
    status: 'status',
    txData: 'txData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ListingScalarFieldEnum = {
    id: 'id',
    tokenId: 'tokenId',
    sellerAddress: 'sellerAddress',
    price: 'price',
    paymentToken: 'paymentToken',
    status: 'status',
    expiresAt: 'expiresAt',
    onchainId: 'onchainId',
    txHash: 'txHash',
    txData: 'txData',
    orderData: 'orderData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const OrderScalarFieldEnum = {
    id: 'id',
    listingId: 'listingId',
    buyer: 'buyer',
    seller: 'seller',
    price: 'price',
    txHash: 'txHash',
    status: 'status',
    txData: 'txData',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.mjs.map