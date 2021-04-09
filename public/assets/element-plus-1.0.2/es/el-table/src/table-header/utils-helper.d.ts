import { TableColumnCtx } from '../table.type';
import { TableHeaderProps } from './table-header';
declare function useUtils(props: TableHeaderProps): {
    isGroup: import("vue").ComputedRef<boolean>;
    toggleAllSelection: (event: Event) => void;
    columnRows: import("vue").ComputedRef<TableColumnCtx[]>;
};
export default useUtils;
