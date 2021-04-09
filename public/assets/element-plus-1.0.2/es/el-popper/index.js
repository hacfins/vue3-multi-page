import { computed, ref, reactive, watch, createVNode, Transition, withCtx, withDirectives, vShow, cloneVNode, openBlock, createBlock, Comment, defineComponent, onMounted, onBeforeUnmount, onActivated, onDeactivated, renderSlot, toDisplayString, Fragment, Teleport } from 'vue';
import throwError from '../utils/error';
import { PatchFlags, getFirstValidNode, renderBlock } from '../utils/vnode';
import { createPopper } from '@popperjs/core';
import { generateId, isBool, isArray, isString, $, isHTMLElement } from '../utils/util';
import PopupManager from '../utils/popup-manager';
import { stop } from '../utils/dom';
import { ClickOutside } from '../directives';

function buildModifier(props, externalModifiers = []) {
    const { arrow, arrowOffset, offset, gpuAcceleration, } = props;
    const modifiers = [
        {
            name: 'offset',
            options: {
                offset: [0, offset !== null && offset !== void 0 ? offset : 12],
            },
        },
        {
            name: 'preventOverflow',
            options: {
                padding: {
                    top: 2,
                    bottom: 2,
                    left: 5,
                    right: 5,
                },
            },
        },
        {
            name: 'flip',
            options: {
                padding: 5,
            },
        },
        {
            name: 'computeStyles',
            options: {
                gpuAcceleration,
                adaptive: gpuAcceleration,
            },
        },
    ];
    if (arrow) {
        modifiers.push({
            name: 'arrow',
            options: {
                element: arrow,
                padding: arrowOffset !== null && arrowOffset !== void 0 ? arrowOffset : 5,
            },
        });
    }
    modifiers.push(...(externalModifiers));
    return modifiers;
}

function usePopperOptions(props, state) {
    return computed(() => {
        var _a;
        return Object.assign(Object.assign({ placement: props.placement }, props.popperOptions), { modifiers: buildModifier({
                arrow: state.arrow.value,
                arrowOffset: props.arrowOffset,
                offset: props.offset,
                gpuAcceleration: props.gpuAcceleration,
            }, (_a = props.popperOptions) === null || _a === void 0 ? void 0 : _a.modifiers) });
    });
}

var Effect;
(function (Effect) {
    Effect["DARK"] = "dark";
    Effect["LIGHT"] = "light";
})(Effect || (Effect = {}));
const DEFAULT_TRIGGER = 'hover';
var defaultProps = {
    arrowOffset: {
        type: Number,
        default: 5,
    },
    appendToBody: {
        type: Boolean,
        default: true,
    },
    autoClose: {
        type: Number,
        default: 0,
    },
    boundariesPadding: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
        default: '',
    },
    class: {
        type: String,
        default: '',
    },
    style: Object,
    hideAfter: {
        type: Number,
        default: 200,
    },
    cutoff: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    effect: {
        type: String,
        default: Effect.DARK,
    },
    enterable: {
        type: Boolean,
        default: true,
    },
    manualMode: {
        type: Boolean,
        default: false,
    },
    showAfter: {
        type: Number,
        default: 0,
    },
    offset: {
        type: Number,
        default: 12,
    },
    placement: {
        type: String,
        default: 'bottom',
    },
    popperClass: {
        type: String,
        default: '',
    },
    pure: {
        type: Boolean,
        default: false,
    },
    popperOptions: {
        type: Object,
        default: () => null,
    },
    showArrow: {
        type: Boolean,
        default: true,
    },
    strategy: {
        type: String,
        default: 'fixed',
    },
    transition: {
        type: String,
        default: 'el-fade-in-linear',
    },
    trigger: {
        type: [String, Array],
        default: DEFAULT_TRIGGER,
    },
    visible: {
        type: Boolean,
        default: undefined,
    },
    stopPopperMouseEvent: {
        type: Boolean,
        default: true,
    },
    gpuAcceleration: {
        type: Boolean,
        default: true,
    },
};

const UPDATE_VISIBLE_EVENT = 'update:visible';
function usePopper (props, { emit }) {
    const arrowRef = ref(null);
    const triggerRef = ref(null);
    const popperRef = ref(null);
    const popperId = `el-popper-${generateId()}`;
    let popperInstance = null;
    let showTimer = null;
    let hideTimer = null;
    let triggerFocused = false;
    const isManualMode = () => props.manualMode || props.trigger === 'manual';
    const popperStyle = ref({ zIndex: PopupManager.nextZIndex() });
    const popperOptions = usePopperOptions(props, {
        arrow: arrowRef,
    });
    const state = reactive({
        visible: !!props.visible,
    });
    const visibility = computed({
        get() {
            if (props.disabled) {
                return false;
            }
            else {
                return isBool(props.visible) ? props.visible : state.visible;
            }
        },
        set(val) {
            if (isManualMode())
                return;
            isBool(props.visible)
                ? emit(UPDATE_VISIBLE_EVENT, val)
                : (state.visible = val);
        },
    });
    function _show() {
        if (props.autoClose > 0) {
            hideTimer = window.setTimeout(() => {
                _hide();
            }, props.autoClose);
        }
        visibility.value = true;
    }
    function _hide() {
        visibility.value = false;
    }
    function clearTimers() {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
    }
    const show = () => {
        if (isManualMode() || props.disabled)
            return;
        clearTimers();
        if (props.showAfter === 0) {
            _show();
        }
        else {
            showTimer = window.setTimeout(() => {
                _show();
            }, props.showAfter);
        }
    };
    const hide = () => {
        if (isManualMode())
            return;
        clearTimers();
        if (props.hideAfter > 0) {
            hideTimer = window.setTimeout(() => {
                close();
            }, props.hideAfter);
        }
        else {
            close();
        }
    };
    const close = () => {
        _hide();
        if (props.disabled) {
            doDestroy(true);
        }
    };
    function onPopperMouseEnter() {
        if (props.enterable && props.trigger !== 'click') {
            clearTimeout(hideTimer);
        }
    }
    function onPopperMouseLeave() {
        const { trigger } = props;
        const shouldPrevent = (isString(trigger) && (trigger === 'click' || trigger === 'focus')) ||
            (trigger.length === 1 &&
                (trigger[0] === 'click' || trigger[0] === 'focus'));
        if (shouldPrevent)
            return;
        hide();
    }
    function initializePopper() {
        if (!$(visibility)) {
            return;
        }
        const unwrappedTrigger = $(triggerRef);
        const _trigger = isHTMLElement(unwrappedTrigger)
            ? unwrappedTrigger
            : unwrappedTrigger.$el;
        popperInstance = createPopper(_trigger, $(popperRef), $(popperOptions));
        popperInstance.update();
    }
    function doDestroy(forceDestroy) {
        if (!popperInstance || ($(visibility) && !forceDestroy))
            return;
        detachPopper();
    }
    function detachPopper() {
        var _a;
        (_a = popperInstance === null || popperInstance === void 0 ? void 0 : popperInstance.destroy) === null || _a === void 0 ? void 0 : _a.call(popperInstance);
        popperInstance = null;
    }
    const events = {};
    function update() {
        if (!$(visibility)) {
            return;
        }
        if (popperInstance) {
            popperInstance.update();
        }
        else {
            initializePopper();
        }
    }
    function onVisibilityChange(toState) {
        if (toState) {
            popperStyle.value.zIndex = PopupManager.nextZIndex();
            initializePopper();
        }
    }
    if (!isManualMode()) {
        const toggleState = () => {
            if ($(visibility)) {
                hide();
            }
            else {
                show();
            }
        };
        const popperEventsHandler = (e) => {
            e.stopPropagation();
            switch (e.type) {
                case 'click': {
                    if (triggerFocused) {
                        triggerFocused = false;
                    }
                    else {
                        toggleState();
                    }
                    break;
                }
                case 'mouseenter': {
                    show();
                    break;
                }
                case 'mouseleave': {
                    hide();
                    break;
                }
                case 'focus': {
                    triggerFocused = true;
                    show();
                    break;
                }
                case 'blur': {
                    triggerFocused = false;
                    hide();
                    break;
                }
            }
        };
        const triggerEventsMap = {
            click: ['onClick'],
            hover: ['onMouseenter', 'onMouseleave'],
            focus: ['onFocus', 'onBlur'],
        };
        const mapEvents = (t) => {
            triggerEventsMap[t].forEach(event => {
                events[event] = popperEventsHandler;
            });
        };
        if (isArray(props.trigger)) {
            Object.values(props.trigger).map(mapEvents);
        }
        else {
            mapEvents(props.trigger);
        }
    }
    watch(popperOptions, val => {
        if (!popperInstance)
            return;
        popperInstance.setOptions(val);
        popperInstance.update();
    });
    watch(visibility, onVisibilityChange);
    return {
        update,
        doDestroy,
        show,
        hide,
        onPopperMouseEnter,
        onPopperMouseLeave,
        onAfterEnter: () => {
            emit('after-enter');
        },
        onAfterLeave: () => {
            detachPopper();
            emit('after-leave');
        },
        onBeforeEnter: () => {
            emit('before-enter');
        },
        onBeforeLeave: () => {
            emit('before-leave');
        },
        initializePopper,
        isManualMode,
        arrowRef,
        events,
        popperId,
        popperInstance,
        popperRef,
        popperStyle,
        triggerRef,
        visibility,
    };
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
const NOOP = () => { };

function renderPopper(props, children) {
    const { effect, name, stopPopperMouseEvent, popperClass, popperStyle, popperRef, pure, popperId, visibility, onMouseenter, onMouseleave, onAfterEnter, onAfterLeave, onBeforeEnter, onBeforeLeave, } = props;
    const kls = [
        popperClass,
        'el-popper',
        'is-' + effect,
        pure ? 'is-pure' : '',
    ];
    const mouseUpAndDown = stopPopperMouseEvent ? stop : NOOP;
    return createVNode(Transition, {
        name,
        'onAfterEnter': onAfterEnter,
        'onAfterLeave': onAfterLeave,
        'onBeforeEnter': onBeforeEnter,
        'onBeforeLeave': onBeforeLeave,
    }, {
        default: withCtx(() => [withDirectives(createVNode('div', {
                'aria-hidden': String(!visibility),
                class: kls,
                style: popperStyle !== null && popperStyle !== void 0 ? popperStyle : {},
                id: popperId,
                ref: popperRef !== null && popperRef !== void 0 ? popperRef : 'popperRef',
                role: 'tooltip',
                onMouseenter,
                onMouseleave,
                onClick: stop,
                onMousedown: mouseUpAndDown,
                onMouseup: mouseUpAndDown,
            }, children, PatchFlags.CLASS | PatchFlags.STYLE | PatchFlags.PROPS | PatchFlags.HYDRATE_EVENTS, [
                'aria-hidden',
                'onMouseenter',
                'onMouseleave',
                'onMousedown',
                'onMouseup',
                'onClick',
                'id',
            ]), [[vShow, visibility]])]),
    }, PatchFlags.PROPS, ['name', 'onAfterEnter', 'onAfterLeave', 'onBeforeEnter', 'onBeforeLeave']);
}

function renderTrigger(trigger, extraProps) {
    const firstElement = getFirstValidNode(trigger, 1);
    if (!firstElement)
        throwError('renderTrigger', 'trigger expects single rooted node');
    return cloneVNode(firstElement, extraProps, true);
}

function renderArrow(showArrow) {
    return showArrow
        ? (openBlock(),
            createBlock('div', {
                ref: 'arrowRef',
                class: 'el-popper__arrow',
                'data-popper-arrow': '',
            }, null, PatchFlags.NEED_PATCH))
        : (openBlock(), createBlock(Comment, null, ''));
}

const compName = 'ElPopper';
const UPDATE_VISIBLE_EVENT$1 = 'update:visible';
var script = defineComponent({
    name: compName,
    props: defaultProps,
    emits: [UPDATE_VISIBLE_EVENT$1, 'after-enter', 'after-leave', 'before-enter', 'before-leave'],
    setup(props, ctx) {
        if (!ctx.slots.trigger) {
            throwError(compName, 'Trigger must be provided');
        }
        const popperStates = usePopper(props, ctx);
        const forceDestroy = () => popperStates.doDestroy(true);
        onMounted(popperStates.initializePopper);
        onBeforeUnmount(forceDestroy);
        onActivated(popperStates.initializePopper);
        onDeactivated(forceDestroy);
        return popperStates;
    },
    render() {
        var _a;
        const { $slots, appendToBody, class: kls, style, effect, hide, onPopperMouseEnter, onPopperMouseLeave, onAfterEnter, onAfterLeave, onBeforeEnter, onBeforeLeave, popperClass, popperId, popperStyle, pure, showArrow, transition, visibility, stopPopperMouseEvent, } = this;
        const isManual = this.isManualMode();
        const arrow = renderArrow(showArrow);
        const popper = renderPopper({
            effect,
            name: transition,
            popperClass,
            popperId,
            popperStyle,
            pure,
            stopPopperMouseEvent,
            onMouseenter: onPopperMouseEnter,
            onMouseleave: onPopperMouseLeave,
            onAfterEnter,
            onAfterLeave,
            onBeforeEnter,
            onBeforeLeave,
            visibility,
        }, [
            renderSlot($slots, 'default', {}, () => {
                return [toDisplayString(this.content)];
            }),
            arrow,
        ]);
        const _t = (_a = $slots.trigger) === null || _a === void 0 ? void 0 : _a.call($slots);
        const triggerProps = Object.assign({ ariaDescribedby: popperId, class: kls, style, ref: 'triggerRef' }, this.events);
        const trigger = isManual
            ? renderTrigger(_t, triggerProps)
            : withDirectives(renderTrigger(_t, triggerProps), [[ClickOutside, hide]]);
        return renderBlock(Fragment, null, [
            trigger,
            createVNode(Teleport, {
                to: 'body',
                disabled: !appendToBody,
            }, [popper], PatchFlags.PROPS, ['disabled']),
        ]);
    },
});

script.__file = "packages/popper/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Popper = script;

export default _Popper;
export { Effect, defaultProps, renderArrow, renderPopper, renderTrigger, usePopper };
