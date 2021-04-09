declare const _default: import("vue").DefineComponent<{
    native: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapStyle: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    wrapClass: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    viewClass: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    viewStyle: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    noresize: BooleanConstructor;
    tag: {
        type: StringConstructor;
        default: string;
    };
}, {
    moveX: import("vue").Ref<number>;
    moveY: import("vue").Ref<number>;
    sizeWidth: import("vue").Ref<string>;
    sizeHeight: import("vue").Ref<string>;
    style: import("vue").ComputedRef<unknown>;
    scrollbar: any;
    wrap: any;
    resize: any;
    update: () => void;
    handleScroll: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    native: boolean;
    wrapStyle: unknown;
    wrapClass: unknown;
    viewClass: unknown;
    viewStyle: unknown;
    noresize: boolean;
    tag: unknown;
} & {}>, {
    native: boolean;
    wrapStyle: unknown;
    wrapClass: unknown;
    viewClass: unknown;
    viewStyle: unknown;
    noresize: boolean;
    tag: unknown;
}>;
export default _default;
