import { defineComponent, ref, provide, reactive, toRefs, inject, withDirectives, openBlock, createBlock, createVNode, toDisplayString, renderSlot, vShow } from 'vue';

const selectGroupKey = 'ElSelectGroup';
const selectKey = 'ElSelect';
const selectEvents = {
    queryChange: 'elOptionQueryChange',
    groupQueryChange: 'elOptionGroupQueryChange',
};

var script = defineComponent({
    name: 'ElOptionGroup',
    componentName: 'ElOptionGroup',
    props: {
        label: String,
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const visible = ref(true);
        provide(selectGroupKey, reactive(Object.assign({}, toRefs(props))));
        const select = inject(selectKey);
        const queryChange = () => {
            var _a;
            visible.value = (_a = select === null || select === void 0 ? void 0 : select.optionsArray) === null || _a === void 0 ? void 0 : _a.some(option => option.visible === true);
        };
        select.selectEmitter.on(selectEvents.groupQueryChange, queryChange);
        return {
            visible,
        };
    },
});

const _hoisted_1 = { class: "el-select-group__wrap" };
const _hoisted_2 = { class: "el-select-group__title" };
const _hoisted_3 = { class: "el-select-group" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createBlock("ul", _hoisted_1, [
    createVNode("li", _hoisted_2, toDisplayString(_ctx.label), 1 /* TEXT */),
    createVNode("li", null, [
      createVNode("ul", _hoisted_3, [
        renderSlot(_ctx.$slots, "default")
      ])
    ])
  ], 512 /* NEED_PATCH */)), [
    [vShow, _ctx.visible]
  ])
}

script.render = render;
script.__file = "packages/select/src/option-group.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _OptionGroup = script;

export default _OptionGroup;
