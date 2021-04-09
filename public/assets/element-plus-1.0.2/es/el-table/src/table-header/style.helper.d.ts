import { TableColumnCtx, AnyObject } from '../table.type';
import { TableHeaderProps } from './table-header';
declare function useStyle(props: TableHeaderProps): {
    getHeaderRowStyle: (rowIndex: number) => any;
    getHeaderRowClass: (rowIndex: number) => string;
    getHeaderCellStyle: (rowIndex: number, columnIndex: number, row: AnyObject, column: TableColumnCtx) => any;
    getHeaderCellClass: (rowIndex: number, columnIndex: number, row: AnyObject, column: TableColumnCtx) => string;
};
export default useStyle;
