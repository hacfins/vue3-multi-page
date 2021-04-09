declare const _default: import("vue").DefineComponent<{
    fixed: {
        type: StringConstructor;
        default: string;
    };
    store: {
        required: true;
        type: ObjectConstructor;
    };
    border: BooleanConstructor;
    defaultSort: {
        type: ObjectConstructor;
        default(): {
            prop: string;
            order: string;
        };
    };
}, {
    columns: import("vue").Ref<import("../table.type").TableColumnCtx[]>;
    filterPanels: import("vue").Ref<{}>;
    hasGutter: import("vue").ComputedRef<number>;
    onColumnsChange: (layout: import("../table.type").TableLayout) => void;
    onScrollableChange: (layout: import("../table.type").TableLayout) => void;
    columnRows: import("vue").ComputedRef<import("../table.type").TableColumnCtx[]>;
    getHeaderRowClass: (rowIndex: number) => string;
    getHeaderRowStyle: (rowIndex: number) => any;
    getHeaderCellClass: (rowIndex: number, columnIndex: number, row: import("../table.type").AnyObject, column: import("../table.type").TableColumnCtx) => string;
    getHeaderCellStyle: (rowIndex: number, columnIndex: number, row: import("../table.type").AnyObject, column: import("../table.type").TableColumnCtx) => any;
    handleHeaderClick: (event: Event, column: import("../table.type").TableColumnCtx) => void;
    handleHeaderContextMenu: (event: Event, column: import("../table.type").TableColumnCtx) => void;
    handleMouseDown: (event: MouseEvent, column: import("../table.type").TableColumnCtx) => void;
    handleMouseMove: (event: MouseEvent, column: import("../table.type").TableColumnCtx) => void;
    handleMouseOut: () => void;
    handleSortClick: (event: Event, column: import("../table.type").TableColumnCtx, givenOrder: string | boolean) => void;
    handleFilterClick: (event: Event) => void;
    isGroup: import("vue").ComputedRef<boolean>;
    toggleAllSelection: (event: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    fixed: unknown;
    store: Record<string, any>;
    border: boolean;
    defaultSort: Record<string, any>;
} & {}>, {
    fixed: unknown;
    border: boolean;
    defaultSort: Record<string, any>;
}>;
export default _default;
