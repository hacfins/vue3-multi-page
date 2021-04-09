import { TableColumnCtx } from '../table.type';
import { TableHeaderProps } from './table-header';
declare function useEvent(props: TableHeaderProps, emit: any): {
    handleHeaderClick: (event: Event, column: TableColumnCtx) => void;
    handleHeaderContextMenu: (event: Event, column: TableColumnCtx) => void;
    handleMouseDown: (event: MouseEvent, column: TableColumnCtx) => void;
    handleMouseMove: (event: MouseEvent, column: TableColumnCtx) => void;
    handleMouseOut: () => void;
    handleSortClick: (event: Event, column: TableColumnCtx, givenOrder: string | boolean) => void;
    handleFilterClick: (event: Event) => void;
};
export default useEvent;
