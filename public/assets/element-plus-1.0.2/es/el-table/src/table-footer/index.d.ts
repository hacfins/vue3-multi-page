declare const _default: import("vue").DefineComponent<{
    fixed: {
        type: StringConstructor;
        default: string;
    };
    store: {
        required: true;
        type: ObjectConstructor;
    };
    summaryMethod: FunctionConstructor;
    sumText: StringConstructor;
    border: BooleanConstructor;
    defaultSort: {
        type: ObjectConstructor;
        default(): {
            prop: string;
            order: string;
        };
    };
}, {
    getRowClasses: (column: import("../table.type").TableColumnCtx, cellIndex: number) => string[];
    hasGutter: import("vue").ComputedRef<number>;
    columns: import("vue").Ref<import("../table.type").TableColumnCtx[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    fixed: unknown;
    store: Record<string, any>;
    border: boolean;
    defaultSort: Record<string, any>;
} & {
    summaryMethod?: unknown;
    sumText?: unknown;
}>, {
    fixed: unknown;
    border: boolean;
    defaultSort: Record<string, any>;
}>;
export default _default;
