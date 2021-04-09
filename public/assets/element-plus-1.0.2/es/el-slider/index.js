import { inject, computed, nextTick, watch, ref, defineComponent, reactive, toRefs, resolveComponent, openBlock, createBlock, withKeys, withModifiers, createVNode, withCtx, toDisplayString, h, provide, onMounted, onBeforeUnmount, createCommentVNode, Fragment, renderList } from 'vue';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../utils/constants';
import { on, off } from '../utils/dom';
import throwError from '../utils/error';
import ElInputNumber from '../el-input-number';
import ElTooltip from '../el-tooltip';
import debounce from 'lodash/debounce';
import { elFormKey, elFormItemKey } from '../el-form';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const useTooltip = (props, formatTooltip, showTooltip) => {
    const tooltip = ref(null);
    const tooltipVisible = ref(false);
    const enableFormat = computed(() => {
        return formatTooltip.value instanceof Function;
    });
    const formatValue = computed(() => {
        return enableFormat.value && formatTooltip.value(props.modelValue) || props.modelValue;
    });
    const displayTooltip = debounce(() => {
        showTooltip.value && (tooltipVisible.value = true);
    }, 50);
    const hideTooltip = debounce(() => {
        showTooltip.value && (tooltipVisible.value = false);
    }, 50);
    return {
        tooltip,
        tooltipVisible,
        formatValue,
        displayTooltip,
        hideTooltip,
    };
};
const useSliderButton = (props, initData, emit) => {
    const { disabled, min, max, step, showTooltip, precision, sliderSize, formatTooltip, emitChange, resetSize, updateDragging, } = inject('SliderProvider');
    const { tooltip, tooltipVisible, formatValue, displayTooltip, hideTooltip, } = useTooltip(props, formatTooltip, showTooltip);
    const currentPosition = computed(() => {
        return `${(props.modelValue - min.value) / (max.value - min.value) * 100}%`;
    });
    const wrapperStyle = computed(() => {
        return (props.vertical ? { bottom: currentPosition.value } : { left: currentPosition.value });
    });
    const handleMouseEnter = () => {
        initData.hovering = true;
        displayTooltip();
    };
    const handleMouseLeave = () => {
        initData.hovering = false;
        if (!initData.dragging) {
            hideTooltip();
        }
    };
    const onButtonDown = (event) => {
        if (disabled.value)
            return;
        event.preventDefault();
        onDragStart(event);
        on(window, 'mousemove', onDragging);
        on(window, 'touchmove', onDragging);
        on(window, 'mouseup', onDragEnd);
        on(window, 'touchend', onDragEnd);
        on(window, 'contextmenu', onDragEnd);
    };
    const onLeftKeyDown = () => {
        if (disabled.value)
            return;
        initData.newPosition = parseFloat(currentPosition.value) - step.value / (max.value - min.value) * 100;
        setPosition(initData.newPosition);
        emitChange();
    };
    const onRightKeyDown = () => {
        if (disabled.value)
            return;
        initData.newPosition = parseFloat(currentPosition.value) + step.value / (max.value - min.value) * 100;
        setPosition(initData.newPosition);
        emitChange();
    };
    const getClientXY = (event) => {
        let clientX;
        let clientY;
        if (event.type.startsWith('touch')) {
            clientY = event.touches[0].clientY;
            clientX = event.touches[0].clientX;
        }
        else {
            clientY = event.clientY;
            clientX = event.clientX;
        }
        return {
            clientX,
            clientY,
        };
    };
    const onDragStart = (event) => {
        initData.dragging = true;
        initData.isClick = true;
        const { clientX, clientY, } = getClientXY(event);
        if (props.vertical) {
            initData.startY = clientY;
        }
        else {
            initData.startX = clientX;
        }
        initData.startPosition = parseFloat(currentPosition.value);
        initData.newPosition = initData.startPosition;
    };
    const onDragging = (event) => {
        if (initData.dragging) {
            initData.isClick = false;
            displayTooltip();
            resetSize();
            let diff;
            const { clientX, clientY, } = getClientXY(event);
            if (props.vertical) {
                initData.currentY = clientY;
                diff = (initData.startY - initData.currentY) / sliderSize.value * 100;
            }
            else {
                initData.currentX = clientX;
                diff = (initData.currentX - initData.startX) / sliderSize.value * 100;
            }
            initData.newPosition = initData.startPosition + diff;
            setPosition(initData.newPosition);
        }
    };
    const onDragEnd = () => {
        if (initData.dragging) {
            setTimeout(() => {
                initData.dragging = false;
                if (!initData.hovering) {
                    hideTooltip();
                }
                if (!initData.isClick) {
                    setPosition(initData.newPosition);
                    emitChange();
                }
            }, 0);
            off(window, 'mousemove', onDragging);
            off(window, 'touchmove', onDragging);
            off(window, 'mouseup', onDragEnd);
            off(window, 'touchend', onDragEnd);
            off(window, 'contextmenu', onDragEnd);
        }
    };
    const setPosition = (newPosition) => __awaiter(void 0, void 0, void 0, function* () {
        if (newPosition === null || isNaN(newPosition))
            return;
        if (newPosition < 0) {
            newPosition = 0;
        }
        else if (newPosition > 100) {
            newPosition = 100;
        }
        const lengthPerStep = 100 / ((max.value - min.value) / step.value);
        const steps = Math.round(newPosition / lengthPerStep);
        let value = steps * lengthPerStep * (max.value - min.value) * 0.01 + min.value;
        value = parseFloat(value.toFixed(precision.value));
        emit(UPDATE_MODEL_EVENT, value);
        if (!initData.dragging && props.modelValue !== initData.oldValue) {
            initData.oldValue = props.modelValue;
        }
        yield nextTick();
        initData.dragging && displayTooltip();
        tooltip.value.updatePopper();
    });
    watch(() => initData.dragging, val => {
        updateDragging(val);
    });
    return {
        tooltip,
        tooltipVisible,
        showTooltip,
        wrapperStyle,
        formatValue,
        handleMouseEnter,
        handleMouseLeave,
        onButtonDown,
        onLeftKeyDown,
        onRightKeyDown,
        setPosition,
    };
};

var script = defineComponent({
    name: 'ElSliderButton',
    components: {
        ElTooltip,
    },
    props: {
        modelValue: {
            type: Number,
            default: 0,
        },
        vertical: {
            type: Boolean,
            default: false,
        },
        tooltipClass: {
            type: String,
            default: '',
        },
    },
    emits: [UPDATE_MODEL_EVENT],
    setup(props, { emit }) {
        const initData = reactive({
            hovering: false,
            dragging: false,
            isClick: false,
            startX: 0,
            currentX: 0,
            startY: 0,
            currentY: 0,
            startPosition: 0,
            newPosition: 0,
            oldValue: props.modelValue,
        });
        const { tooltip, showTooltip, tooltipVisible, wrapperStyle, formatValue, handleMouseEnter, handleMouseLeave, onButtonDown, onLeftKeyDown, onRightKeyDown, setPosition, } = useSliderButton(props, initData, emit);
        const { hovering, dragging } = toRefs(initData);
        return {
            tooltip,
            tooltipVisible,
            showTooltip,
            wrapperStyle,
            formatValue,
            handleMouseEnter,
            handleMouseLeave,
            onButtonDown,
            onLeftKeyDown,
            onRightKeyDown,
            setPosition,
            hovering,
            dragging,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");

  return (openBlock(), createBlock("div", {
    ref: "button",
    class: ["el-slider__button-wrapper", { hover: _ctx.hovering, dragging: _ctx.dragging }],
    style: _ctx.wrapperStyle,
    tabindex: "0",
    onMouseenter: _cache[2] || (_cache[2] = (...args) => (_ctx.handleMouseEnter && _ctx.handleMouseEnter(...args))),
    onMouseleave: _cache[3] || (_cache[3] = (...args) => (_ctx.handleMouseLeave && _ctx.handleMouseLeave(...args))),
    onMousedown: _cache[4] || (_cache[4] = (...args) => (_ctx.onButtonDown && _ctx.onButtonDown(...args))),
    onTouchstart: _cache[5] || (_cache[5] = (...args) => (_ctx.onButtonDown && _ctx.onButtonDown(...args))),
    onFocus: _cache[6] || (_cache[6] = (...args) => (_ctx.handleMouseEnter && _ctx.handleMouseEnter(...args))),
    onBlur: _cache[7] || (_cache[7] = (...args) => (_ctx.handleMouseLeave && _ctx.handleMouseLeave(...args))),
    onKeydown: [
      _cache[8] || (_cache[8] = withKeys((...args) => (_ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args)), ["left"])),
      _cache[9] || (_cache[9] = withKeys((...args) => (_ctx.onRightKeyDown && _ctx.onRightKeyDown(...args)), ["right"])),
      _cache[10] || (_cache[10] = withKeys(withModifiers((...args) => (_ctx.onLeftKeyDown && _ctx.onLeftKeyDown(...args)), ["prevent"]), ["down"])),
      _cache[11] || (_cache[11] = withKeys(withModifiers((...args) => (_ctx.onRightKeyDown && _ctx.onRightKeyDown(...args)), ["prevent"]), ["up"]))
    ]
  }, [
    createVNode(_component_el_tooltip, {
      ref: "tooltip",
      modelValue: _ctx.tooltipVisible,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.tooltipVisible = $event)),
      placement: "top",
      "stop-popper-mouse-event": false,
      "popper-class": _ctx.tooltipClass,
      disabled: !_ctx.showTooltip,
      manual: ""
    }, {
      content: withCtx(() => [
        createVNode("span", null, toDisplayString(_ctx.formatValue), 1 /* TEXT */)
      ]),
      default: withCtx(() => [
        createVNode("div", {
          class: ["el-slider__button", { hover: _ctx.hovering, dragging: _ctx.dragging }]
        }, null, 2 /* CLASS */)
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "popper-class", "disabled"])
  ], 38 /* CLASS, STYLE, HYDRATE_EVENTS */))
}

script.render = render;
script.__file = "packages/slider/src/button.vue";

var script$1 = defineComponent({
    name: 'ElMarker',
    props: {
        mark: {
            type: [String, Object],
            default: () => undefined,
        },
    },
    setup(props) {
        const label = computed(() => {
            return typeof props.mark === 'string' ? props.mark : props.mark.label;
        });
        return {
            label,
        };
    },
    render() {
        var _a;
        return h('div', {
            class: 'el-slider__marks-text',
            style: (_a = this.mark) === null || _a === void 0 ? void 0 : _a.style,
        }, this.label);
    },
});

script$1.__file = "packages/slider/src/marker.vue";

const useMarks = (props) => {
    return computed(() => {
        if (!props.marks) {
            return [];
        }
        const marksKeys = Object.keys(props.marks);
        return marksKeys.map(parseFloat)
            .sort((a, b) => a - b)
            .filter(point => point <= props.max && point >= props.min)
            .map((point) => ({
            point,
            position: (point - props.min) * 100 / (props.max - props.min),
            mark: props.marks[point],
        }));
    });
};

const useSlide = (props, initData, emit) => {
    const elForm = inject(elFormKey, {});
    const elFormItem = inject(elFormItemKey, {});
    const slider = ref(null);
    const firstButton = ref(null);
    const secondButton = ref(null);
    const buttonRefs = {
        firstButton,
        secondButton,
    };
    const sliderDisabled = computed(() => {
        return props.disabled || (elForm.disabled || false);
    });
    const minValue = computed(() => {
        return Math.min(initData.firstValue, initData.secondValue);
    });
    const maxValue = computed(() => {
        return Math.max(initData.firstValue, initData.secondValue);
    });
    const barSize = computed(() => {
        return props.range
            ? `${100 * (maxValue.value - minValue.value) / (props.max - props.min)}%`
            : `${100 * (initData.firstValue - props.min) / (props.max - props.min)}%`;
    });
    const barStart = computed(() => {
        return props.range
            ? `${100 * (minValue.value - props.min) / (props.max - props.min)}%`
            : '0%';
    });
    const runwayStyle = computed(() => {
        return (props.vertical ? { height: props.height } : {});
    });
    const barStyle = computed(() => {
        return (props.vertical
            ? {
                height: barSize.value,
                bottom: barStart.value,
            } : {
            width: barSize.value,
            left: barStart.value,
        });
    });
    const resetSize = () => {
        if (slider.value) {
            initData.sliderSize = slider.value[`client${props.vertical ? 'Height' : 'Width'}`];
        }
    };
    const setPosition = (percent) => {
        const targetValue = props.min + percent * (props.max - props.min) / 100;
        if (!props.range) {
            firstButton.value.setPosition(percent);
            return;
        }
        let buttonRefName;
        if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
            buttonRefName = initData.firstValue < initData.secondValue ? 'firstButton' : 'secondButton';
        }
        else {
            buttonRefName = initData.firstValue > initData.secondValue ? 'firstButton' : 'secondButton';
        }
        buttonRefs[buttonRefName].value.setPosition(percent);
    };
    const emitChange = () => __awaiter(void 0, void 0, void 0, function* () {
        yield nextTick();
        emit(CHANGE_EVENT, props.range ? [minValue.value, maxValue.value] : props.modelValue);
    });
    const onSliderClick = (event) => {
        if (sliderDisabled.value || initData.dragging)
            return;
        resetSize();
        if (props.vertical) {
            const sliderOffsetBottom = slider.value.getBoundingClientRect().bottom;
            setPosition((sliderOffsetBottom - event.clientY) / initData.sliderSize * 100);
        }
        else {
            const sliderOffsetLeft = slider.value.getBoundingClientRect().left;
            setPosition((event.clientX - sliderOffsetLeft) / initData.sliderSize * 100);
        }
        emitChange();
    };
    return {
        elFormItem,
        slider,
        firstButton,
        secondButton,
        sliderDisabled,
        minValue,
        maxValue,
        runwayStyle,
        barStyle,
        resetSize,
        setPosition,
        emitChange,
        onSliderClick,
    };
};

const useStops = (props, initData, minValue, maxValue) => {
    const stops = computed(() => {
        if (!props.showStops || props.min > props.max)
            return [];
        if (props.step === 0) {
            process.env.NODE_ENV !== 'production' && console.warn('[Element Warn][Slider]step should not be 0.');
            return [];
        }
        const stopCount = (props.max - props.min) / props.step;
        const stepWidth = 100 * props.step / (props.max - props.min);
        const result = Array.from({ length: stopCount - 1 }).map((_, index) => ((index + 1) * stepWidth));
        if (props.range) {
            return result.filter(step => {
                return step < 100 * (minValue.value - props.min) / (props.max - props.min)
                    || step > 100 * (maxValue.value - props.min) / (props.max - props.min);
            });
        }
        else {
            return result.filter(step => step > 100 * (initData.firstValue - props.min) / (props.max - props.min));
        }
    });
    const getStopStyle = (position) => {
        return (props.vertical ? { 'bottom': position + '%' } : { 'left': position + '%' });
    };
    return {
        stops,
        getStopStyle,
    };
};

var script$2 = defineComponent({
    name: 'ElSlider',
    components: {
        ElInputNumber,
        SliderButton: script,
        SliderMarker: script$1,
    },
    props: {
        modelValue: {
            type: [Number, Array],
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        showInput: {
            type: Boolean,
            default: false,
        },
        showInputControls: {
            type: Boolean,
            default: true,
        },
        inputSize: {
            type: String,
            default: 'small',
        },
        showStops: {
            type: Boolean,
            default: false,
        },
        showTooltip: {
            type: Boolean,
            default: true,
        },
        formatTooltip: {
            type: Function,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        range: {
            type: Boolean,
            default: false,
        },
        vertical: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '',
        },
        debounce: {
            type: Number,
            default: 300,
        },
        label: {
            type: String,
            default: undefined,
        },
        tooltipClass: {
            type: String,
            default: undefined,
        },
        marks: Object,
    },
    emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
    setup(props, { emit }) {
        const initData = reactive({
            firstValue: 0,
            secondValue: 0,
            oldValue: 0,
            dragging: false,
            sliderSize: 1,
        });
        const { elFormItem, slider, firstButton, secondButton, sliderDisabled, minValue, maxValue, runwayStyle, barStyle, resetSize, emitChange, onSliderClick, } = useSlide(props, initData, emit);
        const { stops, getStopStyle, } = useStops(props, initData, minValue, maxValue);
        const markList = useMarks(props);
        useWatch(props, initData, minValue, maxValue, emit, elFormItem);
        const precision = computed(() => {
            let precisions = [props.min, props.max, props.step].map(item => {
                let decimal = ('' + item).split('.')[1];
                return decimal ? decimal.length : 0;
            });
            return Math.max.apply(null, precisions);
        });
        const { sliderWrapper } = useLifecycle(props, initData, resetSize);
        const { firstValue, secondValue, oldValue, dragging, sliderSize, } = toRefs(initData);
        const updateDragging = (val) => {
            initData.dragging = val;
        };
        provide('SliderProvider', Object.assign(Object.assign({}, toRefs(props)), { sliderSize, disabled: sliderDisabled, precision: precision, emitChange: emitChange, resetSize: resetSize, updateDragging: updateDragging }));
        return {
            firstValue,
            secondValue,
            oldValue,
            dragging,
            sliderSize,
            slider,
            firstButton,
            secondButton,
            sliderDisabled,
            runwayStyle,
            barStyle,
            emitChange,
            onSliderClick,
            getStopStyle,
            stops,
            markList,
            sliderWrapper,
        };
    },
});
const useWatch = (props, initData, minValue, maxValue, emit, elFormItem) => {
    const _emit = (val) => {
        emit(UPDATE_MODEL_EVENT, val);
    };
    const valueChanged = () => {
        if (props.range) {
            return ![minValue.value, maxValue.value]
                .every((item, index) => item === initData.oldValue[index]);
        }
        else {
            return props.modelValue !== initData.oldValue;
        }
    };
    const setValues = () => {
        var _a, _b;
        if (props.min > props.max) {
            throwError('Slider', 'min should not be greater than max.');
            return;
        }
        const val = props.modelValue;
        if (props.range && Array.isArray(val)) {
            if (val[1] < props.min) {
                _emit([props.min, props.min]);
            }
            else if (val[0] > props.max) {
                _emit([props.max, props.max]);
            }
            else if (val[0] < props.min) {
                _emit([props.min, val[1]]);
            }
            else if (val[1] > props.max) {
                _emit([val[0], props.max]);
            }
            else {
                initData.firstValue = val[0];
                initData.secondValue = val[1];
                if (valueChanged()) {
                    (_a = elFormItem.formItemMitt) === null || _a === void 0 ? void 0 : _a.emit('el.form.change', [minValue.value, maxValue.value]);
                    initData.oldValue = val.slice();
                }
            }
        }
        else if (!props.range && typeof val === 'number' && !isNaN(val)) {
            if (val < props.min) {
                _emit(props.min);
            }
            else if (val > props.max) {
                _emit(props.max);
            }
            else {
                initData.firstValue = val;
                if (valueChanged()) {
                    (_b = elFormItem.formItemMitt) === null || _b === void 0 ? void 0 : _b.emit('el.form.change', val);
                    initData.oldValue = val;
                }
            }
        }
    };
    setValues();
    watch(() => initData.dragging, val => {
        if (!val) {
            setValues();
        }
    });
    watch(() => initData.firstValue, val => {
        if (props.range) {
            _emit([minValue.value, maxValue.value]);
        }
        else {
            _emit(val);
        }
    });
    watch(() => initData.secondValue, () => {
        if (props.range) {
            _emit([minValue.value, maxValue.value]);
        }
    });
    watch(() => props.modelValue, (val, oldVal) => {
        if (initData.dragging
            || Array.isArray(val)
                && Array.isArray(oldVal)
                && val.every((item, index) => item === oldVal[index])) {
            return;
        }
        setValues();
    });
    watch(() => [props.min, props.max], () => {
        setValues();
    });
};
const useLifecycle = (props, initData, resetSize) => {
    const sliderWrapper = ref(null);
    onMounted(() => __awaiter(void 0, void 0, void 0, function* () {
        let valuetext;
        if (props.range) {
            if (Array.isArray(props.modelValue)) {
                initData.firstValue = Math.max(props.min, props.modelValue[0]);
                initData.secondValue = Math.min(props.max, props.modelValue[1]);
            }
            else {
                initData.firstValue = props.min;
                initData.secondValue = props.max;
            }
            initData.oldValue = [initData.firstValue, initData.secondValue];
            valuetext = `${initData.firstValue}-${initData.secondValue}`;
        }
        else {
            if (typeof props.modelValue !== 'number' || isNaN(props.modelValue)) {
                initData.firstValue = props.min;
            }
            else {
                initData.firstValue = Math.min(props.max, Math.max(props.min, props.modelValue));
            }
            initData.oldValue = initData.firstValue;
            valuetext = initData.firstValue;
        }
        sliderWrapper.value.setAttribute('aria-valuetext', valuetext);
        sliderWrapper.value.setAttribute('aria-label', props.label ? props.label : `slider between ${props.min} and ${props.max}`);
        on(window, 'resize', resetSize);
        yield nextTick();
        resetSize();
    }));
    onBeforeUnmount(() => {
        off(window, 'resize', resetSize);
    });
    return {
        sliderWrapper,
    };
};

const _hoisted_1 = { key: 1 };
const _hoisted_2 = { class: "el-slider__marks" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_slider_button = resolveComponent("slider-button");
  const _component_slider_marker = resolveComponent("slider-marker");

  return (openBlock(), createBlock("div", {
    ref: "sliderWrapper",
    class: ["el-slider", { 'is-vertical': _ctx.vertical, 'el-slider--with-input': _ctx.showInput }],
    role: "slider",
    "aria-valuemin": _ctx.min,
    "aria-valuemax": _ctx.max,
    "aria-orientation": _ctx.vertical ? 'vertical': 'horizontal',
    "aria-disabled": _ctx.sliderDisabled
  }, [
    (_ctx.showInput && !_ctx.range)
      ? (openBlock(), createBlock(_component_el_input_number, {
          key: 0,
          ref: "input",
          modelValue: _ctx.firstValue,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.firstValue = $event)),
          class: "el-slider__input",
          step: _ctx.step,
          disabled: _ctx.sliderDisabled,
          controls: _ctx.showInputControls,
          min: _ctx.min,
          max: _ctx.max,
          debounce: _ctx.debounce,
          size: _ctx.inputSize,
          onChange: _ctx.emitChange
        }, null, 8 /* PROPS */, ["modelValue", "step", "disabled", "controls", "min", "max", "debounce", "size", "onChange"]))
      : createCommentVNode("v-if", true),
    createVNode("div", {
      ref: "slider",
      class: ["el-slider__runway", { 'show-input': _ctx.showInput, 'disabled': _ctx.sliderDisabled }],
      style: _ctx.runwayStyle,
      onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.onSliderClick && _ctx.onSliderClick(...args)))
    }, [
      createVNode("div", {
        class: "el-slider__bar",
        style: _ctx.barStyle
      }, null, 4 /* STYLE */),
      createVNode(_component_slider_button, {
        ref: "firstButton",
        modelValue: _ctx.firstValue,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (_ctx.firstValue = $event)),
        vertical: _ctx.vertical,
        "tooltip-class": _ctx.tooltipClass
      }, null, 8 /* PROPS */, ["modelValue", "vertical", "tooltip-class"]),
      (_ctx.range)
        ? (openBlock(), createBlock(_component_slider_button, {
            key: 0,
            ref: "secondButton",
            modelValue: _ctx.secondValue,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => (_ctx.secondValue = $event)),
            vertical: _ctx.vertical,
            "tooltip-class": _ctx.tooltipClass
          }, null, 8 /* PROPS */, ["modelValue", "vertical", "tooltip-class"]))
        : createCommentVNode("v-if", true),
      (_ctx.showStops)
        ? (openBlock(), createBlock("div", _hoisted_1, [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.stops, (item, key) => {
              return (openBlock(), createBlock("div", {
                key: key,
                class: "el-slider__stop",
                style: _ctx.getStopStyle(item)
              }, null, 4 /* STYLE */))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : createCommentVNode("v-if", true),
      (_ctx.markList.length > 0)
        ? (openBlock(), createBlock(Fragment, { key: 2 }, [
            createVNode("div", null, [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.markList, (item, key) => {
                return (openBlock(), createBlock("div", {
                  key: key,
                  style: _ctx.getStopStyle(item.position),
                  class: "el-slider__stop el-slider__marks-stop"
                }, null, 4 /* STYLE */))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            createVNode("div", _hoisted_2, [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.markList, (item, key) => {
                return (openBlock(), createBlock(_component_slider_marker, {
                  key: key,
                  mark: item.mark,
                  style: _ctx.getStopStyle(item.position)
                }, null, 8 /* PROPS */, ["mark", "style"]))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ], 64 /* STABLE_FRAGMENT */))
        : createCommentVNode("v-if", true)
    ], 6 /* CLASS, STYLE */)
  ], 10 /* CLASS, PROPS */, ["aria-valuemin", "aria-valuemax", "aria-orientation", "aria-disabled"]))
}

script$2.render = render$1;
script$2.__file = "packages/slider/src/index.vue";

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};
const _Slider = script$2;

export default _Slider;
