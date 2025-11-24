import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.mjs";
import type * as Prisma from "../internal/prismaNamespace.mjs";
export type CollectionModel = runtime.Types.Result.DefaultSelection<Prisma.$CollectionPayload>;
export type AggregateCollection = {
    _count: CollectionCountAggregateOutputType | null;
    _avg: CollectionAvgAggregateOutputType | null;
    _sum: CollectionSumAggregateOutputType | null;
    _min: CollectionMinAggregateOutputType | null;
    _max: CollectionMaxAggregateOutputType | null;
};
export type CollectionAvgAggregateOutputType = {
    royaltyFeeBps: number | null;
};
export type CollectionSumAggregateOutputType = {
    royaltyFeeBps: number | null;
};
export type CollectionMinAggregateOutputType = {
    id: string | null;
    status: $Enums.CollectionStatus | null;
    userId: string | null;
    creatorAddress: string | null;
    name: string | null;
    symbol: string | null;
    description: string | null;
    image: string | null;
    royaltyFeeBps: number | null;
    txHash: string | null;
    contractAddress: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CollectionMaxAggregateOutputType = {
    id: string | null;
    status: $Enums.CollectionStatus | null;
    userId: string | null;
    creatorAddress: string | null;
    name: string | null;
    symbol: string | null;
    description: string | null;
    image: string | null;
    royaltyFeeBps: number | null;
    txHash: string | null;
    contractAddress: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CollectionCountAggregateOutputType = {
    id: number;
    status: number;
    userId: number;
    creatorAddress: number;
    name: number;
    symbol: number;
    description: number;
    image: number;
    royaltyFeeBps: number;
    txHash: number;
    contractAddress: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CollectionAvgAggregateInputType = {
    royaltyFeeBps?: true;
};
export type CollectionSumAggregateInputType = {
    royaltyFeeBps?: true;
};
export type CollectionMinAggregateInputType = {
    id?: true;
    status?: true;
    userId?: true;
    creatorAddress?: true;
    name?: true;
    symbol?: true;
    description?: true;
    image?: true;
    royaltyFeeBps?: true;
    txHash?: true;
    contractAddress?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CollectionMaxAggregateInputType = {
    id?: true;
    status?: true;
    userId?: true;
    creatorAddress?: true;
    name?: true;
    symbol?: true;
    description?: true;
    image?: true;
    royaltyFeeBps?: true;
    txHash?: true;
    contractAddress?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CollectionCountAggregateInputType = {
    id?: true;
    status?: true;
    userId?: true;
    creatorAddress?: true;
    name?: true;
    symbol?: true;
    description?: true;
    image?: true;
    royaltyFeeBps?: true;
    txHash?: true;
    contractAddress?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CollectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput | Prisma.CollectionOrderByWithRelationInput[];
    cursor?: Prisma.CollectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CollectionCountAggregateInputType;
    _avg?: CollectionAvgAggregateInputType;
    _sum?: CollectionSumAggregateInputType;
    _min?: CollectionMinAggregateInputType;
    _max?: CollectionMaxAggregateInputType;
};
export type GetCollectionAggregateType<T extends CollectionAggregateArgs> = {
    [P in keyof T & keyof AggregateCollection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCollection[P]> : Prisma.GetScalarType<T[P], AggregateCollection[P]>;
};
export type CollectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithAggregationInput | Prisma.CollectionOrderByWithAggregationInput[];
    by: Prisma.CollectionScalarFieldEnum[] | Prisma.CollectionScalarFieldEnum;
    having?: Prisma.CollectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CollectionCountAggregateInputType | true;
    _avg?: CollectionAvgAggregateInputType;
    _sum?: CollectionSumAggregateInputType;
    _min?: CollectionMinAggregateInputType;
    _max?: CollectionMaxAggregateInputType;
};
export type CollectionGroupByOutputType = {
    id: string;
    status: $Enums.CollectionStatus;
    userId: string;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash: string | null;
    contractAddress: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CollectionCountAggregateOutputType | null;
    _avg: CollectionAvgAggregateOutputType | null;
    _sum: CollectionSumAggregateOutputType | null;
    _min: CollectionMinAggregateOutputType | null;
    _max: CollectionMaxAggregateOutputType | null;
};
type GetCollectionGroupByPayload<T extends CollectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CollectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CollectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CollectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CollectionGroupByOutputType[P]>;
}>>;
export type CollectionWhereInput = {
    AND?: Prisma.CollectionWhereInput | Prisma.CollectionWhereInput[];
    OR?: Prisma.CollectionWhereInput[];
    NOT?: Prisma.CollectionWhereInput | Prisma.CollectionWhereInput[];
    id?: Prisma.StringFilter<"Collection"> | string;
    status?: Prisma.EnumCollectionStatusFilter<"Collection"> | $Enums.CollectionStatus;
    userId?: Prisma.StringFilter<"Collection"> | string;
    creatorAddress?: Prisma.StringFilter<"Collection"> | string;
    name?: Prisma.StringFilter<"Collection"> | string;
    symbol?: Prisma.StringFilter<"Collection"> | string;
    description?: Prisma.StringFilter<"Collection"> | string;
    image?: Prisma.StringFilter<"Collection"> | string;
    royaltyFeeBps?: Prisma.IntFilter<"Collection"> | number;
    txHash?: Prisma.StringNullableFilter<"Collection"> | string | null;
    contractAddress?: Prisma.StringNullableFilter<"Collection"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Collection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Collection"> | Date | string;
    tokens?: Prisma.TokenListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CollectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    creatorAddress?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    royaltyFeeBps?: Prisma.SortOrder;
    txHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    tokens?: Prisma.TokenOrderByRelationAggregateInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CollectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    txHash?: string;
    contractAddress?: string;
    AND?: Prisma.CollectionWhereInput | Prisma.CollectionWhereInput[];
    OR?: Prisma.CollectionWhereInput[];
    NOT?: Prisma.CollectionWhereInput | Prisma.CollectionWhereInput[];
    status?: Prisma.EnumCollectionStatusFilter<"Collection"> | $Enums.CollectionStatus;
    userId?: Prisma.StringFilter<"Collection"> | string;
    creatorAddress?: Prisma.StringFilter<"Collection"> | string;
    name?: Prisma.StringFilter<"Collection"> | string;
    symbol?: Prisma.StringFilter<"Collection"> | string;
    description?: Prisma.StringFilter<"Collection"> | string;
    image?: Prisma.StringFilter<"Collection"> | string;
    royaltyFeeBps?: Prisma.IntFilter<"Collection"> | number;
    createdAt?: Prisma.DateTimeFilter<"Collection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Collection"> | Date | string;
    tokens?: Prisma.TokenListRelationFilter;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "txHash" | "contractAddress">;
export type CollectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    creatorAddress?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    royaltyFeeBps?: Prisma.SortOrder;
    txHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    contractAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CollectionCountOrderByAggregateInput;
    _avg?: Prisma.CollectionAvgOrderByAggregateInput;
    _max?: Prisma.CollectionMaxOrderByAggregateInput;
    _min?: Prisma.CollectionMinOrderByAggregateInput;
    _sum?: Prisma.CollectionSumOrderByAggregateInput;
};
export type CollectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CollectionScalarWhereWithAggregatesInput | Prisma.CollectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CollectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CollectionScalarWhereWithAggregatesInput | Prisma.CollectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Collection"> | string;
    status?: Prisma.EnumCollectionStatusWithAggregatesFilter<"Collection"> | $Enums.CollectionStatus;
    userId?: Prisma.StringWithAggregatesFilter<"Collection"> | string;
    creatorAddress?: Prisma.StringWithAggregatesFilter<"Collection"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Collection"> | string;
    symbol?: Prisma.StringWithAggregatesFilter<"Collection"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Collection"> | string;
    image?: Prisma.StringWithAggregatesFilter<"Collection"> | string;
    royaltyFeeBps?: Prisma.IntWithAggregatesFilter<"Collection"> | number;
    txHash?: Prisma.StringNullableWithAggregatesFilter<"Collection"> | string | null;
    contractAddress?: Prisma.StringNullableWithAggregatesFilter<"Collection"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Collection"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Collection"> | Date | string;
};
export type CollectionCreateInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tokens?: Prisma.TokenCreateNestedManyWithoutCollectionInput;
    user: Prisma.UserCreateNestedOneWithoutCollectionsInput;
};
export type CollectionUncheckedCreateInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    userId: string;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tokens?: Prisma.TokenUncheckedCreateNestedManyWithoutCollectionInput;
};
export type CollectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tokens?: Prisma.TokenUpdateManyWithoutCollectionNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutCollectionsNestedInput;
};
export type CollectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tokens?: Prisma.TokenUncheckedUpdateManyWithoutCollectionNestedInput;
};
export type CollectionCreateManyInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    userId: string;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CollectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CollectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CollectionListRelationFilter = {
    every?: Prisma.CollectionWhereInput;
    some?: Prisma.CollectionWhereInput;
    none?: Prisma.CollectionWhereInput;
};
export type CollectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CollectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    creatorAddress?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    royaltyFeeBps?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CollectionAvgOrderByAggregateInput = {
    royaltyFeeBps?: Prisma.SortOrder;
};
export type CollectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    creatorAddress?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    royaltyFeeBps?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CollectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    creatorAddress?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    symbol?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    royaltyFeeBps?: Prisma.SortOrder;
    txHash?: Prisma.SortOrder;
    contractAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CollectionSumOrderByAggregateInput = {
    royaltyFeeBps?: Prisma.SortOrder;
};
export type CollectionNullableScalarRelationFilter = {
    is?: Prisma.CollectionWhereInput | null;
    isNot?: Prisma.CollectionWhereInput | null;
};
export type CollectionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CollectionCreateWithoutUserInput, Prisma.CollectionUncheckedCreateWithoutUserInput> | Prisma.CollectionCreateWithoutUserInput[] | Prisma.CollectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CollectionCreateOrConnectWithoutUserInput | Prisma.CollectionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CollectionCreateManyUserInputEnvelope;
    connect?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
};
export type CollectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CollectionCreateWithoutUserInput, Prisma.CollectionUncheckedCreateWithoutUserInput> | Prisma.CollectionCreateWithoutUserInput[] | Prisma.CollectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CollectionCreateOrConnectWithoutUserInput | Prisma.CollectionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CollectionCreateManyUserInputEnvelope;
    connect?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
};
export type CollectionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CollectionCreateWithoutUserInput, Prisma.CollectionUncheckedCreateWithoutUserInput> | Prisma.CollectionCreateWithoutUserInput[] | Prisma.CollectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CollectionCreateOrConnectWithoutUserInput | Prisma.CollectionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CollectionUpsertWithWhereUniqueWithoutUserInput | Prisma.CollectionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CollectionCreateManyUserInputEnvelope;
    set?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    disconnect?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    delete?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    connect?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    update?: Prisma.CollectionUpdateWithWhereUniqueWithoutUserInput | Prisma.CollectionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CollectionUpdateManyWithWhereWithoutUserInput | Prisma.CollectionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CollectionScalarWhereInput | Prisma.CollectionScalarWhereInput[];
};
export type CollectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CollectionCreateWithoutUserInput, Prisma.CollectionUncheckedCreateWithoutUserInput> | Prisma.CollectionCreateWithoutUserInput[] | Prisma.CollectionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CollectionCreateOrConnectWithoutUserInput | Prisma.CollectionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CollectionUpsertWithWhereUniqueWithoutUserInput | Prisma.CollectionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CollectionCreateManyUserInputEnvelope;
    set?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    disconnect?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    delete?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    connect?: Prisma.CollectionWhereUniqueInput | Prisma.CollectionWhereUniqueInput[];
    update?: Prisma.CollectionUpdateWithWhereUniqueWithoutUserInput | Prisma.CollectionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CollectionUpdateManyWithWhereWithoutUserInput | Prisma.CollectionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CollectionScalarWhereInput | Prisma.CollectionScalarWhereInput[];
};
export type EnumCollectionStatusFieldUpdateOperationsInput = {
    set?: $Enums.CollectionStatus;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type CollectionCreateNestedOneWithoutTokensInput = {
    create?: Prisma.XOR<Prisma.CollectionCreateWithoutTokensInput, Prisma.CollectionUncheckedCreateWithoutTokensInput>;
    connectOrCreate?: Prisma.CollectionCreateOrConnectWithoutTokensInput;
    connect?: Prisma.CollectionWhereUniqueInput;
};
export type CollectionUpdateOneWithoutTokensNestedInput = {
    create?: Prisma.XOR<Prisma.CollectionCreateWithoutTokensInput, Prisma.CollectionUncheckedCreateWithoutTokensInput>;
    connectOrCreate?: Prisma.CollectionCreateOrConnectWithoutTokensInput;
    upsert?: Prisma.CollectionUpsertWithoutTokensInput;
    disconnect?: Prisma.CollectionWhereInput | boolean;
    delete?: Prisma.CollectionWhereInput | boolean;
    connect?: Prisma.CollectionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CollectionUpdateToOneWithWhereWithoutTokensInput, Prisma.CollectionUpdateWithoutTokensInput>, Prisma.CollectionUncheckedUpdateWithoutTokensInput>;
};
export type CollectionCreateWithoutUserInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tokens?: Prisma.TokenCreateNestedManyWithoutCollectionInput;
};
export type CollectionUncheckedCreateWithoutUserInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    tokens?: Prisma.TokenUncheckedCreateNestedManyWithoutCollectionInput;
};
export type CollectionCreateOrConnectWithoutUserInput = {
    where: Prisma.CollectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CollectionCreateWithoutUserInput, Prisma.CollectionUncheckedCreateWithoutUserInput>;
};
export type CollectionCreateManyUserInputEnvelope = {
    data: Prisma.CollectionCreateManyUserInput | Prisma.CollectionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CollectionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CollectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CollectionUpdateWithoutUserInput, Prisma.CollectionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CollectionCreateWithoutUserInput, Prisma.CollectionUncheckedCreateWithoutUserInput>;
};
export type CollectionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CollectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CollectionUpdateWithoutUserInput, Prisma.CollectionUncheckedUpdateWithoutUserInput>;
};
export type CollectionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CollectionScalarWhereInput;
    data: Prisma.XOR<Prisma.CollectionUpdateManyMutationInput, Prisma.CollectionUncheckedUpdateManyWithoutUserInput>;
};
export type CollectionScalarWhereInput = {
    AND?: Prisma.CollectionScalarWhereInput | Prisma.CollectionScalarWhereInput[];
    OR?: Prisma.CollectionScalarWhereInput[];
    NOT?: Prisma.CollectionScalarWhereInput | Prisma.CollectionScalarWhereInput[];
    id?: Prisma.StringFilter<"Collection"> | string;
    status?: Prisma.EnumCollectionStatusFilter<"Collection"> | $Enums.CollectionStatus;
    userId?: Prisma.StringFilter<"Collection"> | string;
    creatorAddress?: Prisma.StringFilter<"Collection"> | string;
    name?: Prisma.StringFilter<"Collection"> | string;
    symbol?: Prisma.StringFilter<"Collection"> | string;
    description?: Prisma.StringFilter<"Collection"> | string;
    image?: Prisma.StringFilter<"Collection"> | string;
    royaltyFeeBps?: Prisma.IntFilter<"Collection"> | number;
    txHash?: Prisma.StringNullableFilter<"Collection"> | string | null;
    contractAddress?: Prisma.StringNullableFilter<"Collection"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Collection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Collection"> | Date | string;
};
export type CollectionCreateWithoutTokensInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCollectionsInput;
};
export type CollectionUncheckedCreateWithoutTokensInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    userId: string;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CollectionCreateOrConnectWithoutTokensInput = {
    where: Prisma.CollectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CollectionCreateWithoutTokensInput, Prisma.CollectionUncheckedCreateWithoutTokensInput>;
};
export type CollectionUpsertWithoutTokensInput = {
    update: Prisma.XOR<Prisma.CollectionUpdateWithoutTokensInput, Prisma.CollectionUncheckedUpdateWithoutTokensInput>;
    create: Prisma.XOR<Prisma.CollectionCreateWithoutTokensInput, Prisma.CollectionUncheckedCreateWithoutTokensInput>;
    where?: Prisma.CollectionWhereInput;
};
export type CollectionUpdateToOneWithWhereWithoutTokensInput = {
    where?: Prisma.CollectionWhereInput;
    data: Prisma.XOR<Prisma.CollectionUpdateWithoutTokensInput, Prisma.CollectionUncheckedUpdateWithoutTokensInput>;
};
export type CollectionUpdateWithoutTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCollectionsNestedInput;
};
export type CollectionUncheckedUpdateWithoutTokensInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CollectionCreateManyUserInput = {
    id?: string;
    status?: $Enums.CollectionStatus;
    creatorAddress: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    royaltyFeeBps: number;
    txHash?: string | null;
    contractAddress?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CollectionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tokens?: Prisma.TokenUpdateManyWithoutCollectionNestedInput;
};
export type CollectionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tokens?: Prisma.TokenUncheckedUpdateManyWithoutCollectionNestedInput;
};
export type CollectionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumCollectionStatusFieldUpdateOperationsInput | $Enums.CollectionStatus;
    creatorAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    symbol?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    royaltyFeeBps?: Prisma.IntFieldUpdateOperationsInput | number;
    txHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contractAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CollectionCountOutputType = {
    tokens: number;
};
export type CollectionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tokens?: boolean | CollectionCountOutputTypeCountTokensArgs;
};
export type CollectionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionCountOutputTypeSelect<ExtArgs> | null;
};
export type CollectionCountOutputTypeCountTokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenWhereInput;
};
export type CollectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    status?: boolean;
    userId?: boolean;
    creatorAddress?: boolean;
    name?: boolean;
    symbol?: boolean;
    description?: boolean;
    image?: boolean;
    royaltyFeeBps?: boolean;
    txHash?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    tokens?: boolean | Prisma.Collection$tokensArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.CollectionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["collection"]>;
export type CollectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    status?: boolean;
    userId?: boolean;
    creatorAddress?: boolean;
    name?: boolean;
    symbol?: boolean;
    description?: boolean;
    image?: boolean;
    royaltyFeeBps?: boolean;
    txHash?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["collection"]>;
export type CollectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    status?: boolean;
    userId?: boolean;
    creatorAddress?: boolean;
    name?: boolean;
    symbol?: boolean;
    description?: boolean;
    image?: boolean;
    royaltyFeeBps?: boolean;
    txHash?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["collection"]>;
export type CollectionSelectScalar = {
    id?: boolean;
    status?: boolean;
    userId?: boolean;
    creatorAddress?: boolean;
    name?: boolean;
    symbol?: boolean;
    description?: boolean;
    image?: boolean;
    royaltyFeeBps?: boolean;
    txHash?: boolean;
    contractAddress?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CollectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "status" | "userId" | "creatorAddress" | "name" | "symbol" | "description" | "image" | "royaltyFeeBps" | "txHash" | "contractAddress" | "createdAt" | "updatedAt", ExtArgs["result"]["collection"]>;
export type CollectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tokens?: boolean | Prisma.Collection$tokensArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.CollectionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CollectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CollectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CollectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Collection";
    objects: {
        tokens: Prisma.$TokenPayload<ExtArgs>[];
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        status: $Enums.CollectionStatus;
        userId: string;
        creatorAddress: string;
        name: string;
        symbol: string;
        description: string;
        image: string;
        royaltyFeeBps: number;
        txHash: string | null;
        contractAddress: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["collection"]>;
    composites: {};
};
export type CollectionGetPayload<S extends boolean | null | undefined | CollectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CollectionPayload, S>;
export type CollectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CollectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CollectionCountAggregateInputType | true;
};
export interface CollectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Collection'];
        meta: {
            name: 'Collection';
        };
    };
    findUnique<T extends CollectionFindUniqueArgs>(args: Prisma.SelectSubset<T, CollectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CollectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CollectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CollectionFindFirstArgs>(args?: Prisma.SelectSubset<T, CollectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CollectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CollectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CollectionFindManyArgs>(args?: Prisma.SelectSubset<T, CollectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CollectionCreateArgs>(args: Prisma.SelectSubset<T, CollectionCreateArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CollectionCreateManyArgs>(args?: Prisma.SelectSubset<T, CollectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CollectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CollectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CollectionDeleteArgs>(args: Prisma.SelectSubset<T, CollectionDeleteArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CollectionUpdateArgs>(args: Prisma.SelectSubset<T, CollectionUpdateArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CollectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CollectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CollectionUpdateManyArgs>(args: Prisma.SelectSubset<T, CollectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CollectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CollectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CollectionUpsertArgs>(args: Prisma.SelectSubset<T, CollectionUpsertArgs<ExtArgs>>): Prisma.Prisma__CollectionClient<runtime.Types.Result.GetResult<Prisma.$CollectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CollectionCountArgs>(args?: Prisma.Subset<T, CollectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CollectionCountAggregateOutputType> : number>;
    aggregate<T extends CollectionAggregateArgs>(args: Prisma.Subset<T, CollectionAggregateArgs>): Prisma.PrismaPromise<GetCollectionAggregateType<T>>;
    groupBy<T extends CollectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CollectionGroupByArgs['orderBy'];
    } : {
        orderBy?: CollectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CollectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CollectionFieldRefs;
}
export interface Prisma__CollectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tokens<T extends Prisma.Collection$tokensArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Collection$tokensArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CollectionFieldRefs {
    readonly id: Prisma.FieldRef<"Collection", 'String'>;
    readonly status: Prisma.FieldRef<"Collection", 'CollectionStatus'>;
    readonly userId: Prisma.FieldRef<"Collection", 'String'>;
    readonly creatorAddress: Prisma.FieldRef<"Collection", 'String'>;
    readonly name: Prisma.FieldRef<"Collection", 'String'>;
    readonly symbol: Prisma.FieldRef<"Collection", 'String'>;
    readonly description: Prisma.FieldRef<"Collection", 'String'>;
    readonly image: Prisma.FieldRef<"Collection", 'String'>;
    readonly royaltyFeeBps: Prisma.FieldRef<"Collection", 'Int'>;
    readonly txHash: Prisma.FieldRef<"Collection", 'String'>;
    readonly contractAddress: Prisma.FieldRef<"Collection", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Collection", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Collection", 'DateTime'>;
}
export type CollectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where: Prisma.CollectionWhereUniqueInput;
};
export type CollectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where: Prisma.CollectionWhereUniqueInput;
};
export type CollectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput | Prisma.CollectionOrderByWithRelationInput[];
    cursor?: Prisma.CollectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CollectionScalarFieldEnum | Prisma.CollectionScalarFieldEnum[];
};
export type CollectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput | Prisma.CollectionOrderByWithRelationInput[];
    cursor?: Prisma.CollectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CollectionScalarFieldEnum | Prisma.CollectionScalarFieldEnum[];
};
export type CollectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput | Prisma.CollectionOrderByWithRelationInput[];
    cursor?: Prisma.CollectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CollectionScalarFieldEnum | Prisma.CollectionScalarFieldEnum[];
};
export type CollectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CollectionCreateInput, Prisma.CollectionUncheckedCreateInput>;
};
export type CollectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CollectionCreateManyInput | Prisma.CollectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CollectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    data: Prisma.CollectionCreateManyInput | Prisma.CollectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CollectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CollectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CollectionUpdateInput, Prisma.CollectionUncheckedUpdateInput>;
    where: Prisma.CollectionWhereUniqueInput;
};
export type CollectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CollectionUpdateManyMutationInput, Prisma.CollectionUncheckedUpdateManyInput>;
    where?: Prisma.CollectionWhereInput;
    limit?: number;
};
export type CollectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CollectionUpdateManyMutationInput, Prisma.CollectionUncheckedUpdateManyInput>;
    where?: Prisma.CollectionWhereInput;
    limit?: number;
    include?: Prisma.CollectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CollectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where: Prisma.CollectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CollectionCreateInput, Prisma.CollectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CollectionUpdateInput, Prisma.CollectionUncheckedUpdateInput>;
};
export type CollectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
    where: Prisma.CollectionWhereUniqueInput;
};
export type CollectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CollectionWhereInput;
    limit?: number;
};
export type Collection$tokensArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CollectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CollectionSelect<ExtArgs> | null;
    omit?: Prisma.CollectionOmit<ExtArgs> | null;
    include?: Prisma.CollectionInclude<ExtArgs> | null;
};
export {};
