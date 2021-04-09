import { PopperInstance, IPopperOptions } from '../../el-popper';
import { AnyObject, TableColumnCtx } from './table.type';
export declare const getCell: (event: Event) => HTMLElement;
export declare const orderBy: (array: any, sortKey: any, reverse: any, sortMethod: any, sortBy: any) => any;
export declare const getColumnById: (table: {
    columns: TableColumnCtx[];
}, columnId: string) => null | TableColumnCtx;
export declare const getColumnByKey: (table: {
    columns: TableColumnCtx[];
}, columnKey: string) => TableColumnCtx;
export declare const getColumnByCell: (table: {
    columns: TableColumnCtx[];
}, cell: HTMLElement) => null | TableColumnCtx;
export declare const getRowIdentity: (row: AnyObject, rowKey: string | ((row: AnyObject) => any)) => string;
export declare const getKeysMap: (array: AnyObject[], rowKey: string) => AnyObject;
export declare function mergeOptions<T, K>(defaults: T, config: K): T & K;
export declare function parseWidth(width: number | string): number | string;
export declare function parseMinWidth(minWidth: any): number;
export declare function parseHeight(height: number | string): string | number;
export declare function compose(...funcs: any[]): any;
export declare function toggleRowStatus(statusArr: AnyObject[], row: AnyObject, newVal: boolean): boolean;
export declare function walkTreeNode(root: any, cb: any, childrenKey?: string, lazyKey?: string): void;
export declare let removePopper: any;
export declare function createTablePopper(trigger: HTMLElement, popperContent: string, popperOptions: Partial<IPopperOptions>, tooltipEffect: string): PopperInstance;
