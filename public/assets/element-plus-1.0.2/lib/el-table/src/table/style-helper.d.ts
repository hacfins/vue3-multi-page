import { TableProps, Table, TableLayout, Store } from '../table.type';
declare function useStyle(props: TableProps, layout: TableLayout, store: Store, table: Table): {
    isHidden: import("vue").Ref<boolean>;
    renderExpanded: any;
    setDragVisible: (visible: boolean) => void;
    isGroup: import("vue").Ref<boolean>;
    handleMouseLeave: () => void;
    handleHeaderFooterMousewheel: (event: any, data: any) => void;
    tableSize: import("vue").ComputedRef<any>;
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
    resizeProxyVisible: import("vue").Ref<boolean>;
    bodyWidth: import("vue").ComputedRef<string>;
    resizeState: import("vue").Ref<{
        width: any;
        height: any;
    }>;
    doLayout: () => void;
};
export default useStyle;
