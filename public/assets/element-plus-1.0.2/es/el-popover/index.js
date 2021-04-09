import { ref, computed, watch, defineComponent, toDisplayString, renderSlot, createTextVNode, createCommentVNode, Fragment, withDirectives, createVNode, Teleport } from 'vue';
import ElPopper, { usePopper, defaultProps, renderPopper, Effect, renderArrow, renderTrigger } from '../el-popper';
import { ClickOutside } from '../directives';
import { warn } from '../utils/error';
import { renderIf, PatchFlags, renderBlock } from '../utils/vnode';
import { isString } from '../utils/util';
import PopupManager from '../utils/popup-manager';
import { on } from '../utils/dom';

const SHOW_EVENT = 'show';
const HIDE_EVENT = 'hide';
function usePopover(props, ctx) {
    const zIndex = ref(PopupManager.nextZIndex());
    const width = computed(() => {
        if (isString(props.width)) {
            return props.width;
        }
        return props.width + 'px';
    });
    const popperStyle = computed(() => {
        return {
            width: width.value,
            zIndex: zIndex.value,
        };
    });
    const popperProps = usePopper(props, ctx);
    watch(popperProps.visibility, val => {
        if (val) {
            zIndex.value = PopupManager.nextZIndex();
        }
        ctx.emit(val ? SHOW_EVENT : HIDE_EVENT);
    });
    return Object.assign(Object.assign({}, popperProps), { popperStyle });
}

const emits = ['update:visible', 'after-enter', 'after-leave', SHOW_EVENT, HIDE_EVENT];
const NAME = 'ElPopover';
const _hoist = { key: 0, class: 'el-popover__title', role: 'title' };
var script = defineComponent({
    name: NAME,
    components: {
        ElPopper,
    },
    props: Object.assign(Object.assign({}, defaultProps), { content: {
            type: String,
        }, trigger: {
            type: String,
            default: 'click',
        }, title: {
            type: String,
        }, transition: {
            type: String,
            default: 'fade-in-linear',
        }, width: {
            type: [String, Number],
            default: 150,
        }, appendToBody: {
            type: Boolean,
            default: true,
        }, tabindex: Number }),
    emits,
    setup(props, ctx) {
        if (process.env.NODE_ENV !== 'production' && props.visible && !ctx.slots.reference) {
            warn(NAME, `
        You cannot init popover without given reference
      `);
        }
        const states = usePopover(props, ctx);
        return states;
    },
    render() {
        const { $slots } = this;
        const trigger = $slots.reference ? $slots.reference() : null;
        const title = renderIf(this.title, 'div', _hoist, toDisplayString(this.title), PatchFlags.TEXT);
        const content = renderSlot($slots, 'default', {}, () => [createTextVNode(toDisplayString(this.content), PatchFlags.TEXT)]);
        const { events, onAfterEnter, onAfterLeave, onPopperMouseEnter, onPopperMouseLeave, popperStyle, popperId, popperClass, showArrow, transition, visibility, tabindex, } = this;
        const kls = [
            this.content ? 'el-popover--plain' : '',
            'el-popover',
            popperClass,
        ].join(' ');
        let popover = renderPopper({
            effect: Effect.LIGHT,
            name: transition,
            popperClass: kls,
            popperStyle: popperStyle,
            popperId,
            visibility,
            onMouseenter: onPopperMouseEnter,
            onMouseleave: onPopperMouseLeave,
            onAfterEnter,
            onAfterLeave,
            stopPopperMouseEvent: false,
        }, [
            title,
            content,
            renderArrow(showArrow),
        ]);
        const _trigger = trigger ? renderTrigger(trigger, Object.assign({ ariaDescribedby: popperId, ref: 'triggerRef', tabindex }, events)) : createCommentVNode('v-if', true);
        return renderBlock(Fragment, null, [
            this.trigger === 'click'
                ? withDirectives(_trigger, [[ClickOutside, this.hide]])
                : _trigger,
            createVNode(Teleport, {
                disabled: !this.appendToBody,
                to: 'body',
            }, [popover], PatchFlags.PROPS, ['disabled']),
        ]);
    },
});

script.__file = "packages/popover/src/index.vue";

const attachEvents = (el, binding, vnode) => {
    const _ref = binding.arg || binding.value;
    const popover = vnode.dirs[0].instance.$refs[_ref];
    if (popover) {
        popover.triggerRef = el;
        el.setAttribute('tabindex', popover.tabindex);
        Object.entries(popover.events).map(([eventName, e]) => {
            on(el, eventName.toLowerCase().slice(2), e);
        });
    }
};
var PopoverDirective = {
    mounted(el, binding, vnode) {
        attachEvents(el, binding, vnode);
    },
    updated(el, binding, vnode) {
        attachEvents(el, binding, vnode);
    },
};
const VPopover = 'popover';

script.install = (app) => {
    app.component(script.name, script);
    app.directive(VPopover, PopoverDirective);
};
script.directive = PopoverDirective;
const _Popover = script;

export default _Popover;
