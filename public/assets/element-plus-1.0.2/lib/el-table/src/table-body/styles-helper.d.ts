import { TableBodyProps } from './table-body';
import { AnyObject, TableColumnCtx } from '../table.type';
declare function useStyles(props: TableBodyProps): {
    getRowStyle: (row: AnyObject, rowIndex: number) => any;
    getRowClass: (row: AnyObject, rowIndex: number) => string[];
    getCellStyle: (rowIndex: number, columnIndex: number, row: AnyObject, column: TableColumnCtx) => any;
    getCellClass: (rowIndex: number, columnIndex: number, row: AnyObject, column: TableColumnCtx) => string;
    getSpan: (row: AnyObject, column: TableColumnCtx, rowIndex: number, columnIndex: number) => {
        rowspan: number;
        colspan: number;
    };
    getColspanRealWidth: (columns: TableColumnCtx[], colspan: number, index: number) => number;
    isColumnHidden: (index: any) => boolean;
};
export default useStyles;
