/// <reference types="lodash" />
import { TableBodyProps } from './table-body';
import { AnyObject } from '../table.type';
declare function useEvents(props: TableBodyProps): {
    handleDoubleClick: (event: Event, row: AnyObject) => void;
    handleClick: (event: Event, row: AnyObject) => void;
    handleContextMenu: (event: Event, row: AnyObject) => void;
    handleMouseEnter: import("lodash").DebouncedFunc<(index: number) => void>;
    handleMouseLeave: import("lodash").DebouncedFunc<() => void>;
    handleCellMouseEnter: (event: MouseEvent, row: AnyObject) => void;
    handleCellMouseLeave: (event: any) => void;
    tooltipContent: import("vue").Ref<string>;
    tooltipTrigger: import("vue").Ref<import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>;
};
export default useEvents;
