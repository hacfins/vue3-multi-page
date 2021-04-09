import { ref, watch, computed, defineComponent, onMounted, onUpdated, openBlock, createBlock, renderSlot, resolveComponent, createVNode, Fragment, renderList, withCtx } from 'vue';
import isServer from '../utils/isServer';
import { $ } from '../utils/util';
import throwError from '../utils/error';

function useVirtualScroll(props) {
    const viewportRef = ref();
    const offset = ref(0);
    const cache = ref(0);
    const isVertical = ref(true);
    const sizeKey = ref('');
    const scrollKey = ref('');
    const translateKey = ref();
    const styleKey = ref('');
    watch(() => props.direction, dir => {
        const _isVertical = dir === 'v';
        isVertical.value = _isVertical;
        sizeKey.value = `client${_isVertical ? 'Height' : 'Width'}`;
        scrollKey.value = `scroll${_isVertical ? 'Top' : 'Left'}`;
        translateKey.value = `${_isVertical ? 'Y' : 'X'}`;
        styleKey.value = `${_isVertical ? 'height' : 'width'}`;
    }, {
        immediate: true,
    });
    watch(() => props.poolSize, val => {
        cache.value = Math.floor(val / 3);
    }, {
        immediate: true,
    });
    const renderingItems = computed(() => props.poolSize + 2 * $(cache));
    const startNode = computed(() => {
        return Math.max(0, Math.floor($(offset) / props.itemSize) - $(cache));
    });
    const viewportStyle = computed(() => {
        return {
            [$(styleKey)]: `${props.windowSize}px`,
        };
    });
    const contentStyle = computed(() => {
        return {
            [$(styleKey)]: `${props.data.length * props.itemSize}px`,
        };
    });
    const itemContainerStyle = computed(() => {
        const _offset = $(startNode) * props.itemSize;
        return {
            transform: `translate${$(translateKey)}(${_offset}px)`,
        };
    });
    const itemStyle = computed(() => {
        return {
            [$(styleKey)]: `${props.itemSize}px`,
        };
    });
    let animationHandle = null;
    const onScroll = (e) => {
        if (animationHandle) {
            cancelAnimationFrame(animationHandle);
        }
        animationHandle = requestAnimationFrame(() => {
            offset.value = e.target[$(scrollKey)];
        });
    };
    const window = computed(() => {
        const startNodeVal = $(startNode);
        const size = Math.min(props.data.length - startNodeVal, $(renderingItems));
        return props.data.slice(startNodeVal, startNodeVal + size);
    });
    const scrollTo = (idx, alignment = 'head') => {
        if (isServer)
            return;
        if (idx < 0 || idx > props.data.length) {
            throwError('ElVirtualList]', 'Out of list range');
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
                throwError('[ElVirtualList]', 'Unsupported alignment');
            }
        }
        requestAnimationFrame(() => {
            offset.value = _offset;
            viewportRef.value[$(scrollKey)] = _offset;
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

var script = defineComponent({
    name: 'ElVirtualListItem',
    props: {},
    setup() {
        const itemRef = ref();
        onMounted(() => {
        });
        onUpdated(() => {
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
  return (openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ], 512 /* NEED_PATCH */))
}

script.render = render;
script.__file = "packages/virtual-list/src/virtual-item.vue";

var script$1 = defineComponent({
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
  const _component_el_virtual_list_item = resolveComponent("el-virtual-list-item");

  return (openBlock(), createBlock("div", {
    ref: "viewportRef",
    class: "el-vl__viewport",
    style: _ctx.viewportStyle,
    onScrollPassive: _cache[1] || (_cache[1] = (...args) => (_ctx.onScroll && _ctx.onScroll(...args)))
  }, [
    createVNode("div", {
      class: "el-vl__content",
      style: _ctx.contentStyle
    }, [
      createVNode("div", {
        class: "el-vl__item-container",
        style: _ctx.itemContainerStyle,
        "data-direction": _ctx.direction
      }, [
        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.window, (item, idx) => {
          return (openBlock(), createBlock(_component_el_virtual_list_item, {
            key: idx,
            class: "el-vl__item",
            style: _ctx.itemStyle
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", { item: item })
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

export default _VirtualList;
