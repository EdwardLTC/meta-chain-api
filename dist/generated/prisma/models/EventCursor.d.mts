import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.mjs";
export type EventCursorModel = runtime.Types.Result.DefaultSelection<Prisma.$EventCursorPayload>;
export type AggregateEventCursor = {
    _count: EventCursorCountAggregateOutputType | null;
    _avg: EventCursorAvgAggregateOutputType | null;
    _sum: EventCursorSumAggregateOutputType | null;
    _min: EventCursorMinAggregateOutputType | null;
    _max: EventCursorMaxAggregateOutputType | null;
};
export type EventCursorAvgAggregateOutputType = {
    lastBlock: number | null;
};
export type EventCursorSumAggregateOutputType = {
    lastBlock: number | null;
};
export type EventCursorMinAggregateOutputType = {
    id: string | null;
    lastBlock: number | null;
};
export type EventCursorMaxAggregateOutputType = {
    id: string | null;
    lastBlock: number | null;
};
export type EventCursorCountAggregateOutputType = {
    id: number;
    lastBlock: number;
    _all: number;
};
export type EventCursorAvgAggregateInputType = {
    lastBlock?: true;
};
export type EventCursorSumAggregateInputType = {
    lastBlock?: true;
};
export type EventCursorMinAggregateInputType = {
    id?: true;
    lastBlock?: true;
};
export type EventCursorMaxAggregateInputType = {
    id?: true;
    lastBlock?: true;
};
export type EventCursorCountAggregateInputType = {
    id?: true;
    lastBlock?: true;
    _all?: true;
};
export type EventCursorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventCursorWhereInput;
    orderBy?: Prisma.EventCursorOrderByWithRelationInput | Prisma.EventCursorOrderByWithRelationInput[];
    cursor?: Prisma.EventCursorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EventCursorCountAggregateInputType;
    _avg?: EventCursorAvgAggregateInputType;
    _sum?: EventCursorSumAggregateInputType;
    _min?: EventCursorMinAggregateInputType;
    _max?: EventCursorMaxAggregateInputType;
};
export type GetEventCursorAggregateType<T extends EventCursorAggregateArgs> = {
    [P in keyof T & keyof AggregateEventCursor]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEventCursor[P]> : Prisma.GetScalarType<T[P], AggregateEventCursor[P]>;
};
export type EventCursorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventCursorWhereInput;
    orderBy?: Prisma.EventCursorOrderByWithAggregationInput | Prisma.EventCursorOrderByWithAggregationInput[];
    by: Prisma.EventCursorScalarFieldEnum[] | Prisma.EventCursorScalarFieldEnum;
    having?: Prisma.EventCursorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EventCursorCountAggregateInputType | true;
    _avg?: EventCursorAvgAggregateInputType;
    _sum?: EventCursorSumAggregateInputType;
    _min?: EventCursorMinAggregateInputType;
    _max?: EventCursorMaxAggregateInputType;
};
export type EventCursorGroupByOutputType = {
    id: string;
    lastBlock: number;
    _count: EventCursorCountAggregateOutputType | null;
    _avg: EventCursorAvgAggregateOutputType | null;
    _sum: EventCursorSumAggregateOutputType | null;
    _min: EventCursorMinAggregateOutputType | null;
    _max: EventCursorMaxAggregateOutputType | null;
};
type GetEventCursorGroupByPayload<T extends EventCursorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EventCursorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EventCursorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EventCursorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EventCursorGroupByOutputType[P]>;
}>>;
export type EventCursorWhereInput = {
    AND?: Prisma.EventCursorWhereInput | Prisma.EventCursorWhereInput[];
    OR?: Prisma.EventCursorWhereInput[];
    NOT?: Prisma.EventCursorWhereInput | Prisma.EventCursorWhereInput[];
    id?: Prisma.StringFilter<"EventCursor"> | string;
    lastBlock?: Prisma.IntFilter<"EventCursor"> | number;
};
export type EventCursorOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    lastBlock?: Prisma.SortOrder;
};
export type EventCursorWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EventCursorWhereInput | Prisma.EventCursorWhereInput[];
    OR?: Prisma.EventCursorWhereInput[];
    NOT?: Prisma.EventCursorWhereInput | Prisma.EventCursorWhereInput[];
    lastBlock?: Prisma.IntFilter<"EventCursor"> | number;
}, "id">;
export type EventCursorOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    lastBlock?: Prisma.SortOrder;
    _count?: Prisma.EventCursorCountOrderByAggregateInput;
    _avg?: Prisma.EventCursorAvgOrderByAggregateInput;
    _max?: Prisma.EventCursorMaxOrderByAggregateInput;
    _min?: Prisma.EventCursorMinOrderByAggregateInput;
    _sum?: Prisma.EventCursorSumOrderByAggregateInput;
};
export type EventCursorScalarWhereWithAggregatesInput = {
    AND?: Prisma.EventCursorScalarWhereWithAggregatesInput | Prisma.EventCursorScalarWhereWithAggregatesInput[];
    OR?: Prisma.EventCursorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EventCursorScalarWhereWithAggregatesInput | Prisma.EventCursorScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EventCursor"> | string;
    lastBlock?: Prisma.IntWithAggregatesFilter<"EventCursor"> | number;
};
export type EventCursorCreateInput = {
    id: string;
    lastBlock: number;
};
export type EventCursorUncheckedCreateInput = {
    id: string;
    lastBlock: number;
};
export type EventCursorUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastBlock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type EventCursorUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastBlock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type EventCursorCreateManyInput = {
    id: string;
    lastBlock: number;
};
export type EventCursorUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastBlock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type EventCursorUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastBlock?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type EventCursorCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lastBlock?: Prisma.SortOrder;
};
export type EventCursorAvgOrderByAggregateInput = {
    lastBlock?: Prisma.SortOrder;
};
export type EventCursorMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lastBlock?: Prisma.SortOrder;
};
export type EventCursorMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lastBlock?: Prisma.SortOrder;
};
export type EventCursorSumOrderByAggregateInput = {
    lastBlock?: Prisma.SortOrder;
};
export type EventCursorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lastBlock?: boolean;
}, ExtArgs["result"]["eventCursor"]>;
export type EventCursorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lastBlock?: boolean;
}, ExtArgs["result"]["eventCursor"]>;
export type EventCursorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lastBlock?: boolean;
}, ExtArgs["result"]["eventCursor"]>;
export type EventCursorSelectScalar = {
    id?: boolean;
    lastBlock?: boolean;
};
export type EventCursorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "lastBlock", ExtArgs["result"]["eventCursor"]>;
export type $EventCursorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EventCursor";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        lastBlock: number;
    }, ExtArgs["result"]["eventCursor"]>;
    composites: {};
};
export type EventCursorGetPayload<S extends boolean | null | undefined | EventCursorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EventCursorPayload, S>;
export type EventCursorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EventCursorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EventCursorCountAggregateInputType | true;
};
export interface EventCursorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EventCursor'];
        meta: {
            name: 'EventCursor';
        };
    };
    findUnique<T extends EventCursorFindUniqueArgs>(args: Prisma.SelectSubset<T, EventCursorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EventCursorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EventCursorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EventCursorFindFirstArgs>(args?: Prisma.SelectSubset<T, EventCursorFindFirstArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EventCursorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EventCursorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EventCursorFindManyArgs>(args?: Prisma.SelectSubset<T, EventCursorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EventCursorCreateArgs>(args: Prisma.SelectSubset<T, EventCursorCreateArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EventCursorCreateManyArgs>(args?: Prisma.SelectSubset<T, EventCursorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EventCursorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EventCursorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EventCursorDeleteArgs>(args: Prisma.SelectSubset<T, EventCursorDeleteArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EventCursorUpdateArgs>(args: Prisma.SelectSubset<T, EventCursorUpdateArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EventCursorDeleteManyArgs>(args?: Prisma.SelectSubset<T, EventCursorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EventCursorUpdateManyArgs>(args: Prisma.SelectSubset<T, EventCursorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EventCursorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EventCursorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EventCursorUpsertArgs>(args: Prisma.SelectSubset<T, EventCursorUpsertArgs<ExtArgs>>): Prisma.Prisma__EventCursorClient<runtime.Types.Result.GetResult<Prisma.$EventCursorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EventCursorCountArgs>(args?: Prisma.Subset<T, EventCursorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EventCursorCountAggregateOutputType> : number>;
    aggregate<T extends EventCursorAggregateArgs>(args: Prisma.Subset<T, EventCursorAggregateArgs>): Prisma.PrismaPromise<GetEventCursorAggregateType<T>>;
    groupBy<T extends EventCursorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EventCursorGroupByArgs['orderBy'];
    } : {
        orderBy?: EventCursorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EventCursorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventCursorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EventCursorFieldRefs;
}
export interface Prisma__EventCursorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EventCursorFieldRefs {
    readonly id: Prisma.FieldRef<"EventCursor", 'String'>;
    readonly lastBlock: Prisma.FieldRef<"EventCursor", 'Int'>;
}
export type EventCursorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    where: Prisma.EventCursorWhereUniqueInput;
};
export type EventCursorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    where: Prisma.EventCursorWhereUniqueInput;
};
export type EventCursorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    where?: Prisma.EventCursorWhereInput;
    orderBy?: Prisma.EventCursorOrderByWithRelationInput | Prisma.EventCursorOrderByWithRelationInput[];
    cursor?: Prisma.EventCursorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventCursorScalarFieldEnum | Prisma.EventCursorScalarFieldEnum[];
};
export type EventCursorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    where?: Prisma.EventCursorWhereInput;
    orderBy?: Prisma.EventCursorOrderByWithRelationInput | Prisma.EventCursorOrderByWithRelationInput[];
    cursor?: Prisma.EventCursorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventCursorScalarFieldEnum | Prisma.EventCursorScalarFieldEnum[];
};
export type EventCursorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    where?: Prisma.EventCursorWhereInput;
    orderBy?: Prisma.EventCursorOrderByWithRelationInput | Prisma.EventCursorOrderByWithRelationInput[];
    cursor?: Prisma.EventCursorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventCursorScalarFieldEnum | Prisma.EventCursorScalarFieldEnum[];
};
export type EventCursorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventCursorCreateInput, Prisma.EventCursorUncheckedCreateInput>;
};
export type EventCursorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EventCursorCreateManyInput | Prisma.EventCursorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EventCursorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    data: Prisma.EventCursorCreateManyInput | Prisma.EventCursorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EventCursorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventCursorUpdateInput, Prisma.EventCursorUncheckedUpdateInput>;
    where: Prisma.EventCursorWhereUniqueInput;
};
export type EventCursorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EventCursorUpdateManyMutationInput, Prisma.EventCursorUncheckedUpdateManyInput>;
    where?: Prisma.EventCursorWhereInput;
    limit?: number;
};
export type EventCursorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventCursorUpdateManyMutationInput, Prisma.EventCursorUncheckedUpdateManyInput>;
    where?: Prisma.EventCursorWhereInput;
    limit?: number;
};
export type EventCursorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    where: Prisma.EventCursorWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventCursorCreateInput, Prisma.EventCursorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EventCursorUpdateInput, Prisma.EventCursorUncheckedUpdateInput>;
};
export type EventCursorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
    where: Prisma.EventCursorWhereUniqueInput;
};
export type EventCursorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventCursorWhereInput;
    limit?: number;
};
export type EventCursorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventCursorSelect<ExtArgs> | null;
    omit?: Prisma.EventCursorOmit<ExtArgs> | null;
};
export {};
