export declare const CollectionStatus: {
    readonly NEW: "NEW";
    readonly PENDING: "PENDING";
    readonly CREATED: "CREATED";
    readonly FAILED: "FAILED";
};
export type CollectionStatus = (typeof CollectionStatus)[keyof typeof CollectionStatus];
export declare const TokenStatus: {
    readonly NEW: "NEW";
    readonly PENDING: "PENDING";
    readonly MINTED: "MINTED";
    readonly FAILED: "FAILED";
};
export type TokenStatus = (typeof TokenStatus)[keyof typeof TokenStatus];
