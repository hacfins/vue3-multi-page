/// <reference types="lodash" />
import TableLayout from './table-layout';
import { Table } from './table.type';
declare const _default: import("vue").DefineComponent<{
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    size: StringConstructor;
    width: (StringConstructor | NumberConstructor)[];
    height: (StringConstructor | NumberConstructor)[];
    maxHeight: (StringConstructor | NumberConstructor)[];
    fit: {
        type: BooleanConstructor;
        default: boolean;
    };
    stripe: BooleanConstructor;
    border: BooleanConstructor;
    rowKey: (StringConstructor | FunctionConstructor)[];
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSummary: BooleanConstructor;
    sumText: StringConstructor;
    summaryMethod: FunctionConstructor;
    rowClassName: (StringConstructor | FunctionConstructor)[];
    rowStyle: (ObjectConstructor | FunctionConstructor)[];
    cellClassName: (StringConstructor | FunctionConstructor)[];
    cellStyle: (ObjectConstructor | FunctionConstructor)[];
    headerRowClassName: (StringConstructor | FunctionConstructor)[];
    headerRowStyle: (ObjectConstructor | FunctionConstructor)[];
    headerCellClassName: (StringConstructor | FunctionConstructor)[];
    headerCellStyle: (ObjectConstructor | FunctionConstructor)[];
    highlightCurrentRow: BooleanConstructor;
    currentRowKey: (StringConstructor | NumberConstructor)[];
    emptyText: StringConstructor;
    expandRowKeys: ArrayConstructor;
    defaultExpandAll: BooleanConstructor;
    defaultSort: ObjectConstructor;
    tooltipEffect: StringConstructor;
    spanMethod: FunctionConstructor;
    selectOnIndeterminate: {
        type: BooleanConstructor;
        default: boolean;
    };
    indent: {
        type: NumberConstructor;
        default: number;
    };
    treeProps: {
        type: ObjectConstructor;
        default(): {
            hasChildren: string;
            children: string;
        };
    };
    lazy: BooleanConstructor;
    load: FunctionConstructor;
}, {
    layout: TableLayout;
    store: import("./table.type").Store;
    handleHeaderFooterMousewheel: (event: any, data: any) => void;
    handleMouseLeave: () => void;
    tableId: string;
    tableSize: import("vue").ComputedRef<any>;
    isHidden: import("vue").Ref<boolean>;
    renderExpanded: any;
    resizeProxyVisible: import("vue").Ref<boolean>;
    resizeState: import("vue").Ref<{
        width: any;
        height: any;
    }>;
    isGroup: import("vue").Ref<boolean>;
    bodyWidth: import("vue").ComputedRef<string>;
    bodyHeight: import("vue").ComputedRef<{
        height: string;
        'max-height'?: undefined;
    } | {
        'max-height': string;
        height?: undefined;
    } | {
        height?: undefined;
        'max-height'?: undefined;
    }>;
    emptyBlockStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
    }>;
    debouncedUpdateLayout: import("lodash").DebouncedFunc<() => void>;
    handleFixedMousewheel: (event: any, data: any) => void;
    fixedHeight: import("vue").ComputedRef<{
        bottom: number;
        height?: undefined;
    } | {
        bottom: string;
        height?: undefined;
    } | {
        height: string;
        bottom?: undefined;
    }>;
    fixedBodyHeight: import("vue").ComputedRef<{
        height: string;
        'max-height'?: undefined;
    } | {
        'max-height': string;
        height?: undefined;
    } | {
        height?: undefined;
        'max-height'?: undefined;
    }>;
    setCurrentRow: (row: import("./table.type").AnyObject) => void;
    toggleRowSelection: (row: any, selected: any) => void;
    clearSelection: () => void;
    clearFilter: (columnKeys: string[]) => void;
    toggleAllSelection: () => void;
    toggleRowExpansion: (row: any, expanded: any) => void;
    clearSort: () => void;
    doLayout: () => void;
    sort: (prop: any, order: any) => void;
    t: (...args: any[]) => string;
    setDragVisible: (visible: boolean) => void;
    context: Table;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "select-all" | "selection-change" | "cell-mouse-enter" | "cell-mouse-leave" | "cell-click" | "cell-dblclick" | "row-click" | "row-contextmenu" | "row-dblclick" | "header-click" | "header-contextmenu" | "sort-change" | "filter-change" | "current-change" | "header-dragend" | "expand-change")[], "select" | "select-all" | "selection-change" | "cell-mouse-enter" | "cell-mouse-leave" | "cell-click" | "cell-dblclick" | "row-click" | "row-contextmenu" | "row-dblclick" | "header-click" | "header-contextmenu" | "sort-change" | "filter-change" | "current-change" | "header-dragend" | "expand-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    border: boolean;
    stripe: boolean;
    data: unknown;
    fit: boolean;
    showHeader: boolean;
    showSummary: boolean;
    highlightCurrentRow: boolean;
    defaultExpandAll: boolean;
    selectOnIndeterminate: boolean;
    indent: unknown;
    treeProps: Record<string, any>;
    lazy: boolean;
} & {
    defaultSort?: Record<string, any>;
    tooltipEffect?: unknown;
    rowClassName?: unknown;
    rowStyle?: unknown;
    summaryMethod?: unknown;
    sumText?: unknown;
    size?: unknown;
    width?: unknown;
    height?: unknown;
    maxHeight?: unknown;
    rowKey?: unknown;
    cellClassName?: unknown;
    cellStyle?: unknown;
    headerRowClassName?: unknown;
    headerRowStyle?: unknown;
    headerCellClassName?: unknown;
    headerCellStyle?: unknown;
    currentRowKey?: unknown;
    emptyText?: unknown;
    expandRowKeys?: unknown;
    spanMethod?: unknown;
    load?: unknown;
}>, {
    border: boolean;
    stripe: boolean;
    data: unknown;
    fit: boolean;
    showHeader: boolean;
    showSummary: boolean;
    highlightCurrentRow: boolean;
    defaultExpandAll: boolean;
    selectOnIndeterminate: boolean;
    indent: unknown;
    treeProps: Record<string, any>;
    lazy: boolean;
}>;
export default _default;
