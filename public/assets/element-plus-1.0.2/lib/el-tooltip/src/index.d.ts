import type { PropType } from 'vue';
import type { Effect, Placement, Options } from '../../el-popper';
declare const _default: import("vue").DefineComponent<{
    effect: {
        type: PropType<Effect>;
        default: Effect;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    enterable: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideAfter: {
        type: NumberConstructor;
        default: number;
    };
    manual: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: BooleanConstructor;
        validator: (val: unknown) => boolean;
        default: any;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    openDelay: {
        type: NumberConstructor;
        default: number;
    };
    placement: {
        type: PropType<Placement>;
        default: Placement;
    };
    popperOptions: {
        type: PropType<Options>;
        default: () => any;
    };
    showAfter: {
        type: NumberConstructor;
        default: number;
    };
    transition: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: PropType<string | string[]>;
        default: () => string[];
    };
    visibleArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    stopPopperMouseEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    popper: any;
    onUpdateVisible: (val: any) => void;
    updatePopper: () => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    class: unknown;
    effect: unknown;
    content: unknown;
    disabled: boolean;
    enterable: boolean;
    hideAfter: unknown;
    manual: boolean;
    modelValue: boolean;
    offset: unknown;
    openDelay: unknown;
    placement: unknown;
    popperOptions: unknown;
    showAfter: unknown;
    transition: unknown;
    trigger: unknown;
    visibleArrow: boolean;
    stopPopperMouseEvent: boolean;
} & {}>, {
    class: unknown;
    effect: unknown;
    content: unknown;
    disabled: boolean;
    enterable: boolean;
    hideAfter: unknown;
    manual: boolean;
    modelValue: boolean;
    offset: unknown;
    openDelay: unknown;
    placement: unknown;
    popperOptions: unknown;
    showAfter: unknown;
    transition: unknown;
    trigger: unknown;
    visibleArrow: boolean;
    stopPopperMouseEvent: boolean;
}>;
export default _default;
