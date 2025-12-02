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
    Listing: 'Listing'
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
    txData: 'txData',
    txHash: 'txHash',
    contractAddress: 'contractAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const TokenScalarFieldEnum = {
    id: 'id',
    collectionId: 'collectionId',
    ownerAddress: 'ownerAddress',
    tokenUri: 'tokenUri',
    name: 'name',
    description: 'description',
    image: 'image',
    status: 'status',
    txData: 'txData',
    txHash: 'txHash',
    onchainId: 'onchainId',
    contractAddress: 'contractAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ListingScalarFieldEnum = {
    id: 'id',
    tokenId: 'tokenId',
    sellerAddress: 'sellerAddress',
    price: 'price',
    status: 'status',
    expiresAt: 'expiresAt',
    txData: 'txData',
    onchainId: 'onchainId',
    txHash: 'txHash',
    buyerAddress: 'buyerAddress',
    paymentToken: 'paymentToken',
    soldAt: 'soldAt',
    marketFeeBps: 'marketFeeBps',
    marketFeeAmount: 'marketFeeAmount',
    feeRecipient: 'feeRecipient',
    royaltyReceiver: 'royaltyReceiver',
    royaltyAmount: 'royaltyAmount',
    sellerProceeds: 'sellerProceeds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const JsonNullValueInput = {
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