import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.mjs";
import type * as Prisma from "../internal/prismaNamespace.mjs";
export type TokenModel = runtime.Types.Result.DefaultSelection<Prisma.$TokenPayload>;
export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null;
    _avg: TokenAvgAggregateOutputType | null;
    _sum: TokenSumAggregateOutputType | null;
    _min: TokenMinAggregateOutputType | null;
    _max: TokenMaxAggregateOutputType | null;
};
export type TokenAvgAggregateOutputType = {
    onchainId: number | null;
};
export type TokenSumAggregateOutputType = {
    onchainId: number | null;
};
export type TokenMinAggregateOutputType = {
    id: string | null;
    collectionId: string | null;
    ownerAddress: string | null;
    tokenUri: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    status: $Enums.TokenStatus | null;
    txHash: string | null;
    onchainId: number | null;
    contractAddress: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TokenMaxAggregateOutputType = {
    id: string | null;
    collectionId: string | null;
    ownerAddress: string | null;
    tokenUri: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    status: $Enums.TokenStatus | null;
    txHash: string | null;
    onchainId: number | null;
    contractAddress: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TokenCountAggregateOutputType = {
    id: number;
    collectionId: number;
    ownerAddress: number;
    tokenUri: number;
    name: number;
    description: number;
    image: number;
    status: number;
    txData: number;
    txHash: number;
    onchainId: number;
    contractAddress: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TokenAvgAggregateInputType = {
    onchainId?: true;
};
export type TokenSumAggregateInputType = {
    onchainId?: true;
};
export type TokenMinAggregateInputType = {
    id?: true;
    collectionId?: true;
    ownerAddress?: true;
    tokenUri?: true;
    name?: true;
    description?: true;
    image?: true;
    status?: true;
    txHash?: true;
    onchainId?: true;
    contractAddress?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TokenMaxAggregateInputType = {
    id?: true;
    collectionId?: true;
    ownerAddress?: true;
    tokenUri?: true;
    name?: true;
    description?: true;
    image?: true;
    status?: true;
    txHash?: true;
    onchainId?: true;
    contractAddress?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TokenCountAggregateInputType = {
    id?: true;
    collectionId?: true;
    ownerAddress?: true;
    tokenUri?: true;
    name?: true;
    description?: true;
    image?: true;
    status?: true;
    txData?: true;
    txHash?: true;
    onchainId?: true;
    contractAddress?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenWhereInput;
    orderBy?: Prisma.TokenOrderByWithRelationInput | Prisma.TokenOrderByWithRelationInput[];
    cursor?: Prisma.TokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TokenCountAggregateInputType;
    _avg?: TokenAvgAggregateInputType;
    _sum?: TokenSumAggregateInputType;
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
    _avg?: TokenAvgAggregateInputType;
    _sum?: TokenSumAggregateInputType;
    _min?: TokenMinAggregateInputType;
    _max?: TokenMaxAggregateInputType;
};
export type TokenGroupByOutputType = {
    id: string;
    collectionId: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status: $Enums.TokenStatus;
    txData: runtime.JsonValue;
    txHash: string | null;
    onchainId: number | null;
    contractAddress: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: TokenCountAggregateOutputType | null;
    _avg: TokenAvgAggregateOutputType | null;
    _sum: TokenSumAggregateOutputType | null;
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
    collectionId?: Prisma.StringFilter<"Token"> | string;
    ownerAddress?: Prisma.StringFilter<"Token"> | string;
    tokenUri?: Prisma.StringFilter<"Token"> | string;
    name?: Prisma.StringFilter<"Token"> | string;
    description?: Prisma.StringFilter<"Token"> | string;
    image?: Prisma.StringFilter<"Token"> | string;
    status?: Prisma.EnumTokenStatusFilter<"Token"> | $Enums.TokenStatus;
    txData?: Prisma.JsonFilter<"Token">;
    txHash?: Prisma.StringNullableFilter<"Token"> | string | null;
    onchainId?: Prisma.IntNullableFilter<"Token"> | number | null;
    contractAddress?: Prisma.StringNullableFilter<"Token"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Token"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Token"> | Date | string;
    collection?: Prisma.XOR<Prisma.CollectionScalarRelationFilter, Prisma.CollectionWhereInput>;
    listings?: Prisma.ListingListRelationFilter;
};
export type TokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txData?: Prisma.SortOrder;
    txHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    onchainId?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    collection?: Prisma.CollectionOrderByWithRelationInput;
    listings?: Prisma.ListingOrderByRelationAggregateInput;
};
export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    contractAddress_onchainId?: Prisma.TokenContractAddressOnchainIdCompoundUniqueInput;
    AND?: Prisma.TokenWhereInput | Prisma.TokenWhereInput[];
    OR?: Prisma.TokenWhereInput[];
    NOT?: Prisma.TokenWhereInput | Prisma.TokenWhereInput[];
    collectionId?: Prisma.StringFilter<"Token"> | string;
    ownerAddress?: Prisma.StringFilter<"Token"> | string;
    tokenUri?: Prisma.StringFilter<"Token"> | string;
    name?: Prisma.StringFilter<"Token"> | string;
    description?: Prisma.StringFilter<"Token"> | string;
    image?: Prisma.StringFilter<"Token"> | string;
    status?: Prisma.EnumTokenStatusFilter<"Token"> | $Enums.TokenStatus;
    txData?: Prisma.JsonFilter<"Token">;
    txHash?: Prisma.StringNullableFilter<"Token"> | string | null;
    onchainId?: Prisma.IntNullableFilter<"Token"> | number | null;
    contractAddress?: Prisma.StringNullableFilter<"Token"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Token"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Token"> | Date | string;
    collection?: Prisma.XOR<Prisma.CollectionScalarRelationFilter, Prisma.CollectionWhereInput>;
    listings?: Prisma.ListingListRelationFilter;
}, "id" | "contractAddress_onchainId">;
export type TokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txData?: Prisma.SortOrder;
    txHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    onchainId?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TokenCountOrderByAggregateInput;
    _avg?: Prisma.TokenAvgOrderByAggregateInput;
    _max?: Prisma.TokenMaxOrderByAggregateInput;
    _min?: Prisma.TokenMinOrderByAggregateInput;
    _sum?: Prisma.TokenSumOrderByAggregateInput;
};
export type TokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.TokenScalarWhereWithAggregatesInput | Prisma.TokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.TokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TokenScalarWhereWithAggregatesInput | Prisma.TokenScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    collectionId?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    ownerAddress?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    tokenUri?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    image?: Prisma.StringWithAggregatesFilter<"Token"> | string;
    status?: Prisma.EnumTokenStatusWithAggregatesFilter<"Token"> | $Enums.TokenStatus;
    txData?: Prisma.JsonWithAggregatesFilter<"Token">;
    txHash?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
    onchainId?: Prisma.IntNullableWithAggregatesFilter<"Token"> | number | null;
    contractAddress?: Prisma.StringNullableWithAggregatesFilter<"Token"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Token"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Token"> | Date | string;
};
export type TokenCreateInput = {
    id: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    collection: Prisma.CollectionCreateNestedOneWithoutTokensInput;
    listings?: Prisma.ListingCreateNestedManyWithoutTokenInput;
};
export type TokenUncheckedCreateInput = {
    id: string;
    collectionId: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutTokenInput;
};
export type TokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    collection?: Prisma.CollectionUpdateOneRequiredWithoutTokensNestedInput;
    listings?: Prisma.ListingUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    collectionId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutTokenNestedInput;
};
export type TokenCreateManyInput = {
    id: string;
    collectionId: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    collectionId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TokenListRelationFilter = {
    every?: Prisma.TokenWhereInput;
    some?: Prisma.TokenWhereInput;
    none?: Prisma.TokenWhereInput;
};
export type TokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TokenContractAddressOnchainIdCompoundUniqueInput = {
    contractAddress: string;
    onchainId: number;
};
export type TokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txData?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TokenAvgOrderByAggregateInput = {
    onchainId?: Prisma.SortOrder;
};
export type TokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    collectionId?: Prisma.SortOrder;
    ownerAddress?: Prisma.SortOrder;
    tokenUri?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TokenSumOrderByAggregateInput = {
    onchainId?: Prisma.SortOrder;
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
export type EnumTokenStatusFieldUpdateOperationsInput = {
    set?: $Enums.TokenStatus;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
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
    id: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingCreateNestedManyWithoutTokenInput;
};
export type TokenUncheckedCreateWithoutCollectionInput = {
    id: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    listings?: Prisma.ListingUncheckedCreateNestedManyWithoutTokenInput;
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
    collectionId?: Prisma.StringFilter<"Token"> | string;
    ownerAddress?: Prisma.StringFilter<"Token"> | string;
    tokenUri?: Prisma.StringFilter<"Token"> | string;
    name?: Prisma.StringFilter<"Token"> | string;
    description?: Prisma.StringFilter<"Token"> | string;
    image?: Prisma.StringFilter<"Token"> | string;
    status?: Prisma.EnumTokenStatusFilter<"Token"> | $Enums.TokenStatus;
    txData?: Prisma.JsonFilter<"Token">;
    txHash?: Prisma.StringNullableFilter<"Token"> | string | null;
    onchainId?: Prisma.IntNullableFilter<"Token"> | number | null;
    contractAddress?: Prisma.StringNullableFilter<"Token"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Token"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Token"> | Date | string;
};
export type TokenCreateWithoutListingsInput = {
    id: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    collection: Prisma.CollectionCreateNestedOneWithoutTokensInput;
};
export type TokenUncheckedCreateWithoutListingsInput = {
    id: string;
    collectionId: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
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
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    collection?: Prisma.CollectionUpdateOneRequiredWithoutTokensNestedInput;
};
export type TokenUncheckedUpdateWithoutListingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    collectionId?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TokenCreateManyCollectionInput = {
    id: string;
    ownerAddress: string;
    tokenUri: string;
    name: string;
    description: string;
    image: string;
    status?: $Enums.TokenStatus;
    txData: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: string | null;
    onchainId?: number | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TokenUpdateWithoutCollectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateWithoutCollectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    listings?: Prisma.ListingUncheckedUpdateManyWithoutTokenNestedInput;
};
export type TokenUncheckedUpdateManyWithoutCollectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenUri?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus;
    txData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    onchainId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TokenCountOutputType = {
    listings: number;
};
export type TokenCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    listings?: boolean | TokenCountOutputTypeCountListingsArgs;
};
export type TokenCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenCountOutputTypeSelect<ExtArgs> | null;
};
export type TokenCountOutputTypeCountListingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ListingWhereInput;
};
export type TokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    collectionId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    status?: boolean;
    txData?: boolean;
    txHash?: boolean;
    onchainId?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    collection?: boolean | Prisma.CollectionDefaultArgs<ExtArgs>;
    listings?: boolean | Prisma.Token$listingsArgs<ExtArgs>;
    _count?: boolean | Prisma.TokenCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["token"]>;
export type TokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    collectionId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    status?: boolean;
    txData?: boolean;
    txHash?: boolean;
    onchainId?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    collection?: boolean | Prisma.CollectionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["token"]>;
export type TokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    collectionId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    status?: boolean;
    txData?: boolean;
    txHash?: boolean;
    onchainId?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    collection?: boolean | Prisma.CollectionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["token"]>;
export type TokenSelectScalar = {
    id?: boolean;
    collectionId?: boolean;
    ownerAddress?: boolean;
    tokenUri?: boolean;
    name?: boolean;
    description?: boolean;
    image?: boolean;
    status?: boolean;
    txData?: boolean;
    txHash?: boolean;
    onchainId?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "collectionId" | "ownerAddress" | "tokenUri" | "name" | "description" | "image" | "status" | "txData" | "txHash" | "onchainId" | "contractAddress" | "createdAt" | "updatedAt", ExtArgs["result"]["token"]>;
export type TokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    collection?: boolean | Prisma.CollectionDefaultArgs<ExtArgs>;
    listings?: boolean | Prisma.Token$listingsArgs<ExtArgs>;
    _count?: boolean | Prisma.TokenCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    collection?: boolean | Prisma.CollectionDefaultArgs<ExtArgs>;
};
export type TokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    collection?: boolean | Prisma.CollectionDefaultArgs<ExtArgs>;
};
export type $TokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Token";
    objects: {
        collection: Prisma.$CollectionPayload<ExtArgs>;
        listings: Prisma.$ListingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        collectionId: string;
        ownerAddress: string;
        tokenUri: string;
        name: string;
        description: string;
        image: string;
        status: $Enums.TokenStatus;
        txData: runtime.JsonValue;
        txHash: string | null;
        onchainId: number | null;
        contractAddress: string | null;
        createdAt: Date;
        updatedAt: Date;
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
    collection<T extends Prisma.CollectionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CollectionDefaultArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    listings<T extends Prisma.Token$listingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Token$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TokenFieldRefs {
    readonly id: Prisma.FieldRef<"Token", 'String'>;
    readonly collectionId: Prisma.FieldRef<"Token", 'String'>;
    readonly ownerAddress: Prisma.FieldRef<"Token", 'String'>;
    readonly tokenUri: Prisma.FieldRef<"Token", 'String'>;
    readonly name: Prisma.FieldRef<"Token", 'String'>;
    readonly description: Prisma.FieldRef<"Token", 'String'>;
    readonly image: Prisma.FieldRef<"Token", 'String'>;
    readonly status: Prisma.FieldRef<"Token", 'TokenStatus'>;
    readonly txData: Prisma.FieldRef<"Token", 'Json'>;
    readonly txHash: Prisma.FieldRef<"Token", 'String'>;
    readonly onchainId: Prisma.FieldRef<"Token", 'Int'>;
    readonly contractAddress: Prisma.FieldRef<"Token", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Token", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Token", 'DateTime'>;
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
export type TokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenSelect<ExtArgs> | null;
    omit?: Prisma.TokenOmit<ExtArgs> | null;
    include?: Prisma.TokenInclude<ExtArgs> | null;
};
export {};
