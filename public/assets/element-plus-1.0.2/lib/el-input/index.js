'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var hooks = require('../hooks');
var constants = require('../utils/constants');
var util = require('../utils/util');
var isServer = require('../utils/isServer');
var isDef = require('../utils/isDef');
var validators = require('../utils/validators');
var form = require('../el-form');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

let hiddenTextarea;
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
const CONTEXT_STYLE = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing',
];
function calculateNodeStyling(targetElement) {
    const style = window.getComputedStyle(targetElement);
    const boxSizing = style.getPropertyValue('box-sizing');
    const paddingSize = (parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top')));
    const borderSize = (parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width')));
    const contextStyle = CONTEXT_STYLE
        .map(name => `${name}:${style.getPropertyValue(name)}`)
        .join(';');
    return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows = null) {
    var _a;
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }
    const { paddingSize, borderSize, boxSizing, contextStyle, } = calculateNodeStyling(targetElement);
    hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';
    let height = hiddenTextarea.scrollHeight;
    const result = {};
    if (boxSizing === 'border-box') {
        height = height + borderSize;
    }
    else if (boxSizing === 'content-box') {
        height = height - paddingSize;
    }
    hiddenTextarea.value = '';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
        let minHeight = singleRowHeight * minRows;
        if (boxSizing === 'border-box') {
            minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
        result.minHeight = `${minHeight}px`;
    }
    if (maxRows !== null) {
        let maxHeight = singleRowHeight * maxRows;
        if (boxSizing === 'border-box') {
            maxHeight = maxHeight + paddingSize + borderSize;
        }
        height = Math.min(maxHeight, height);
    }
    result.height = `${height}px`;
    (_a = hiddenTextarea.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(hiddenTextarea);
    hiddenTextarea = null;
    return result;
}

const PENDANT_MAP = {
    suffix: 'append',
    prefix: 'prepend',
};
var script = vue.defineComponent({
    name: 'ElInput',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        size: {
            type: String,
            validator: validators.isValidComponentSize,
        },
        resize: {
            type: String,
            validator: (val) => ['none', 'both', 'horizontal', 'vertical'].includes(val),
        },
        autosize: {
            type: [Boolean, Object],
            default: false,
        },
        autocomplete: {
            type: String,
            default: 'off',
            validator: (val) => ['on', 'off'].includes(val),
        },
        placeholder: {
            type: String,
        },
        form: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        showPassword: {
            type: Boolean,
            default: false,
        },
        showWordLimit: {
            type: Boolean,
            default: false,
        },
        suffixIcon: {
            type: String,
            default: '',
        },
        prefixIcon: {
            type: String,
            default: '',
        },
        label: {
            type: String,
        },
        tabindex: {
            type: String,
        },
        validateEvent: {
            type: Boolean,
            default: true,
        },
    },
    emits: [constants.UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear',
        'mouseleave', 'mouseenter', 'keydown'],
    setup(props, ctx) {
        const instance = vue.getCurrentInstance();
        const attrs = hooks.useAttrs();
        const $ELEMENT = util.useGlobalConfig();
        const elForm = vue.inject(form.elFormKey, {});
        const elFormItem = vue.inject(form.elFormItemKey, {});
        const input = vue.ref(null);
        const textarea = vue.ref(null);
        const focused = vue.ref(false);
        const hovering = vue.ref(false);
        const isComposing = vue.ref(false);
        const passwordVisible = vue.ref(false);
        const _textareaCalcStyle = vue.shallowRef({});
        const inputOrTextarea = vue.computed(() => input.value || textarea.value);
        const inputSize = vue.computed(() => props.size || elFormItem.size || $ELEMENT.size);
        const needStatusIcon = vue.computed(() => elForm.statusIcon);
        const validateState = vue.computed(() => elFormItem.validateState || '');
        const validateIcon = vue.computed(() => constants.VALIDATE_STATE_MAP[validateState.value]);
        const textareaStyle = vue.computed(() => (Object.assign(Object.assign({}, _textareaCalcStyle.value), { resize: props.resize })));
        const inputDisabled = vue.computed(() => props.disabled || elForm.disabled);
        const nativeInputValue = vue.computed(() => (props.modelValue === null || props.modelValue === undefined) ? '' : String(props.modelValue));
        const upperLimit = vue.computed(() => ctx.attrs.maxlength);
        const showClear = vue.computed(() => {
            return props.clearable &&
                !inputDisabled.value &&
                !props.readonly &&
                nativeInputValue.value &&
                (focused.value || hovering.value);
        });
        const showPwdVisible = vue.computed(() => {
            return props.showPassword &&
                !inputDisabled.value &&
                !props.readonly &&
                (!!nativeInputValue.value || focused.value);
        });
        const isWordLimitVisible = vue.computed(() => {
            return props.showWordLimit &&
                ctx.attrs.maxlength &&
                (props.type === 'text' || props.type === 'textarea') &&
                !inputDisabled.value &&
                !props.readonly &&
                !props.showPassword;
        });
        const textLength = vue.computed(() => {
            return typeof props.modelValue === 'number' ? String(props.modelValue).length : (props.modelValue || '').length;
        });
        const inputExceed = vue.computed(() => {
            return isWordLimitVisible.value && (textLength.value > upperLimit.value);
        });
        const resizeTextarea = () => {
            const { type, autosize } = props;
            if (isServer__default['default'] || type !== 'textarea')
                return;
            if (autosize) {
                const minRows = util.isObject(autosize) ? autosize.minRows : void 0;
                const maxRows = util.isObject(autosize) ? autosize.maxRows : void 0;
                _textareaCalcStyle.value = calcTextareaHeight(textarea.value, minRows, maxRows);
            }
            else {
                _textareaCalcStyle.value = {
                    minHeight: calcTextareaHeight(textarea.value).minHeight,
                };
            }
        };
        const setNativeInputValue = () => {
            const input = inputOrTextarea.value;
            if (!input || input.value === nativeInputValue.value)
                return;
            input.value = nativeInputValue.value;
        };
        const calcIconOffset = place => {
            const { el } = instance.vnode;
            const elList = Array.from(el.querySelectorAll(`.el-input__${place}`));
            const target = elList.find(item => item.parentNode === el);
            if (!target)
                return;
            const pendant = PENDANT_MAP[place];
            if (ctx.slots[pendant]) {
                target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`;
            }
            else {
                target.removeAttribute('style');
            }
        };
        const updateIconOffset = () => {
            calcIconOffset('prefix');
            calcIconOffset('suffix');
        };
        const handleInput = event => {
            const { value } = event.target;
            if (isComposing.value)
                return;
            if (value === nativeInputValue.value)
                return;
            ctx.emit(constants.UPDATE_MODEL_EVENT, value);
            ctx.emit('input', value);
            vue.nextTick(setNativeInputValue);
        };
        const handleChange = event => {
            ctx.emit('change', event.target.value);
        };
        const focus = () => {
            vue.nextTick(() => {
                inputOrTextarea.value.focus();
            });
        };
        const blur = () => {
            inputOrTextarea.value.blur();
        };
        const handleFocus = event => {
            focused.value = true;
            ctx.emit('focus', event);
        };
        const handleBlur = event => {
            var _a;
            focused.value = false;
            ctx.emit('blur', event);
            if (props.validateEvent) {
                (_a = elFormItem.formItemMitt) === null || _a === void 0 ? void 0 : _a.emit('el.form.blur', [props.modelValue]);
            }
        };
        const select = () => {
            inputOrTextarea.value.select();
        };
        const handleCompositionStart = () => {
            isComposing.value = true;
        };
        const handleCompositionUpdate = event => {
            const text = event.target.value;
            const lastCharacter = text[text.length - 1] || '';
            isComposing.value = !isDef.isKorean(lastCharacter);
        };
        const handleCompositionEnd = event => {
            if (isComposing.value) {
                isComposing.value = false;
                handleInput(event);
            }
        };
        const clear = () => {
            ctx.emit(constants.UPDATE_MODEL_EVENT, '');
            ctx.emit('change', '');
            ctx.emit('clear');
        };
        const handlePasswordVisible = () => {
            passwordVisible.value = !passwordVisible.value;
            focus();
        };
        const getSuffixVisible = () => {
            return ctx.slots.suffix ||
                props.suffixIcon ||
                showClear.value ||
                props.showPassword ||
                isWordLimitVisible.value ||
                (validateState.value && needStatusIcon.value);
        };
        vue.watch(() => props.modelValue, val => {
            var _a;
            vue.nextTick(resizeTextarea);
            if (props.validateEvent) {
                (_a = elFormItem.formItemMitt) === null || _a === void 0 ? void 0 : _a.emit('el.form.change', [val]);
            }
        });
        vue.watch(nativeInputValue, () => {
            setNativeInputValue();
        });
        vue.watch(() => props.type, () => {
            vue.nextTick(() => {
                setNativeInputValue();
                resizeTextarea();
                updateIconOffset();
            });
        });
        vue.onMounted(() => {
            setNativeInputValue();
            updateIconOffset();
            vue.nextTick(resizeTextarea);
        });
        vue.onUpdated(() => {
            vue.nextTick(updateIconOffset);
        });
        const onMouseLeave = e => {
            hovering.value = false;
            ctx.emit('mouseleave', e);
        };
        const onMouseEnter = e => {
            hovering.value = true;
            ctx.emit('mouseenter', e);
        };
        const handleKeydown = e => {
            ctx.emit('keydown', e);
        };
        return {
            input,
            textarea,
            attrs,
            inputSize,
            validateState,
            validateIcon,
            textareaStyle,
            resizeTextarea,
            inputDisabled,
            showClear,
            showPwdVisible,
            isWordLimitVisible,
            upperLimit,
            textLength,
            hovering,
            inputExceed,
            passwordVisible,
            inputOrTextarea,
            handleInput,
            handleChange,
            handleFocus,
            handleBlur,
            handleCompositionStart,
            handleCompositionUpdate,
            handleCompositionEnd,
            handlePasswordVisible,
            clear,
            select,
            focus,
            blur,
            getSuffixVisible,
            onMouseLeave,
            onMouseEnter,
            handleKeydown,
        };
    },
});

const _hoisted_1 = {
  key: 0,
  class: "el-input-group__prepend"
};
const _hoisted_2 = {
  key: 2,
  class: "el-input__prefix"
};
const _hoisted_3 = {
  key: 3,
  class: "el-input__suffix"
};
const _hoisted_4 = { class: "el-input__suffix-inner" };
const _hoisted_5 = {
  key: 3,
  class: "el-input__count"
};
const _hoisted_6 = { class: "el-input__count-inner" };
const _hoisted_7 = {
  key: 4,
  class: "el-input-group__append"
};
const _hoisted_8 = {
  key: 2,
  class: "el-input__count"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", {
    class: [
      _ctx.type === 'textarea' ? 'el-textarea' : 'el-input',
      _ctx.inputSize ? 'el-input--' + _ctx.inputSize : '',
      {
        'is-disabled': _ctx.inputDisabled,
        'is-exceed': _ctx.inputExceed,
        'el-input-group': _ctx.$slots.prepend || _ctx.$slots.append,
        'el-input-group--append': _ctx.$slots.append,
        'el-input-group--prepend': _ctx.$slots.prepend,
        'el-input--prefix': _ctx.$slots.prefix || _ctx.prefixIcon,
        'el-input--suffix': _ctx.$slots.suffix || _ctx.suffixIcon || _ctx.clearable || _ctx.showPassword
      },
      _ctx.$attrs.class
    ],
    style: _ctx.$attrs.style,
    onMouseenter: _cache[19] || (_cache[19] = (...args) => (_ctx.onMouseEnter && _ctx.onMouseEnter(...args))),
    onMouseleave: _cache[20] || (_cache[20] = (...args) => (_ctx.onMouseLeave && _ctx.onMouseLeave(...args)))
  }, [
    (_ctx.type !== 'textarea')
      ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
          vue.createCommentVNode(" 前置元素 "),
          (_ctx.$slots.prepend)
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
                vue.renderSlot(_ctx.$slots, "prepend")
              ]))
            : vue.createCommentVNode("v-if", true),
          (_ctx.type !== 'textarea')
            ? (vue.openBlock(), vue.createBlock("input", vue.mergeProps({
                key: 1,
                ref: "input",
                class: "el-input__inner"
              }, _ctx.attrs, {
                type: _ctx.showPassword ? (_ctx.passwordVisible ? 'text': 'password') : _ctx.type,
                disabled: _ctx.inputDisabled,
                readonly: _ctx.readonly,
                autocomplete: _ctx.autocomplete,
                tabindex: _ctx.tabindex,
                "aria-label": _ctx.label,
                placeholder: _ctx.placeholder,
                onCompositionstart: _cache[1] || (_cache[1] = (...args) => (_ctx.handleCompositionStart && _ctx.handleCompositionStart(...args))),
                onCompositionupdate: _cache[2] || (_cache[2] = (...args) => (_ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args))),
                onCompositionend: _cache[3] || (_cache[3] = (...args) => (_ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args))),
                onInput: _cache[4] || (_cache[4] = (...args) => (_ctx.handleInput && _ctx.handleInput(...args))),
                onFocus: _cache[5] || (_cache[5] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
                onBlur: _cache[6] || (_cache[6] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
                onChange: _cache[7] || (_cache[7] = (...args) => (_ctx.handleChange && _ctx.handleChange(...args))),
                onKeydown: _cache[8] || (_cache[8] = (...args) => (_ctx.handleKeydown && _ctx.handleKeydown(...args)))
              }), null, 16 /* FULL_PROPS */, ["type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder"]))
            : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 前置内容 "),
          (_ctx.$slots.prefix || _ctx.prefixIcon)
            ? (vue.openBlock(), vue.createBlock("span", _hoisted_2, [
                vue.renderSlot(_ctx.$slots, "prefix"),
                (_ctx.prefixIcon)
                  ? (vue.openBlock(), vue.createBlock("i", {
                      key: 0,
                      class: ['el-input__icon', _ctx.prefixIcon]
                    }, null, 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 后置内容 "),
          (_ctx.getSuffixVisible())
            ? (vue.openBlock(), vue.createBlock("span", _hoisted_3, [
                vue.createVNode("span", _hoisted_4, [
                  (!_ctx.showClear || !_ctx.showPwdVisible || !_ctx.isWordLimitVisible)
                    ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                        vue.renderSlot(_ctx.$slots, "suffix"),
                        (_ctx.suffixIcon)
                          ? (vue.openBlock(), vue.createBlock("i", {
                              key: 0,
                              class: ['el-input__icon', _ctx.suffixIcon]
                            }, null, 2 /* CLASS */))
                          : vue.createCommentVNode("v-if", true)
                      ], 64 /* STABLE_FRAGMENT */))
                    : vue.createCommentVNode("v-if", true),
                  (_ctx.showClear)
                    ? (vue.openBlock(), vue.createBlock("i", {
                        key: 1,
                        class: "el-input__icon el-icon-circle-close el-input__clear",
                        onMousedown: _cache[9] || (_cache[9] = vue.withModifiers(() => {}, ["prevent"])),
                        onClick: _cache[10] || (_cache[10] = (...args) => (_ctx.clear && _ctx.clear(...args)))
                      }, null, 32 /* HYDRATE_EVENTS */))
                    : vue.createCommentVNode("v-if", true),
                  (_ctx.showPwdVisible)
                    ? (vue.openBlock(), vue.createBlock("i", {
                        key: 2,
                        class: "el-input__icon el-icon-view el-input__clear",
                        onClick: _cache[11] || (_cache[11] = (...args) => (_ctx.handlePasswordVisible && _ctx.handlePasswordVisible(...args)))
                      }))
                    : vue.createCommentVNode("v-if", true),
                  (_ctx.isWordLimitVisible)
                    ? (vue.openBlock(), vue.createBlock("span", _hoisted_5, [
                        vue.createVNode("span", _hoisted_6, vue.toDisplayString(_ctx.textLength) + "/" + vue.toDisplayString(_ctx.upperLimit), 1 /* TEXT */)
                      ]))
                    : vue.createCommentVNode("v-if", true)
                ]),
                (_ctx.validateState)
                  ? (vue.openBlock(), vue.createBlock("i", {
                      key: 0,
                      class: ['el-input__icon', 'el-input__validateIcon', _ctx.validateIcon]
                    }, null, 2 /* CLASS */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 后置元素 "),
          (_ctx.$slots.append)
            ? (vue.openBlock(), vue.createBlock("div", _hoisted_7, [
                vue.renderSlot(_ctx.$slots, "append")
              ]))
            : vue.createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      : (vue.openBlock(), vue.createBlock("textarea", vue.mergeProps({
          key: 1,
          ref: "textarea",
          class: "el-textarea__inner"
        }, _ctx.attrs, {
          tabindex: _ctx.tabindex,
          disabled: _ctx.inputDisabled,
          readonly: _ctx.readonly,
          autocomplete: _ctx.autocomplete,
          style: _ctx.textareaStyle,
          "aria-label": _ctx.label,
          placeholder: _ctx.placeholder,
          onCompositionstart: _cache[12] || (_cache[12] = (...args) => (_ctx.handleCompositionStart && _ctx.handleCompositionStart(...args))),
          onCompositionupdate: _cache[13] || (_cache[13] = (...args) => (_ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args))),
          onCompositionend: _cache[14] || (_cache[14] = (...args) => (_ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args))),
          onInput: _cache[15] || (_cache[15] = (...args) => (_ctx.handleInput && _ctx.handleInput(...args))),
          onFocus: _cache[16] || (_cache[16] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
          onBlur: _cache[17] || (_cache[17] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
          onChange: _cache[18] || (_cache[18] = (...args) => (_ctx.handleChange && _ctx.handleChange(...args)))
        }), "\n    ", 16 /* FULL_PROPS */, ["tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder"])),
    (_ctx.isWordLimitVisible && _ctx.type === 'textarea')
      ? (vue.openBlock(), vue.createBlock("span", _hoisted_8, vue.toDisplayString(_ctx.textLength) + "/" + vue.toDisplayString(_ctx.upperLimit), 1 /* TEXT */))
      : vue.createCommentVNode("v-if", true)
  ], 38 /* CLASS, STYLE, HYDRATE_EVENTS */))
}

script.render = render;
script.__file = "packages/input/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _Input = script;

exports.default = _Input;
