import { Store, AnyObject, TableColumnCtx } from './table.type';
export declare const cellStarts: {
    default: {
        order: string;
    };
    selection: {
        width: number;
        minWidth: number;
        realWidth: number;
        order: string;
        className: string;
    };
    expand: {
        width: number;
        minWidth: number;
        realWidth: number;
        order: string;
    };
    index: {
        width: number;
        minWidth: number;
        realWidth: number;
        order: string;
    };
};
export declare const cellForced: {
    selection: {
        renderHeader: ({ store: store_ }: {
            store: any;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        renderCell: ({ row, column, store, $index, }: {
            row: AnyObject;
            column: TableColumnCtx;
            store: Store;
            $index: string;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        sortable: boolean;
        resizable: boolean;
    };
    index: {
        renderHeader: ({ column: column_ }: {
            column: any;
        }) => string;
        renderCell: ({ column, $index, }: {
            column: TableColumnCtx;
            $index: string;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        sortable: boolean;
    };
    expand: {
        renderHeader: ({ column: column_ }: {
            column: any;
        }) => string;
        renderCell: ({ row: row_, store: store_ }: {
            row: any;
            store: any;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        sortable: boolean;
        resizable: boolean;
        className: string;
    };
};
export declare function defaultRenderCell({ row, column, $index, }: {
    row: AnyObject;
    column: TableColumnCtx;
    $index: string;
}): any;
export declare function treeCellPrefix({ row: row_, treeNode: treeNode_, store: store_, }: {
    row: any;
    treeNode: any;
    store: any;
}): any[];
