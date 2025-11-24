import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.mjs";
export type TokenModel = runtime.Types.Result.DefaultSelection<Prisma.$TokenPayload>;
export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null;
    _min: TokenMinAggregateOutputType | null;
    _max: TokenMaxAggregateOutputType | null;
};
export type TokenMinAggregateOutputType = {
    id: string | null;
    contractAddress: string | null;
    tokenId: string | null;
    ownerAddress: string | null;
    tokenUri: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    mintTxHash: string | null;
    firstSeenAt: Date | null;
    lastSyncedAt: Date | null;
    collectionId: string | null;
};
export type TokenMaxAggregateOutputType = {
    id: string | null;
    contractAddress: string | null;
    tokenId: string | null;
    ownerAddress: string | null;
    tokenUri: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    mintTxHash: string | null;
    firstSeenAt: Date | null;
    lastSyncedAt: Date | null;
    collectionId: string | null;
};
export type TokenCountAggregateOutputType = {
    id: number;
    contractAddress: number;
    tokenId: number;
    ownerAddress: number;
    tokenUri: number;
    name: number;
    description: number;
    image: number;
    metadataJson: number;
    mintTxHash: number;
    firstSeenAt: number;
    lastSyncedAt: number;
    collectionId: number;
    _all: number;
};
export type TokenMinAggregateInputType = {
    id?: true;
    contractAddress?: true;
    tokenId?: true;
    ownerAddress?: true;
    tokenUri?: true;
    name?: true;
    description?: true;
    image?: true;
    mintTxHash?: true;
    firstSeenAt?: true;
    lastSyncedAt?: true;
    collectionId?: true;
};
export type TokenMaxAggregateInputType = {
    id?: true;
    contractAddress?: true;
    tokenId?: true;
    ownerAddress?: true;
    tokenUri?: true;
    name?: true;
    description?: true;
    image?: true;
    mintTxHash?: true;
    firstSeenAt?: true;
    lastSyncedAt?: true;
    collectionId?: true;
};
export type TokenCountAggregateInputType = {
    id?: true;
    contractAddress?: true;
    tokenId?: true;
    ownerAddress?: true;
    tokenUri?: true;
    name?: true;
    description?: true;
    image?: true;
    metadataJson?: true;
    mintTxHash?: true;
    firstSeenAt?: true;
    lastSyncedAt?: true;
    collectionId?: true;
    _all?: true;
};
export type TokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput | Prisma.TokenOrderByWithRelationInput[];
    cursor?: Prisma.TokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TokenCountAggregateInputType;
    _min?: TokenMinAggregateInputType;
    _max?: TokenMaxAggregateInputType;
};
export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
    [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateToken[P]> : Prisma.GetScalarType<T[P], AggregateToken[P]>;
};
export type TokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithAggregationInput | Prisma.TokenOrderByWithAggregationInput[];
    by: Prisma.TokenScalarFieldEnum[] | Prisma.TokenScalarFieldEnum;
    having?: Prisma.TokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TokenCountAggregateInputType | true;
    _min?: TokenMinAggregateInputType;
    _max?: TokenMaxAggregateInputType;
};
export type TokenGroupByOutputType = {
    id: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    metadataJson: runtime.JsonValue | null;
    mintTxHash: string | null;
    firstSeenAt: Date | null;
    lastSyncedAt: Date | null;
    collectionId: string | null;
    _count: TokenCountAggregateOutputType | null;
    _min: TokenMinAggregateOutputType | null;
    _max: TokenMaxAggregateOutputType | null;
};
type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TokenGroupByOutputType[P]>;
}>>;
export type TokenWhereInput = {
    AND?: Prisma.TokenWhereInput | Prisma.TokenWhereInput[];
    OR?: Prisma.TokenWhereInput[];
    NOT?: Prisma.TokenWhereInput | Prisma.TokenWhereInput[];
    id?: Prisma.StringFilter<"Token"> | string;
    contractAddress?: Prisma.StringFilter<"Token"> | string;
    tokenId?: Prisma.StringFilter<"Token"> | string;
    ownerAddress?: Prisma.StringFilter<"Token"> | string;
    tokenUri?: Prisma.StringNullableFilter<"Token"> | string | null;
    name?: Prisma.StringNullableFilter<"Token"> | string | null;
    description?: Prisma.StringNullableFilter<"Token"> | string | null;
    image?: Prisma.StringNullableFilter<"Token"> | string | null;
    metadataJson?: Prisma.JsonNullableFilter<"Token">;
    mintTxHash?: Prisma.StringNullableFilter<"Token"> | string | null;
    firstSeenAt?: Prisma.DateTimeNullableFilter<"Token"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"Token"> | Date | string | null;
    collectionId?: Prisma.StringNullableFilter<"Token"> | string | null;
    collection?: Prisma.XOR<Prisma.CollectionNullableScalarRelationFilter, Prisma.CollectionWhereInput> | null;
    listings?: Prisma.ListingListRelationFilter;
    attributes?: Prisma.TokenAttributeListRelationFilter;
};
export type TokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadataJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    mintTxHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    collectionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    collection?: Prisma.CollectionOrderByWithRelationInput;
    listings?: Prisma.ListingOrderByRelationAggregateInput;
    attributes?: Prisma.TokenAttributeOrderByRelationAggregateInput;
};
export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    contractAddress_tokenId?: Prisma.TokenContractAddressTokenIdCompoundUniqueInput;
    AND?: Prisma.TokenWhereInput | Prisma.TokenWhereInput[];
    OR?: Prisma.TokenWhereInput[];
    NOT?: Prisma.TokenWhereInput | Prisma.TokenWhereInput[];
    contractAddress?: Prisma.StringFilter<"Token"> | string;
    tokenId?: Prisma.StringFilter<"Token"> | string;
    ownerAddress?: Prisma.StringFilter<"Token"> | string;
    tokenUri?: Prisma.StringNullableFilter<"Token"> | string | null;
    name?: Prisma.StringNullableFilter<"Token"> | string | null;
    description?: Prisma.StringNullableFilter<"Token"> | string | null;
    image?: Prisma.StringNullableFilter<"Token"> | string | null;
    metadataJson?: Prisma.JsonNullableFilter<"Token">;
    mintTxHash?: Prisma.StringNullableFilter<"Token"> | string | null;
    firstSeenAt?: Prisma.DateTimeNullableFilter<"Token"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"Token"> | Date | string | null;
    collectionId?: Prisma.StringNullableFilter<"Token"> | string | null;
    collection?: Prisma.XOR<Prisma.CollectionNullableScalarRelationFilter, Prisma.CollectionWhereInput> | null;
    listings?: Prisma.ListingListRelationFilter;
    attributes?: Prisma.TokenAttributeListRelationFilter;
}, "id" | "contractAddress_tokenId">;
export type TokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadataJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    mintTxHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    collectionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.TokenCountOrderByAggregateInput;
    _max?: Prisma.TokenMaxOrderByAggregateInput;
    _min?: Prisma.TokenMinOrderByAggregateInput;
};
export type TokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.TokenScalarWhereWithAggregatesInput | Prisma.TokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.TokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TokenScalarWhereWithAggregatesInput | Prisma.TokenScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    contractAddress?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    tokenId?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    ownerAddress?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    tokenUri?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
    name?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
    image?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
    metadataJson?: Prisma.JsonNullableWithAggregatesFilter<"Token">;
    mintTxHash?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
    firstSeenAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Token"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Token"> | Date | string | null;
    collectionId?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
};
export type TokenCreateInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    collection?: Prisma.CollectionCreateNestedOneWithoutTokensInput;
    listings?: Prisma.ListingCreateNestedManyWithoutTokenInput;
    attributes?: Prisma.TokenAttributeCreateNestedManyWithoutTokenInput;
};
export type TokenUncheckedCreateInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    collectionId?: string | null;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutTokenInput;
    attributes?: Prisma.TokenAttributeUncheckedCreateNestedManyWithoutTokenInput;
};
export type TokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collection?: Prisma.CollectionUpdateOneWithoutTokensNestedInput;
    listings?: Prisma.ListingUpdateManyWithoutTokenNestedInput;
    attributes?: Prisma.TokenAttributeUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutTokenNestedInput;
    attributes?: Prisma.TokenAttributeUncheckedUpdateManyWithoutTokenNestedInput;
};
export type TokenCreateManyInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    collectionId?: string | null;
};
export type TokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type TokenListRelationFilter = {
    every?: Prisma.TokenWhereInput;
    some?: Prisma.TokenWhereInput;
    none?: Prisma.TokenWhereInput;
};
export type TokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TokenContractAddressTokenIdCompoundUniqueInput = {
    contractAddress: string;
    tokenId: string;
};
export type TokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    metadataJson?: Prisma.SortOrder;
    mintTxHash?: Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
};
export type TokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    mintTxHash?: Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
};
export type TokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    mintTxHash?: Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
};
export type TokenScalarRelationFilter = {
    is?: Prisma.TokenWhereInput;
    isNot?: Prisma.TokenWhereInput;
};
export type TokenCreateNestedManyWithoutCollectionInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutCollectionInput, Prisma.TokenUncheckedCreateWithoutCollectionInput> | Prisma.TokenCreateWithoutCollectionInput[] | Prisma.TokenUncheckedCreateWithoutCollectionInput[];
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutCollectionInput | Prisma.TokenCreateOrConnectWithoutCollectionInput[];
    createMany?: Prisma.TokenCreateManyCollectionInputEnvelope;
    connect?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
};
export type TokenUncheckedCreateNestedManyWithoutCollectionInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutCollectionInput, Prisma.TokenUncheckedCreateWithoutCollectionInput> | Prisma.TokenCreateWithoutCollectionInput[] | Prisma.TokenUncheckedCreateWithoutCollectionInput[];
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutCollectionInput | Prisma.TokenCreateOrConnectWithoutCollectionInput[];
    createMany?: Prisma.TokenCreateManyCollectionInputEnvelope;
    connect?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
};
export type TokenUpdateManyWithoutCollectionNestedInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutCollectionInput, Prisma.TokenUncheckedCreateWithoutCollectionInput> | Prisma.TokenCreateWithoutCollectionInput[] | Prisma.TokenUncheckedCreateWithoutCollectionInput[];
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutCollectionInput | Prisma.TokenCreateOrConnectWithoutCollectionInput[];
    upsert?: Prisma.TokenUpsertWithWhereUniqueWithoutCollectionInput | Prisma.TokenUpsertWithWhereUniqueWithoutCollectionInput[];
    createMany?: Prisma.TokenCreateManyCollectionInputEnvelope;
    set?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    disconnect?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    delete?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    connect?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    update?: Prisma.TokenUpdateWithWhereUniqueWithoutCollectionInput | Prisma.TokenUpdateWithWhereUniqueWithoutCollectionInput[];
    updateMany?: Prisma.TokenUpdateManyWithWhereWithoutCollectionInput | Prisma.TokenUpdateManyWithWhereWithoutCollectionInput[];
    deleteMany?: Prisma.TokenScalarWhereInput | Prisma.TokenScalarWhereInput[];
};
export type TokenUncheckedUpdateManyWithoutCollectionNestedInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutCollectionInput, Prisma.TokenUncheckedCreateWithoutCollectionInput> | Prisma.TokenCreateWithoutCollectionInput[] | Prisma.TokenUncheckedCreateWithoutCollectionInput[];
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutCollectionInput | Prisma.TokenCreateOrConnectWithoutCollectionInput[];
    upsert?: Prisma.TokenUpsertWithWhereUniqueWithoutCollectionInput | Prisma.TokenUpsertWithWhereUniqueWithoutCollectionInput[];
    createMany?: Prisma.TokenCreateManyCollectionInputEnvelope;
    set?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    disconnect?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    delete?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    connect?: Prisma.TokenWhereUniqueInput | Prisma.TokenWhereUniqueInput[];
    update?: Prisma.TokenUpdateWithWhereUniqueWithoutCollectionInput | Prisma.TokenUpdateWithWhereUniqueWithoutCollectionInput[];
    updateMany?: Prisma.TokenUpdateManyWithWhereWithoutCollectionInput | Prisma.TokenUpdateManyWithWhereWithoutCollectionInput[];
    deleteMany?: Prisma.TokenScalarWhereInput | Prisma.TokenScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type TokenCreateNestedOneWithoutAttributesInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutAttributesInput, Prisma.TokenUncheckedCreateWithoutAttributesInput>;
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutAttributesInput;
    connect?: Prisma.TokenWhereUniqueInput;
};
export type TokenUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutAttributesInput, Prisma.TokenUncheckedCreateWithoutAttributesInput>;
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutAttributesInput;
    upsert?: Prisma.TokenUpsertWithoutAttributesInput;
    connect?: Prisma.TokenWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TokenUpdateToOneWithWhereWithoutAttributesInput, Prisma.TokenUpdateWithoutAttributesInput>, Prisma.TokenUncheckedUpdateWithoutAttributesInput>;
};
export type TokenCreateNestedOneWithoutListingsInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutListingsInput, Prisma.TokenUncheckedCreateWithoutListingsInput>;
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutListingsInput;
    connect?: Prisma.TokenWhereUniqueInput;
};
export type TokenUpdateOneRequiredWithoutListingsNestedInput = {
    create?: Prisma.XOR<Prisma.TokenCreateWithoutListingsInput, Prisma.TokenUncheckedCreateWithoutListingsInput>;
    connectOrCreate?: Prisma.TokenCreateOrConnectWithoutListingsInput;
    upsert?: Prisma.TokenUpsertWithoutListingsInput;
    connect?: Prisma.TokenWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TokenUpdateToOneWithWhereWithoutListingsInput, Prisma.TokenUpdateWithoutListingsInput>, Prisma.TokenUncheckedUpdateWithoutListingsInput>;
};
export type TokenCreateWithoutCollectionInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    listings?: Prisma.ListingCreateNestedManyWithoutTokenInput;
    attributes?: Prisma.TokenAttributeCreateNestedManyWithoutTokenInput;
};
export type TokenUncheckedCreateWithoutCollectionInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutTokenInput;
    attributes?: Prisma.TokenAttributeUncheckedCreateNestedManyWithoutTokenInput;
};
export type TokenCreateOrConnectWithoutCollectionInput = {
    where: Prisma.TokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.TokenCreateWithoutCollectionInput, Prisma.TokenUncheckedCreateWithoutCollectionInput>;
};
export type TokenCreateManyCollectionInputEnvelope = {
    data: Prisma.TokenCreateManyCollectionInput | Prisma.TokenCreateManyCollectionInput[];
    skipDuplicates?: boolean;
};
export type TokenUpsertWithWhereUniqueWithoutCollectionInput = {
    where: Prisma.TokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.TokenUpdateWithoutCollectionInput, Prisma.TokenUncheckedUpdateWithoutCollectionInput>;
    create: Prisma.XOR<Prisma.TokenCreateWithoutCollectionInput, Prisma.TokenUncheckedCreateWithoutCollectionInput>;
};
export type TokenUpdateWithWhereUniqueWithoutCollectionInput = {
    where: Prisma.TokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.TokenUpdateWithoutCollectionInput, Prisma.TokenUncheckedUpdateWithoutCollectionInput>;
};
export type TokenUpdateManyWithWhereWithoutCollectionInput = {
    where: Prisma.TokenScalarWhereInput;
    data: Prisma.XOR<Prisma.TokenUpdateManyMutationInput, Prisma.TokenUncheckedUpdateManyWithoutCollectionInput>;
};
export type TokenScalarWhereInput = {
    AND?: Prisma.TokenScalarWhereInput | Prisma.TokenScalarWhereInput[];
    OR?: Prisma.TokenScalarWhereInput[];
    NOT?: Prisma.TokenScalarWhereInput | Prisma.TokenScalarWhereInput[];
    id?: Prisma.StringFilter<"Token"> | string;
    contractAddress?: Prisma.StringFilter<"Token"> | string;
    tokenId?: Prisma.StringFilter<"Token"> | string;
    ownerAddress?: Prisma.StringFilter<"Token"> | string;
    tokenUri?: Prisma.StringNullableFilter<"Token"> | string | null;
    name?: Prisma.StringNullableFilter<"Token"> | string | null;
    description?: Prisma.StringNullableFilter<"Token"> | string | null;
    image?: Prisma.StringNullableFilter<"Token"> | string | null;
    metadataJson?: Prisma.JsonNullableFilter<"Token">;
    mintTxHash?: Prisma.StringNullableFilter<"Token"> | string | null;
    firstSeenAt?: Prisma.DateTimeNullableFilter<"Token"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"Token"> | Date | string | null;
    collectionId?: Prisma.StringNullableFilter<"Token"> | string | null;
};
export type TokenCreateWithoutAttributesInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    collection?: Prisma.CollectionCreateNestedOneWithoutTokensInput;
    listings?: Prisma.ListingCreateNestedManyWithoutTokenInput;
};
export type TokenUncheckedCreateWithoutAttributesInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    collectionId?: string | null;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutTokenInput;
};
export type TokenCreateOrConnectWithoutAttributesInput = {
    where: Prisma.TokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.TokenCreateWithoutAttributesInput, Prisma.TokenUncheckedCreateWithoutAttributesInput>;
};
export type TokenUpsertWithoutAttributesInput = {
    update: Prisma.XOR<Prisma.TokenUpdateWithoutAttributesInput, Prisma.TokenUncheckedUpdateWithoutAttributesInput>;
    create: Prisma.XOR<Prisma.TokenCreateWithoutAttributesInput, Prisma.TokenUncheckedCreateWithoutAttributesInput>;
    where?: Prisma.TokenWhereInput;
};
export type TokenUpdateToOneWithWhereWithoutAttributesInput = {
    where?: Prisma.TokenWhereInput;
    data: Prisma.XOR<Prisma.TokenUpdateWithoutAttributesInput, Prisma.TokenUncheckedUpdateWithoutAttributesInput>;
};
export type TokenUpdateWithoutAttributesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collection?: Prisma.CollectionUpdateOneWithoutTokensNestedInput;
    listings?: Prisma.ListingUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateWithoutAttributesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutTokenNestedInput;
};
export type TokenCreateWithoutListingsInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    collection?: Prisma.CollectionCreateNestedOneWithoutTokensInput;
    attributes?: Prisma.TokenAttributeCreateNestedManyWithoutTokenInput;
};
export type TokenUncheckedCreateWithoutListingsInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    collectionId?: string | null;
    attributes?: Prisma.TokenAttributeUncheckedCreateNestedManyWithoutTokenInput;
};
export type TokenCreateOrConnectWithoutListingsInput = {
    where: Prisma.TokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.TokenCreateWithoutListingsInput, Prisma.TokenUncheckedCreateWithoutListingsInput>;
};
export type TokenUpsertWithoutListingsInput = {
    update: Prisma.XOR<Prisma.TokenUpdateWithoutListingsInput, Prisma.TokenUncheckedUpdateWithoutListingsInput>;
    create: Prisma.XOR<Prisma.TokenCreateWithoutListingsInput, Prisma.TokenUncheckedCreateWithoutListingsInput>;
    where?: Prisma.TokenWhereInput;
};
export type TokenUpdateToOneWithWhereWithoutListingsInput = {
    where?: Prisma.TokenWhereInput;
    data: Prisma.XOR<Prisma.TokenUpdateWithoutListingsInput, Prisma.TokenUncheckedUpdateWithoutListingsInput>;
};
export type TokenUpdateWithoutListingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collection?: Prisma.CollectionUpdateOneWithoutTokensNestedInput;
    attributes?: Prisma.TokenAttributeUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateWithoutListingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    collectionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attributes?: Prisma.TokenAttributeUncheckedUpdateManyWithoutTokenNestedInput;
};
export type TokenCreateManyCollectionInput = {
    id?: string;
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
    tokenUri?: string | null;
    name?: string | null;
    description?: string | null;
    image?: string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: string | null;
    firstSeenAt?: Date | string | null;
    lastSyncedAt?: Date | string | null;
};
export type TokenUpdateWithoutCollectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    listings?: Prisma.ListingUpdateManyWithoutTokenNestedInput;
    attributes?: Prisma.TokenAttributeUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateWithoutCollectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutTokenNestedInput;
    attributes?: Prisma.TokenAttributeUncheckedUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateManyWithoutCollectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    contractAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadataJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    mintTxHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    firstSeenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type TokenCountOutputType = {
    listings: number;
    attributes: number;
};
export type TokenCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    listings?: boolean | TokenCountOutputTypeCountListingsArgs;
    attributes?: boolean | TokenCountOutputTypeCountAttributesArgs;
};
export type TokenCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenCountOutputTypeSelect<ExtArgs> | null;
};
export type TokenCountOutputTypeCountListingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListingWhereInput;
};
export type TokenCountOutputTypeCountAttributesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenAttributeWhereInput;
};
export type TokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contractAddress?: boolean;
    tokenId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    metadataJson?: boolean;
    mintTxHash?: boolean;
    firstSeenAt?: boolean;
    lastSyncedAt?: boolean;
    collectionId?: boolean;
    collection?: boolean | Prisma.Token$collectionArgs<ExtArgs>;
    listings?: boolean | Prisma.Token$listingsArgs<ExtArgs>;
    attributes?: boolean | Prisma.Token$attributesArgs<ExtArgs>;
    _count?: boolean | Prisma.TokenCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["token"]>;
export type TokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contractAddress?: boolean;
    tokenId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    metadataJson?: boolean;
    mintTxHash?: boolean;
    firstSeenAt?: boolean;
    lastSyncedAt?: boolean;
    collectionId?: boolean;
    collection?: boolean | Prisma.Token$collectionArgs<ExtArgs>;
}, ExtArgs["result"]["token"]>;
export type TokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    contractAddress?: boolean;
    tokenId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    metadataJson?: boolean;
    mintTxHash?: boolean;
    firstSeenAt?: boolean;
    lastSyncedAt?: boolean;
    collectionId?: boolean;
    collection?: boolean | Prisma.Token$collectionArgs<ExtArgs>;
}, ExtArgs["result"]["token"]>;
export type TokenSelectScalar = {
    id?: boolean;
    contractAddress?: boolean;
    tokenId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    metadataJson?: boolean;
    mintTxHash?: boolean;
    firstSeenAt?: boolean;
    lastSyncedAt?: boolean;
    collectionId?: boolean;
};
export type TokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "contractAddress" | "tokenId" | "ownerAddress" | "tokenUri" | "name" | "description" | "image" | "metadataJson" | "mintTxHash" | "firstSeenAt" | "lastSyncedAt" | "collectionId", ExtArgs["result"]["token"]>;
export type TokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    collection?: boolean | Prisma.Token$collectionArgs<ExtArgs>;
    listings?: boolean | Prisma.Token$listingsArgs<ExtArgs>;
    attributes?: boolean | Prisma.Token$attributesArgs<ExtArgs>;
    _count?: boolean | Prisma.TokenCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    collection?: boolean | Prisma.Token$collectionArgs<ExtArgs>;
};
export type TokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    collection?: boolean | Prisma.Token$collectionArgs<ExtArgs>;
};
export type $TokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Token";
    objects: {
        collection: Prisma.$CollectionPayload<ExtArgs> | null;
        listings: Prisma.$ListingPayload<ExtArgs>[];
        attributes: Prisma.$TokenAttributePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        contractAddress: string;
        tokenId: string;
        ownerAddress: string;
        tokenUri: string | null;
        name: string | null;
        description: string | null;
        image: string | null;
        metadataJson: runtime.JsonValue | null;
        mintTxHash: string | null;
        firstSeenAt: Date | null;
        lastSyncedAt: Date | null;
        collectionId: string | null;
    }, ExtArgs["result"]["token"]>;
    composites: {};
};
export type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TokenPayload, S>;
export type TokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TokenCountAggregateInputType | true;
};
export interface TokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Token'];
        meta: {
            name: 'Token';
        };
    };
    findUnique<T extends TokenFindUniqueArgs>(args: Prisma.SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TokenFindFirstArgs>(args?: Prisma.SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TokenFindManyArgs>(args?: Prisma.SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TokenCreateArgs>(args: Prisma.SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TokenCreateManyArgs>(args?: Prisma.SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TokenDeleteArgs>(args: Prisma.SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TokenUpdateArgs>(args: Prisma.SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TokenUpdateManyArgs>(args: Prisma.SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TokenUpsertArgs>(args: Prisma.SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TokenCountArgs>(args?: Prisma.Subset<T, TokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TokenCountAggregateOutputType> : number>;
    aggregate<T extends TokenAggregateArgs>(args: Prisma.Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>;
    groupBy<T extends TokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TokenGroupByArgs['orderBy'];
    } : {
        orderBy?: TokenGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TokenFieldRefs;
}
export interface Prisma__TokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    collection<T extends Prisma.Token$collectionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Token$collectionArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    listings<T extends Prisma.Token$listingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Token$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    attributes<T extends Prisma.Token$attributesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Token$attributesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TokenFieldRefs {
    readonly id: Prisma.FieldRef<"Token", 'String'>;
    readonly contractAddress: Prisma.FieldRef<"Token", 'String'>;
    readonly tokenId: Prisma.FieldRef<"Token", 'String'>;
    readonly ownerAddress: Prisma.FieldRef<"Token", 'String'>;
    readonly tokenUri: Prisma.FieldRef<"Token", 'String'>;
    readonly name: Prisma.FieldRef<"Token", 'String'>;
    readonly description: Prisma.FieldRef<"Token", 'String'>;
    readonly image: Prisma.FieldRef<"Token", 'String'>;
    readonly metadataJson: Prisma.FieldRef<"Token", 'Json'>;
    readonly mintTxHash: Prisma.FieldRef<"Token", 'String'>;
    readonly firstSeenAt: Prisma.FieldRef<"Token", 'DateTime'>;
    readonly lastSyncedAt: Prisma.FieldRef<"Token", 'DateTime'>;
    readonly collectionId: Prisma.FieldRef<"Token", 'String'>;
}
export type TokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    where: Prisma.TokenWhereUniqueInput;
};
export type TokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    where: Prisma.TokenWhereUniqueInput;
};
export type TokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput | Prisma.TokenOrderByWithRelationInput[];
    cursor?: Prisma.TokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TokenScalarFieldEnum | Prisma.TokenScalarFieldEnum[];
};
export type TokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput | Prisma.TokenOrderByWithRelationInput[];
    cursor?: Prisma.TokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TokenScalarFieldEnum | Prisma.TokenScalarFieldEnum[];
};
export type TokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput | Prisma.TokenOrderByWithRelationInput[];
    cursor?: Prisma.TokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TokenScalarFieldEnum | Prisma.TokenScalarFieldEnum[];
};
export type TokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TokenCreateInput, Prisma.TokenUncheckedCreateInput>;
};
export type TokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TokenCreateManyInput | Prisma.TokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    data: Prisma.TokenCreateManyInput | Prisma.TokenCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TokenIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TokenUpdateInput, Prisma.TokenUncheckedUpdateInput>;
    where: Prisma.TokenWhereUniqueInput;
};
export type TokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TokenUpdateManyMutationInput, Prisma.TokenUncheckedUpdateManyInput>;
    where?: Prisma.TokenWhereInput;
    limit?: number;
};
export type TokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TokenUpdateManyMutationInput, Prisma.TokenUncheckedUpdateManyInput>;
    where?: Prisma.TokenWhereInput;
    limit?: number;
    include?: Prisma.TokenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    where: Prisma.TokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.TokenCreateInput, Prisma.TokenUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TokenUpdateInput, Prisma.TokenUncheckedUpdateInput>;
};
export type TokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
    where: Prisma.TokenWhereUniqueInput;
};
export type TokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenWhereInput;
    limit?: number;
};
export type Token$collectionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where?: Prisma.CollectionWhereInput;
};
export type Token$listingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ListingSelect<ExtArgs> | null;
    omit?: Prisma.ListingOmit<ExtArgs> | null;
    include?: Prisma.ListingInclude<ExtArgs> | null;
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithRelationInput | Prisma.ListingOrderByWithRelationInput[];
    cursor?: Prisma.ListingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ListingScalarFieldEnum | Prisma.ListingScalarFieldEnum[];
};
export type Token$attributesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
    where?: Prisma.TokenAttributeWhereInput;
    orderBy?: Prisma.TokenAttributeOrderByWithRelationInput | Prisma.TokenAttributeOrderByWithRelationInput[];
    cursor?: Prisma.TokenAttributeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TokenAttributeScalarFieldEnum | Prisma.TokenAttributeScalarFieldEnum[];
};
export type TokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
};
export {};
