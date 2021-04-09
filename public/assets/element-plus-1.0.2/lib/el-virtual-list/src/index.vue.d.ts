import type { PropType } from 'vue';
import type { Direction } from './useVirtualScroll';
declare const _default: import("vue").DefineComponent<{
    direction: {
        type: PropType<Direction>;
        default: string;
    };
    data: {
        type: PropType<any[]>;
        required: true;
    };
    itemSize: {
        type: NumberConstructor;
        required: true;
    };
    windowSize: {
        type: NumberConstructor;
        required: true;
    };
    poolSize: {
        type: NumberConstructor;
        default: number;
    };
}, {
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
    window: import("vue").ComputedRef<unknown[]>;
    onScroll: (e: Event) => void;
    scrollTo: (idx: number, alignment?: import("./useVirtualScroll").Alignment) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    direction: unknown;
    data: unknown;
    itemSize: unknown;
    windowSize: unknown;
    poolSize: unknown;
} & {}>, {
    direction: unknown;
    poolSize: unknown;
}>;
export default _default;
