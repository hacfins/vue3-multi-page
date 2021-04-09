import { ComputedRef } from 'vue';
import { TableColumnCtx } from '../table.type';
declare function useRender(props: TableColumnCtx, slots: any, owner: ComputedRef<any>): {
    columnId: import("vue").Ref<string>;
    realAlign: import("vue").Ref<string>;
    isSubColumn: import("vue").Ref<boolean>;
    realHeaderAlign: import("vue").Ref<string>;
    columnOrTableParent: ComputedRef<any>;
    setColumnWidth: (column: any) => any;
    setColumnForcedProps: (column: any) => any;
    setColumnRenders: (column: any) => any;
    getPropsData: (...propsKey: unknown[]) => unknown;
    getColumnElIndex: (children: any, child: any) => any;
};
export default useRender;
