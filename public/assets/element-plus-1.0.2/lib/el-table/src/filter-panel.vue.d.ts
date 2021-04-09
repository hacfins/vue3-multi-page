import { WritableComputedRef, PropType } from 'vue';
import { Store, TableColumnCtx } from './table.type';
declare const _default: import("vue").DefineComponent<{
    placement: {
        type: StringConstructor;
        default: string;
    };
    store: {
        type: PropType<Store>;
    };
    column: {
        type: PropType<TableColumnCtx>;
    };
    upDataColumn: {
        type: FunctionConstructor;
    };
}, {
    tooltipVisible: import("vue").Ref<boolean>;
    multiple: import("vue").ComputedRef<any>;
    filteredValue: WritableComputedRef<unknown[]>;
    filterValue: WritableComputedRef<any>;
    filters: import("vue").ComputedRef<any>;
    handleConfirm: () => void;
    handleReset: () => void;
    handleSelect: (_filterValue?: string | string[]) => void;
    isActive: (filter: any) => boolean;
    t: (...args: any[]) => string;
    showFilterPanel: (e: MouseEvent) => void;
    hideFilterPanel: () => void;
    popperPaneRef: import("vue").ComputedRef<any>;
    tooltip: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    placement: unknown;
} & {
    store?: unknown;
    column?: unknown;
    upDataColumn?: unknown;
}>, {
    placement: unknown;
}>;
export default _default;
