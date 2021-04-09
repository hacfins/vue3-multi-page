'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');
require('../utils/aria');
require('../utils/dom');

const useDropdown = () => {
    const ELEMENT = util.useGlobalConfig();
    const elDropdown = vue.inject('elDropdown', {});
    const _elDropdownSize = vue.computed(() => elDropdown === null || elDropdown === void 0 ? void 0 : elDropdown.dropdownSize);
    return {
        ELEMENT,
        elDropdown,
        _elDropdownSize,
    };
};

var script = vue.defineComponent({
    name: 'ElDropdownItem',
    props: {
        command: {
            type: [Object, String, Number],
            default: () => ({}),
        },
        disabled: Boolean,
        divided: Boolean,
        icon: String,
    },
    setup(props) {
        const { elDropdown } = useDropdown();
        const _instance = vue.getCurrentInstance();
        function handleClick(e) {
            var _a, _b;
            if (props.disabled)
                return;
            if (elDropdown.hideOnClick.value) {
                (_a = elDropdown.handleClick) === null || _a === void 0 ? void 0 : _a.call(elDropdown);
            }
            (_b = elDropdown.commandHandler) === null || _b === void 0 ? void 0 : _b.call(elDropdown, props.command, _instance, e);
        }
        return {
            handleClick,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("li", {
    class: ["el-dropdown-menu__item", {
      'is-disabled': _ctx.disabled,
      'el-dropdown-menu__item--divided': _ctx.divided
    }],
    "aria-disabled": _ctx.disabled,
    tabindex: _ctx.disabled ? null : -1,
    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
  }, [
    (_ctx.icon)
      ? (vue.openBlock(), vue.createBlock("i", {
          key: 0,
          class: _ctx.icon
        }, null, 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "default")
  ], 10 /* CLASS, PROPS */, ["aria-disabled", "tabindex"]))
}

script.render = render;
script.__file = "packages/dropdown/src/dropdown-item.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _DropdownItem = script;

exports.default = _DropdownItem;
