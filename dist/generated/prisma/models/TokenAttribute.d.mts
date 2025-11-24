import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.mjs";
export type TokenAttributeModel = runtime.Types.Result.DefaultSelection<Prisma.$TokenAttributePayload>;
export type AggregateTokenAttribute = {
    _count: TokenAttributeCountAggregateOutputType | null;
    _avg: TokenAttributeAvgAggregateOutputType | null;
    _sum: TokenAttributeSumAggregateOutputType | null;
    _min: TokenAttributeMinAggregateOutputType | null;
    _max: TokenAttributeMaxAggregateOutputType | null;
};
export type TokenAttributeAvgAggregateOutputType = {
    rarity: number | null;
};
export type TokenAttributeSumAggregateOutputType = {
    rarity: number | null;
};
export type TokenAttributeMinAggregateOutputType = {
    id: string | null;
    tokenId: string | null;
    traitType: string | null;
    value: string | null;
    rarity: number | null;
};
export type TokenAttributeMaxAggregateOutputType = {
    id: string | null;
    tokenId: string | null;
    traitType: string | null;
    value: string | null;
    rarity: number | null;
};
export type TokenAttributeCountAggregateOutputType = {
    id: number;
    tokenId: number;
    traitType: number;
    value: number;
    rarity: number;
    _all: number;
};
export type TokenAttributeAvgAggregateInputType = {
    rarity?: true;
};
export type TokenAttributeSumAggregateInputType = {
    rarity?: true;
};
export type TokenAttributeMinAggregateInputType = {
    id?: true;
    tokenId?: true;
    traitType?: true;
    value?: true;
    rarity?: true;
};
export type TokenAttributeMaxAggregateInputType = {
    id?: true;
    tokenId?: true;
    traitType?: true;
    value?: true;
    rarity?: true;
};
export type TokenAttributeCountAggregateInputType = {
    id?: true;
    tokenId?: true;
    traitType?: true;
    value?: true;
    rarity?: true;
    _all?: true;
};
export type TokenAttributeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenAttributeWhereInput;
    orderBy?: Prisma.TokenAttributeOrderByWithRelationInput | Prisma.TokenAttributeOrderByWithRelationInput[];
    cursor?: Prisma.TokenAttributeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TokenAttributeCountAggregateInputType;
    _avg?: TokenAttributeAvgAggregateInputType;
    _sum?: TokenAttributeSumAggregateInputType;
    _min?: TokenAttributeMinAggregateInputType;
    _max?: TokenAttributeMaxAggregateInputType;
};
export type GetTokenAttributeAggregateType<T extends TokenAttributeAggregateArgs> = {
    [P in keyof T & keyof AggregateTokenAttribute]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTokenAttribute[P]> : Prisma.GetScalarType<T[P], AggregateTokenAttribute[P]>;
};
export type TokenAttributeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenAttributeWhereInput;
    orderBy?: Prisma.TokenAttributeOrderByWithAggregationInput | Prisma.TokenAttributeOrderByWithAggregationInput[];
    by: Prisma.TokenAttributeScalarFieldEnum[] | Prisma.TokenAttributeScalarFieldEnum;
    having?: Prisma.TokenAttributeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TokenAttributeCountAggregateInputType | true;
    _avg?: TokenAttributeAvgAggregateInputType;
    _sum?: TokenAttributeSumAggregateInputType;
    _min?: TokenAttributeMinAggregateInputType;
    _max?: TokenAttributeMaxAggregateInputType;
};
export type TokenAttributeGroupByOutputType = {
    id: string;
    tokenId: string;
    traitType: string;
    value: string;
    rarity: number | null;
    _count: TokenAttributeCountAggregateOutputType | null;
    _avg: TokenAttributeAvgAggregateOutputType | null;
    _sum: TokenAttributeSumAggregateOutputType | null;
    _min: TokenAttributeMinAggregateOutputType | null;
    _max: TokenAttributeMaxAggregateOutputType | null;
};
type GetTokenAttributeGroupByPayload<T extends TokenAttributeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TokenAttributeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TokenAttributeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TokenAttributeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TokenAttributeGroupByOutputType[P]>;
}>>;
export type TokenAttributeWhereInput = {
    AND?: Prisma.TokenAttributeWhereInput | Prisma.TokenAttributeWhereInput[];
    OR?: Prisma.TokenAttributeWhereInput[];
    NOT?: Prisma.TokenAttributeWhereInput | Prisma.TokenAttributeWhereInput[];
    id?: Prisma.StringFilter<"TokenAttribute"> | string;
    tokenId?: Prisma.StringFilter<"TokenAttribute"> | string;
    traitType?: Prisma.StringFilter<"TokenAttribute"> | string;
    value?: Prisma.StringFilter<"TokenAttribute"> | string;
    rarity?: Prisma.FloatNullableFilter<"TokenAttribute"> | number | null;
    token?: Prisma.XOR<Prisma.TokenScalarRelationFilter, Prisma.TokenWhereInput>;
};
export type TokenAttributeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    traitType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    rarity?: Prisma.SortOrderInput | Prisma.SortOrder;
    token?: Prisma.TokenOrderByWithRelationInput;
};
export type TokenAttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TokenAttributeWhereInput | Prisma.TokenAttributeWhereInput[];
    OR?: Prisma.TokenAttributeWhereInput[];
    NOT?: Prisma.TokenAttributeWhereInput | Prisma.TokenAttributeWhereInput[];
    tokenId?: Prisma.StringFilter<"TokenAttribute"> | string;
    traitType?: Prisma.StringFilter<"TokenAttribute"> | string;
    value?: Prisma.StringFilter<"TokenAttribute"> | string;
    rarity?: Prisma.FloatNullableFilter<"TokenAttribute"> | number | null;
    token?: Prisma.XOR<Prisma.TokenScalarRelationFilter, Prisma.TokenWhereInput>;
}, "id">;
export type TokenAttributeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    traitType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    rarity?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.TokenAttributeCountOrderByAggregateInput;
    _avg?: Prisma.TokenAttributeAvgOrderByAggregateInput;
    _max?: Prisma.TokenAttributeMaxOrderByAggregateInput;
    _min?: Prisma.TokenAttributeMinOrderByAggregateInput;
    _sum?: Prisma.TokenAttributeSumOrderByAggregateInput;
};
export type TokenAttributeScalarWhereWithAggregatesInput = {
    AND?: Prisma.TokenAttributeScalarWhereWithAggregatesInput | Prisma.TokenAttributeScalarWhereWithAggregatesInput[];
    OR?: Prisma.TokenAttributeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TokenAttributeScalarWhereWithAggregatesInput | Prisma.TokenAttributeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TokenAttribute"> | string;
    tokenId?: Prisma.StringWithAggregatesFilter<"TokenAttribute"> | string;
    traitType?: Prisma.StringWithAggregatesFilter<"TokenAttribute"> | string;
    value?: Prisma.StringWithAggregatesFilter<"TokenAttribute"> | string;
    rarity?: Prisma.FloatNullableWithAggregatesFilter<"TokenAttribute"> | number | null;
};
export type TokenAttributeCreateInput = {
    id?: string;
    traitType: string;
    value: string;
    rarity?: number | null;
    token: Prisma.TokenCreateNestedOneWithoutAttributesInput;
};
export type TokenAttributeUncheckedCreateInput = {
    id?: string;
    tokenId: string;
    traitType: string;
    value: string;
    rarity?: number | null;
};
export type TokenAttributeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    traitType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    rarity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    token?: Prisma.TokenUpdateOneRequiredWithoutAttributesNestedInput;
};
export type TokenAttributeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    traitType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    rarity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TokenAttributeCreateManyInput = {
    id?: string;
    tokenId: string;
    traitType: string;
    value: string;
    rarity?: number | null;
};
export type TokenAttributeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    traitType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    rarity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TokenAttributeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenId?: Prisma.StringFieldUpdateOperationsInput | string;
    traitType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    rarity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TokenAttributeListRelationFilter = {
    every?: Prisma.TokenAttributeWhereInput;
    some?: Prisma.TokenAttributeWhereInput;
    none?: Prisma.TokenAttributeWhereInput;
};
export type TokenAttributeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TokenAttributeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    traitType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    rarity?: Prisma.SortOrder;
};
export type TokenAttributeAvgOrderByAggregateInput = {
    rarity?: Prisma.SortOrder;
};
export type TokenAttributeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    traitType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    rarity?: Prisma.SortOrder;
};
export type TokenAttributeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenId?: Prisma.SortOrder;
    traitType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    rarity?: Prisma.SortOrder;
};
export type TokenAttributeSumOrderByAggregateInput = {
    rarity?: Prisma.SortOrder;
};
export type TokenAttributeCreateNestedManyWithoutTokenInput = {
    create?: Prisma.XOR<Prisma.TokenAttributeCreateWithoutTokenInput, Prisma.TokenAttributeUncheckedCreateWithoutTokenInput> | Prisma.TokenAttributeCreateWithoutTokenInput[] | Prisma.TokenAttributeUncheckedCreateWithoutTokenInput[];
    connectOrCreate?: Prisma.TokenAttributeCreateOrConnectWithoutTokenInput | Prisma.TokenAttributeCreateOrConnectWithoutTokenInput[];
    createMany?: Prisma.TokenAttributeCreateManyTokenInputEnvelope;
    connect?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
};
export type TokenAttributeUncheckedCreateNestedManyWithoutTokenInput = {
    create?: Prisma.XOR<Prisma.TokenAttributeCreateWithoutTokenInput, Prisma.TokenAttributeUncheckedCreateWithoutTokenInput> | Prisma.TokenAttributeCreateWithoutTokenInput[] | Prisma.TokenAttributeUncheckedCreateWithoutTokenInput[];
    connectOrCreate?: Prisma.TokenAttributeCreateOrConnectWithoutTokenInput | Prisma.TokenAttributeCreateOrConnectWithoutTokenInput[];
    createMany?: Prisma.TokenAttributeCreateManyTokenInputEnvelope;
    connect?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
};
export type TokenAttributeUpdateManyWithoutTokenNestedInput = {
    create?: Prisma.XOR<Prisma.TokenAttributeCreateWithoutTokenInput, Prisma.TokenAttributeUncheckedCreateWithoutTokenInput> | Prisma.TokenAttributeCreateWithoutTokenInput[] | Prisma.TokenAttributeUncheckedCreateWithoutTokenInput[];
    connectOrCreate?: Prisma.TokenAttributeCreateOrConnectWithoutTokenInput | Prisma.TokenAttributeCreateOrConnectWithoutTokenInput[];
    upsert?: Prisma.TokenAttributeUpsertWithWhereUniqueWithoutTokenInput | Prisma.TokenAttributeUpsertWithWhereUniqueWithoutTokenInput[];
    createMany?: Prisma.TokenAttributeCreateManyTokenInputEnvelope;
    set?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    disconnect?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    delete?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    connect?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    update?: Prisma.TokenAttributeUpdateWithWhereUniqueWithoutTokenInput | Prisma.TokenAttributeUpdateWithWhereUniqueWithoutTokenInput[];
    updateMany?: Prisma.TokenAttributeUpdateManyWithWhereWithoutTokenInput | Prisma.TokenAttributeUpdateManyWithWhereWithoutTokenInput[];
    deleteMany?: Prisma.TokenAttributeScalarWhereInput | Prisma.TokenAttributeScalarWhereInput[];
};
export type TokenAttributeUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: Prisma.XOR<Prisma.TokenAttributeCreateWithoutTokenInput, Prisma.TokenAttributeUncheckedCreateWithoutTokenInput> | Prisma.TokenAttributeCreateWithoutTokenInput[] | Prisma.TokenAttributeUncheckedCreateWithoutTokenInput[];
    connectOrCreate?: Prisma.TokenAttributeCreateOrConnectWithoutTokenInput | Prisma.TokenAttributeCreateOrConnectWithoutTokenInput[];
    upsert?: Prisma.TokenAttributeUpsertWithWhereUniqueWithoutTokenInput | Prisma.TokenAttributeUpsertWithWhereUniqueWithoutTokenInput[];
    createMany?: Prisma.TokenAttributeCreateManyTokenInputEnvelope;
    set?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    disconnect?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    delete?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    connect?: Prisma.TokenAttributeWhereUniqueInput | Prisma.TokenAttributeWhereUniqueInput[];
    update?: Prisma.TokenAttributeUpdateWithWhereUniqueWithoutTokenInput | Prisma.TokenAttributeUpdateWithWhereUniqueWithoutTokenInput[];
    updateMany?: Prisma.TokenAttributeUpdateManyWithWhereWithoutTokenInput | Prisma.TokenAttributeUpdateManyWithWhereWithoutTokenInput[];
    deleteMany?: Prisma.TokenAttributeScalarWhereInput | Prisma.TokenAttributeScalarWhereInput[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type TokenAttributeCreateWithoutTokenInput = {
    id?: string;
    traitType: string;
    value: string;
    rarity?: number | null;
};
export type TokenAttributeUncheckedCreateWithoutTokenInput = {
    id?: string;
    traitType: string;
    value: string;
    rarity?: number | null;
};
export type TokenAttributeCreateOrConnectWithoutTokenInput = {
    where: Prisma.TokenAttributeWhereUniqueInput;
    create: Prisma.XOR<Prisma.TokenAttributeCreateWithoutTokenInput, Prisma.TokenAttributeUncheckedCreateWithoutTokenInput>;
};
export type TokenAttributeCreateManyTokenInputEnvelope = {
    data: Prisma.TokenAttributeCreateManyTokenInput | Prisma.TokenAttributeCreateManyTokenInput[];
    skipDuplicates?: boolean;
};
export type TokenAttributeUpsertWithWhereUniqueWithoutTokenInput = {
    where: Prisma.TokenAttributeWhereUniqueInput;
    update: Prisma.XOR<Prisma.TokenAttributeUpdateWithoutTokenInput, Prisma.TokenAttributeUncheckedUpdateWithoutTokenInput>;
    create: Prisma.XOR<Prisma.TokenAttributeCreateWithoutTokenInput, Prisma.TokenAttributeUncheckedCreateWithoutTokenInput>;
};
export type TokenAttributeUpdateWithWhereUniqueWithoutTokenInput = {
    where: Prisma.TokenAttributeWhereUniqueInput;
    data: Prisma.XOR<Prisma.TokenAttributeUpdateWithoutTokenInput, Prisma.TokenAttributeUncheckedUpdateWithoutTokenInput>;
};
export type TokenAttributeUpdateManyWithWhereWithoutTokenInput = {
    where: Prisma.TokenAttributeScalarWhereInput;
    data: Prisma.XOR<Prisma.TokenAttributeUpdateManyMutationInput, Prisma.TokenAttributeUncheckedUpdateManyWithoutTokenInput>;
};
export type TokenAttributeScalarWhereInput = {
    AND?: Prisma.TokenAttributeScalarWhereInput | Prisma.TokenAttributeScalarWhereInput[];
    OR?: Prisma.TokenAttributeScalarWhereInput[];
    NOT?: Prisma.TokenAttributeScalarWhereInput | Prisma.TokenAttributeScalarWhereInput[];
    id?: Prisma.StringFilter<"TokenAttribute"> | string;
    tokenId?: Prisma.StringFilter<"TokenAttribute"> | string;
    traitType?: Prisma.StringFilter<"TokenAttribute"> | string;
    value?: Prisma.StringFilter<"TokenAttribute"> | string;
    rarity?: Prisma.FloatNullableFilter<"TokenAttribute"> | number | null;
};
export type TokenAttributeCreateManyTokenInput = {
    id?: string;
    traitType: string;
    value: string;
    rarity?: number | null;
};
export type TokenAttributeUpdateWithoutTokenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    traitType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    rarity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TokenAttributeUncheckedUpdateWithoutTokenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    traitType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    rarity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TokenAttributeUncheckedUpdateManyWithoutTokenInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    traitType?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    rarity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type TokenAttributeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenId?: boolean;
    traitType?: boolean;
    value?: boolean;
    rarity?: boolean;
    token?: boolean | Prisma.TokenDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tokenAttribute"]>;
export type TokenAttributeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenId?: boolean;
    traitType?: boolean;
    value?: boolean;
    rarity?: boolean;
    token?: boolean | Prisma.TokenDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tokenAttribute"]>;
export type TokenAttributeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenId?: boolean;
    traitType?: boolean;
    value?: boolean;
    rarity?: boolean;
    token?: boolean | Prisma.TokenDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tokenAttribute"]>;
export type TokenAttributeSelectScalar = {
    id?: boolean;
    tokenId?: boolean;
    traitType?: boolean;
    value?: boolean;
    rarity?: boolean;
};
export type TokenAttributeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tokenId" | "traitType" | "value" | "rarity", ExtArgs["result"]["tokenAttribute"]>;
export type TokenAttributeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    token?: boolean | Prisma.TokenDefaultArgs<ExtArgs>;
};
export type TokenAttributeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    token?: boolean | Prisma.TokenDefaultArgs<ExtArgs>;
};
export type TokenAttributeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    token?: boolean | Prisma.TokenDefaultArgs<ExtArgs>;
};
export type $TokenAttributePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TokenAttribute";
    objects: {
        token: Prisma.$TokenPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tokenId: string;
        traitType: string;
        value: string;
        rarity: number | null;
    }, ExtArgs["result"]["tokenAttribute"]>;
    composites: {};
};
export type TokenAttributeGetPayload<S extends boolean | null | undefined | TokenAttributeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload, S>;
export type TokenAttributeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TokenAttributeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TokenAttributeCountAggregateInputType | true;
};
export interface TokenAttributeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TokenAttribute'];
        meta: {
            name: 'TokenAttribute';
        };
    };
    findUnique<T extends TokenAttributeFindUniqueArgs>(args: Prisma.SelectSubset<T, TokenAttributeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TokenAttributeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TokenAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TokenAttributeFindFirstArgs>(args?: Prisma.SelectSubset<T, TokenAttributeFindFirstArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TokenAttributeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TokenAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TokenAttributeFindManyArgs>(args?: Prisma.SelectSubset<T, TokenAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TokenAttributeCreateArgs>(args: Prisma.SelectSubset<T, TokenAttributeCreateArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TokenAttributeCreateManyArgs>(args?: Prisma.SelectSubset<T, TokenAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TokenAttributeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TokenAttributeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TokenAttributeDeleteArgs>(args: Prisma.SelectSubset<T, TokenAttributeDeleteArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TokenAttributeUpdateArgs>(args: Prisma.SelectSubset<T, TokenAttributeUpdateArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TokenAttributeDeleteManyArgs>(args?: Prisma.SelectSubset<T, TokenAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TokenAttributeUpdateManyArgs>(args: Prisma.SelectSubset<T, TokenAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TokenAttributeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TokenAttributeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TokenAttributeUpsertArgs>(args: Prisma.SelectSubset<T, TokenAttributeUpsertArgs<ExtArgs>>): Prisma.Prisma__TokenAttributeClient<runtime.Types.Result.GetResult<Prisma.$TokenAttributePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TokenAttributeCountArgs>(args?: Prisma.Subset<T, TokenAttributeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TokenAttributeCountAggregateOutputType> : number>;
    aggregate<T extends TokenAttributeAggregateArgs>(args: Prisma.Subset<T, TokenAttributeAggregateArgs>): Prisma.PrismaPromise<GetTokenAttributeAggregateType<T>>;
    groupBy<T extends TokenAttributeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TokenAttributeGroupByArgs['orderBy'];
    } : {
        orderBy?: TokenAttributeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TokenAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TokenAttributeFieldRefs;
}
export interface Prisma__TokenAttributeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    token<T extends Prisma.TokenDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TokenDefaultArgs<ExtArgs>>): Prisma.Prisma__TokenClient<runtime.Types.Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TokenAttributeFieldRefs {
    readonly id: Prisma.FieldRef<"TokenAttribute", 'String'>;
    readonly tokenId: Prisma.FieldRef<"TokenAttribute", 'String'>;
    readonly traitType: Prisma.FieldRef<"TokenAttribute", 'String'>;
    readonly value: Prisma.FieldRef<"TokenAttribute", 'String'>;
    readonly rarity: Prisma.FieldRef<"TokenAttribute", 'Float'>;
}
export type TokenAttributeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
    where: Prisma.TokenAttributeWhereUniqueInput;
};
export type TokenAttributeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
    where: Prisma.TokenAttributeWhereUniqueInput;
};
export type TokenAttributeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TokenAttributeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TokenAttributeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TokenAttributeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TokenAttributeCreateInput, Prisma.TokenAttributeUncheckedCreateInput>;
};
export type TokenAttributeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TokenAttributeCreateManyInput | Prisma.TokenAttributeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TokenAttributeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    data: Prisma.TokenAttributeCreateManyInput | Prisma.TokenAttributeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TokenAttributeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TokenAttributeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TokenAttributeUpdateInput, Prisma.TokenAttributeUncheckedUpdateInput>;
    where: Prisma.TokenAttributeWhereUniqueInput;
};
export type TokenAttributeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TokenAttributeUpdateManyMutationInput, Prisma.TokenAttributeUncheckedUpdateManyInput>;
    where?: Prisma.TokenAttributeWhereInput;
    limit?: number;
};
export type TokenAttributeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TokenAttributeUpdateManyMutationInput, Prisma.TokenAttributeUncheckedUpdateManyInput>;
    where?: Prisma.TokenAttributeWhereInput;
    limit?: number;
    include?: Prisma.TokenAttributeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TokenAttributeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
    where: Prisma.TokenAttributeWhereUniqueInput;
    create: Prisma.XOR<Prisma.TokenAttributeCreateInput, Prisma.TokenAttributeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TokenAttributeUpdateInput, Prisma.TokenAttributeUncheckedUpdateInput>;
};
export type TokenAttributeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
    where: Prisma.TokenAttributeWhereUniqueInput;
};
export type TokenAttributeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TokenAttributeWhereInput;
    limit?: number;
};
export type TokenAttributeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TokenAttributeSelect<ExtArgs> | null;
    omit?: Prisma.TokenAttributeOmit<ExtArgs> | null;
    include?: Prisma.TokenAttributeInclude<ExtArgs> | null;
};
export {};
