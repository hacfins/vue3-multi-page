import { TableLayout, Table } from './table.type';
declare function useLayoutObserver(root: Table): {
    tableLayout: TableLayout;
    onColumnsChange: (layout: TableLayout) => void;
    onScrollableChange: (layout: TableLayout) => void;
};
export default useLayoutObserver;
