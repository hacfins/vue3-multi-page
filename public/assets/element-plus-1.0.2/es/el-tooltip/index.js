import { defineComponent, ref, h } from 'vue';
import ElPopper from '../el-popper';
import { UPDATE_MODEL_EVENT } from '../utils/constants';
import throwError from '../utils/error';

var Tooltip = defineComponent({
    name: 'ElTooltip',
    components: {
        ElPopper,
    },
    props: {
        effect: {
            type: String,
            default: 'dark',
        },
        class: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        enterable: {
            type: Boolean,
            default: true,
        },
        hideAfter: {
            type: Number,
            default: 200,
        },
        manual: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: Boolean,
            validator: (val) => {
                return typeof val === 'boolean';
            },
            default: undefined,
        },
        offset: {
            type: Number,
            default: 12,
        },
        openDelay: {
            type: Number,
            default: 0,
        },
        placement: {
            type: String,
            default: 'bottom',
        },
        popperOptions: {
            type: Object,
            default: () => null,
        },
        showAfter: {
            type: Number,
            default: 0,
        },
        transition: {
            type: String,
            default: 'el-fade-in-linear',
        },
        trigger: {
            type: [String, Array],
            default: () => ['hover'],
        },
        visibleArrow: {
            type: Boolean,
            default: true,
        },
        stopPopperMouseEvent: {
            type: Boolean,
            default: true,
        },
    },
    emits: [UPDATE_MODEL_EVENT],
    setup(props, ctx) {
        if (props.manual && typeof props.modelValue === 'undefined') {
            throwError('[ElTooltip]', 'You need to pass a v-model to el-tooltip when `manual` is true');
        }
        const popper = ref(null);
        const onUpdateVisible = val => {
            ctx.emit(UPDATE_MODEL_EVENT, val);
        };
        const updatePopper = () => {
            return popper.value.update();
        };
        return {
            popper,
            onUpdateVisible,
            updatePopper,
        };
    },
    render() {
        const { $slots, content, disabled, effect, enterable, hideAfter, manual, offset, openDelay, onUpdateVisible, placement, popperOptions, showAfter, transition, trigger, visibleArrow, stopPopperMouseEvent, } = this;
        const popper = h(ElPopper, {
            ref: 'popper',
            appendToBody: true,
            class: this.class,
            disabled,
            effect,
            enterable,
            hideAfter,
            manualMode: manual,
            offset,
            placement,
            showAfter: openDelay || showAfter,
            showArrow: visibleArrow,
            stopPopperMouseEvent,
            transition,
            trigger,
            popperOptions,
            visible: this.modelValue,
            'onUpdate:visible': onUpdateVisible,
        }, {
            default: () => ($slots.content ? $slots.content() : content),
            trigger: () => $slots.default(),
        });
        return popper;
    },
});

Tooltip.install = (app) => {
    app.component(Tooltip.name, Tooltip);
};
const _Tooltip = Tooltip;

export default _Tooltip;
