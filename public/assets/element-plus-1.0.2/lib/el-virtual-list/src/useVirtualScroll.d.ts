export declare type Direction = 'h' | 'v';
export declare type Alignment = 'head' | 'center' | 'tail';
export interface ElVirtualScrollProps<T> {
    windowSize: number;
    direction: Direction;
    data: Array<T>;
    itemSize: number;
    poolSize: number;
}
export default function useVirtualScroll<T>(props: ElVirtualScrollProps<T>): {
    viewportRef: import("vue").Ref<HTMLElement>;
    contentStyle: import("vue").ComputedRef<{
        [x: string]: string;
    }>;
    itemContainerStyle: import("vue").ComputedRef<{
        transform: string;
    }>;
    itemStyle: import("vue").ComputedRef<{
        [x: string]: string;
    }>;
    viewportStyle: import("vue").ComputedRef<{
        [x: string]: string;
    }>;
    startNode: import("vue").ComputedRef<number>;
    renderingItems: import("vue").ComputedRef<number>;
    window: import("vue").ComputedRef<T[]>;
    onScroll: (e: Event) => void;
    scrollTo: (idx: number, alignment?: Alignment) => void;
};
