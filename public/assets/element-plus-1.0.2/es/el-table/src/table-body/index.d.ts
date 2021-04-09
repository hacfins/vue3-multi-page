import { PropType } from 'vue';
import { Store } from '../table.type';
declare const _default: import("vue").DefineComponent<{
    store: {
        required: true;
        type: PropType<Store>;
    };
    stripe: BooleanConstructor;
    tooltipEffect: StringConstructor;
    context: {
        default: () => {};
        type: ObjectConstructor;
    };
    rowClassName: (StringConstructor | FunctionConstructor)[];
    rowStyle: (ObjectConstructor | FunctionConstructor)[];
    fixed: {
        type: StringConstructor;
        default: string;
    };
    highlight: BooleanConstructor;
}, {
    onColumnsChange: (layout: import("../table.type").TableLayout) => void;
    onScrollableChange: (layout: import("../table.type").TableLayout) => void;
    wrappedRowRender: (row: any, $index: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    tooltipContent: import("vue").Ref<string>;
    tooltipTrigger: import("vue").Ref<import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    store: unknown;
    stripe: boolean;
    context: Record<string, any>;
    fixed: unknown;
    highlight: boolean;
} & {
    tooltipEffect?: unknown;
    rowClassName?: unknown;
    rowStyle?: unknown;
}>, {
    stripe: boolean;
    context: Record<string, any>;
    fixed: unknown;
    highlight: boolean;
}>;
export default _default;
