export declare const CollectionStatus: {
    readonly PENDING: "PENDING";
    readonly CREATED: "CREATED";
    readonly FAILED: "FAILED";
};
export type CollectionStatus = (typeof CollectionStatus)[keyof typeof CollectionStatus];
export declare const TokenStatus: {
    readonly PENDING: "PENDING";
    readonly MINTED: "MINTED";
    readonly FAILED: "FAILED";
};
export type TokenStatus = (typeof TokenStatus)[keyof typeof TokenStatus];
export declare const ListingStatus: {
    readonly PENDING: "PENDING";
    readonly ACTIVE: "ACTIVE";
    readonly SOLD: "SOLD";
    readonly CANCELLED: "CANCELLED";
};
export type ListingStatus = (typeof ListingStatus)[keyof typeof ListingStatus];
