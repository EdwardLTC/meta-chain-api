export declare const CollectionStatus: {
    readonly NEW: "NEW";
    readonly PENDING: "PENDING";
    readonly CREATED: "CREATED";
    readonly FAILED: "FAILED";
};
export type CollectionStatus = (typeof CollectionStatus)[keyof typeof CollectionStatus];
