import { defineComponent, ref, inject, computed, provide, reactive, toRefs, watch, onMounted, nextTick, openBlock, createBlock, renderSlot } from 'vue';
import { EVENT_CODE } from '../utils/aria';
import { UPDATE_MODEL_EVENT } from '../utils/constants';
import { isValidComponentSize } from '../utils/validators';
import { elFormItemKey } from '../el-form';

const radioGroupKey = 'RadioGroup';

var script = defineComponent({
    name: 'ElRadioGroup',
    componentName: 'ElRadioGroup',
    props: {
        modelValue: {
            type: [String, Number, Boolean],
            default: '',
        },
        size: {
            type: String,
            validator: isValidComponentSize,
        },
        fill: {
            type: String,
            default: '',
        },
        textColor: {
            type: String,
            default: '',
        },
        disabled: Boolean,
    },
    emits: [UPDATE_MODEL_EVENT, 'change'],
    setup(props, ctx) {
        const radioGroup = ref(null);
        const elFormItem = inject(elFormItemKey, {});
        const radioGroupSize = computed(() => {
            return props.size || elFormItem.size;
        });
        const changeEvent = value => {
            ctx.emit(UPDATE_MODEL_EVENT, value);
            nextTick(() => {
                ctx.emit('change', value);
            });
        };
        provide(radioGroupKey, reactive(Object.assign(Object.assign({ name: 'ElRadioGroup' }, toRefs(props)), { radioGroupSize: radioGroupSize, changeEvent: changeEvent })));
        watch(() => props.modelValue, val => {
            var _a;
            (_a = elFormItem.formItemMitt) === null || _a === void 0 ? void 0 : _a.emit('el.form.change', [val]);
        });
        const handleKeydown = e => {
            const target = e.target;
            const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
            const radios = radioGroup.value.querySelectorAll(className);
            const length = radios.length;
            const index = Array.from(radios).indexOf(target);
            const roleRadios = radioGroup.value.querySelectorAll('[role=radio]');
            let nextIndex = null;
            switch (e.code) {
                case EVENT_CODE.left:
                case EVENT_CODE.up:
                    e.stopPropagation();
                    e.preventDefault();
                    nextIndex = index === 0 ? length - 1 : index - 1;
                    break;
                case EVENT_CODE.right:
                case EVENT_CODE.down:
                    e.stopPropagation();
                    e.preventDefault();
                    nextIndex = (index === (length - 1)) ? 0 : index + 1;
                    break;
            }
            if (nextIndex === null)
                return;
            roleRadios[nextIndex].click();
            roleRadios[nextIndex].focus();
        };
        onMounted(() => {
            const radios = radioGroup.value.querySelectorAll('[type=radio]');
            const firstLabel = radios[0];
            if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
                firstLabel.tabIndex = 0;
            }
        });
        return {
            handleKeydown,
            radioGroupSize,
            radioGroup,
        };
    },
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    ref: "radioGroup",
    class: "el-radio-group",
    role: "radiogroup",
    onKeydown: _cache[1] || (_cache[1] = (...args) => (_ctx.handleKeydown && _ctx.handleKeydown(...args)))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
}

script.render = render;
script.__file = "packages/radio/src/radio-group.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _RadioGroup = script;

export default _RadioGroup;
