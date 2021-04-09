import { TableFooter, TableColumnCtx } from '../table.type';
declare function useStyle(props: TableFooter): {
    hasGutter: import("vue").ComputedRef<number>;
    getRowClasses: (column: TableColumnCtx, cellIndex: number) => string[];
    columns: import("vue").Ref<TableColumnCtx[]>;
};
export default useStyle;
