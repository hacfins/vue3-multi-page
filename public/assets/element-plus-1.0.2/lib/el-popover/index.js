'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ElPopper = require('../el-popper');
var directives = require('../directives');
var error = require('../utils/error');
var vnode = require('../utils/vnode');
var util = require('../utils/util');
var PopupManager = require('../utils/popup-manager');
var dom = require('../utils/dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElPopper__default = /*#__PURE__*/_interopDefaultLegacy(ElPopper);
var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);

const SHOW_EVENT = 'show';
const HIDE_EVENT = 'hide';
function usePopover(props, ctx) {
    const zIndex = vue.ref(PopupManager__default['default'].nextZIndex());
    const width = vue.computed(() => {
        if (util.isString(props.width)) {
            return props.width;
        }
        return props.width + 'px';
    });
    const popperStyle = vue.computed(() => {
        return {
            width: width.value,
            zIndex: zIndex.value,
        };
    });
    const popperProps = ElPopper.usePopper(props, ctx);
    vue.watch(popperProps.visibility, val => {
        if (val) {
            zIndex.value = PopupManager__default['default'].nextZIndex();
        }
        ctx.emit(val ? SHOW_EVENT : HIDE_EVENT);
    });
    return Object.assign(Object.assign({}, popperProps), { popperStyle });
}

const emits = ['update:visible', 'after-enter', 'after-leave', SHOW_EVENT, HIDE_EVENT];
const NAME = 'ElPopover';
const _hoist = { key: 0, class: 'el-popover__title', role: 'title' };
var script = vue.defineComponent({
    name: NAME,
    components: {
        ElPopper: ElPopper__default['default'],
    },
    props: Object.assign(Object.assign({}, ElPopper.defaultProps), { content: {
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
            error.warn(NAME, `
        You cannot init popover without given reference
      `);
        }
        const states = usePopover(props, ctx);
        return states;
    },
    render() {
        const { $slots } = this;
        const trigger = $slots.reference ? $slots.reference() : null;
        const title = vnode.renderIf(this.title, 'div', _hoist, vue.toDisplayString(this.title), vnode.PatchFlags.TEXT);
        const content = vue.renderSlot($slots, 'default', {}, () => [vue.createTextVNode(vue.toDisplayString(this.content), vnode.PatchFlags.TEXT)]);
        const { events, onAfterEnter, onAfterLeave, onPopperMouseEnter, onPopperMouseLeave, popperStyle, popperId, popperClass, showArrow, transition, visibility, tabindex, } = this;
        const kls = [
            this.content ? 'el-popover--plain' : '',
            'el-popover',
            popperClass,
        ].join(' ');
        let popover = ElPopper.renderPopper({
            effect: ElPopper.Effect.LIGHT,
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
            ElPopper.renderArrow(showArrow),
        ]);
        const _trigger = trigger ? ElPopper.renderTrigger(trigger, Object.assign({ ariaDescribedby: popperId, ref: 'triggerRef', tabindex }, events)) : vue.createCommentVNode('v-if', true);
        return vnode.renderBlock(vue.Fragment, null, [
            this.trigger === 'click'
                ? vue.withDirectives(_trigger, [[directives.ClickOutside, this.hide]])
                : _trigger,
            vue.createVNode(vue.Teleport, {
                disabled: !this.appendToBody,
                to: 'body',
            }, [popover], vnode.PatchFlags.PROPS, ['disabled']),
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
            dom.on(el, eventName.toLowerCase().slice(2), e);
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

exports.default = _Popover;
