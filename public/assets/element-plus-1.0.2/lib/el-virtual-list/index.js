'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var isServer = require('../utils/isServer');
var util = require('../utils/util');
var throwError = require('../utils/error');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var throwError__default = /*#__PURE__*/_interopDefaultLegacy(throwError);

function useVirtualScroll(props) {
    const viewportRef = vue.ref();
    const offset = vue.ref(0);
    const cache = vue.ref(0);
    const isVertical = vue.ref(true);
    const sizeKey = vue.ref('');
    const scrollKey = vue.ref('');
    const translateKey = vue.ref();
    const styleKey = vue.ref('');
    vue.watch(() => props.direction, dir => {
        const _isVertical = dir === 'v';
        isVertical.value = _isVertical;
        sizeKey.value = `client${_isVertical ? 'Height' : 'Width'}`;
        scrollKey.value = `scroll${_isVertical ? 'Top' : 'Left'}`;
        translateKey.value = `${_isVertical ? 'Y' : 'X'}`;
        styleKey.value = `${_isVertical ? 'height' : 'width'}`;
    }, {
        immediate: true,
    });
    vue.watch(() => props.poolSize, val => {
        cache.value = Math.floor(val / 3);
    }, {
        immediate: true,
    });
    const renderingItems = vue.computed(() => props.poolSize + 2 * util.$(cache));
    const startNode = vue.computed(() => {
        return Math.max(0, Math.floor(util.$(offset) / props.itemSize) - util.$(cache));
    });
    const viewportStyle = vue.computed(() => {
        return {
            [util.$(styleKey)]: `${props.windowSize}px`,
        };
    });
    const contentStyle = vue.computed(() => {
        return {
            [util.$(styleKey)]: `${props.data.length * props.itemSize}px`,
        };
    });
    const itemContainerStyle = vue.computed(() => {
        const _offset = util.$(startNode) * props.itemSize;
        return {
            transform: `translate${util.$(translateKey)}(${_offset}px)`,
        };
    });
    const itemStyle = vue.computed(() => {
        return {
            [util.$(styleKey)]: `${props.itemSize}px`,
        };
    });
    let animationHandle = null;
    const onScroll = (e) => {
        if (animationHandle) {
            cancelAnimationFrame(animationHandle);
        }
        animationHandle = requestAnimationFrame(() => {
            offset.value = e.target[util.$(scrollKey)];
        });
    };
    const window = vue.computed(() => {
        const startNodeVal = util.$(startNode);
        const size = Math.min(props.data.length - startNodeVal, util.$(renderingItems));
        return props.data.slice(startNodeVal, startNodeVal + size);
    });
    const scrollTo = (idx, alignment = 'head') => {
        if (isServer__default['default'])
            return;
        if (idx < 0 || idx > props.data.length) {
            throwError__default['default']('ElVirtualList]', 'Out of list range');
        }
        let _offset;
        switch (alignment) {
            case 'head': {
                _offset = idx * props.itemSize;
                break;
            }
            case 'center': {
                _offset =
                    (idx -
                        Math.floor(Math.floor(props.windowSize / props.itemSize) / 2)) *
                        props.itemSize;
                break;
            }
            case 'tail': {
                _offset =
                    (idx - Math.floor(props.windowSize / props.itemSize) + 1) * props.itemSize;
                break;
            }
            default: {
                throwError__default['default']('[ElVirtualList]', 'Unsupported alignment');
            }
        }
        requestAnimationFrame(() => {
            offset.value = _offset;
            viewportRef.value[util.$(scrollKey)] = _offset;
        });
    };
    return {
        viewportRef,
        contentStyle,
        itemContainerStyle,
        itemStyle,
        viewportStyle,
        startNode,
        renderingItems,
        window,
        onScroll,
        scrollTo,
    };
}

var script = vue.defineComponent({
    name: 'ElVirtualListItem',
    props: {},
    setup() {
        const itemRef = vue.ref();
        vue.onMounted(() => {
        });
        vue.onUpdated(() => {
        });
        return {
            itemRef,
        };
    },
});

const _hoisted_1 = {
  ref: "itemRef",
  class: "el-vl__item"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 512 /* NEED_PATCH */))
}

script.render = render;
script.__file = "packages/virtual-list/src/virtual-item.vue";

var script$1 = vue.defineComponent({
    name: 'ElVirtualList',
    components: {
        [script.name]: script,
    },
    props: {
        direction: {
            type: String,
            default: 'v',
        },
        data: {
            type: Array,
            required: true,
        },
        itemSize: {
            type: Number,
            required: true,
        },
        windowSize: {
            type: Number,
            required: true,
        },
        poolSize: {
            type: Number,
            default: 20,
        },
    },
    setup(props) {
        const api = useVirtualScroll(props);
        return api;
    },
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_virtual_list_item = vue.resolveComponent("el-virtual-list-item");

  return (vue.openBlock(), vue.createBlock("div", {
    ref: "viewportRef",
    class: "el-vl__viewport",
    style: _ctx.viewportStyle,
    onScrollPassive: _cache[1] || (_cache[1] = (...args) => (_ctx.onScroll && _ctx.onScroll(...args)))
  }, [
    vue.createVNode("div", {
      class: "el-vl__content",
      style: _ctx.contentStyle
    }, [
      vue.createVNode("div", {
        class: "el-vl__item-container",
        style: _ctx.itemContainerStyle,
        "data-direction": _ctx.direction
      }, [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.window, (item, idx) => {
          return (vue.openBlock(), vue.createBlock(_component_el_virtual_list_item, {
            key: idx,
            class: "el-vl__item",
            style: _ctx.itemStyle
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { item: item })
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["style"]))
        }), 128 /* KEYED_FRAGMENT */))
      ], 12 /* STYLE, PROPS */, ["data-direction"])
    ], 4 /* STYLE */)
  ], 36 /* STYLE, HYDRATE_EVENTS */))
}

script$1.render = render$1;
script$1.__file = "packages/virtual-list/src/index.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};
const _VirtualList = script$1;

exports.default = _VirtualList;
