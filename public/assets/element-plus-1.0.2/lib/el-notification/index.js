'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var aria = require('../utils/aria');
var dom = require('../utils/dom');
var isServer = require('../utils/isServer');
var PopupManager = require('../utils/popup-manager');
var util = require('../utils/util');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);

const TypeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
};
var script = vue.defineComponent({
    name: 'ElNotification',
    props: {
        customClass: { type: String, default: '' },
        dangerouslyUseHTMLString: { type: Boolean, default: false },
        duration: { type: Number, default: 4500 },
        iconClass: { type: String, default: '' },
        id: { type: String, default: '' },
        message: {
            type: [String, Object],
            default: '',
        },
        offset: { type: Number, default: 0 },
        onClick: {
            type: Function,
            default: () => void 0,
        },
        onClose: {
            type: Function,
            required: true,
        },
        position: {
            type: String,
            default: 'top-right',
        },
        showClose: { type: Boolean, default: true },
        title: { type: String, default: '' },
        type: { type: String, default: '' },
        zIndex: { type: Number, default: 0 },
    },
    emits: ['destroy'],
    setup(props) {
        const visible = vue.ref(false);
        let timer = null;
        const typeClass = vue.computed(() => {
            const type = props.type;
            return type && TypeMap[type] ? `el-icon-${TypeMap[type]}` : '';
        });
        const horizontalClass = vue.computed(() => {
            return props.position.indexOf('right') > 1 ? 'right' : 'left';
        });
        const verticalProperty = vue.computed(() => {
            return props.position.startsWith('top') ? 'top' : 'bottom';
        });
        const positionStyle = vue.computed(() => {
            return {
                [verticalProperty.value]: `${props.offset}px`,
            };
        });
        function startTimer() {
            if (props.duration > 0) {
                timer = setTimeout(() => {
                    if (visible.value) {
                        close();
                    }
                }, props.duration);
            }
        }
        function clearTimer() {
            clearTimeout(timer);
            timer = null;
        }
        function close() {
            visible.value = false;
        }
        function onKeydown({ code }) {
            if (code === aria.EVENT_CODE.delete || code === aria.EVENT_CODE.backspace) {
                clearTimer();
            }
            else if (code === aria.EVENT_CODE.esc) {
                if (visible.value) {
                    close();
                }
            }
            else {
                startTimer();
            }
        }
        vue.onMounted(() => {
            startTimer();
            visible.value = true;
            dom.on(document, 'keydown', onKeydown);
        });
        vue.onBeforeUnmount(() => {
            dom.off(document, 'keydown', onKeydown);
        });
        return {
            horizontalClass,
            typeClass,
            positionStyle,
            visible,
            close,
            clearTimer,
            startTimer,
        };
    },
});

const _hoisted_1 = { key: 0 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "el-notification-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[5] || (_cache[5] = $event => (_ctx.$emit('destroy')))
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        id: _ctx.id,
        class: ['el-notification', _ctx.customClass, _ctx.horizontalClass],
        style: _ctx.positionStyle,
        role: "alert",
        onMouseenter: _cache[2] || (_cache[2] = (...args) => (_ctx.clearTimer && _ctx.clearTimer(...args))),
        onMouseleave: _cache[3] || (_cache[3] = (...args) => (_ctx.startTimer && _ctx.startTimer(...args))),
        onClick: _cache[4] || (_cache[4] = (...args) => (_ctx.onClick && _ctx.onClick(...args)))
      }, [
        (_ctx.type || _ctx.iconClass)
          ? (vue.openBlock(), vue.createBlock("i", {
              key: 0,
              class: ["el-notification__icon", [_ctx.typeClass, _ctx.iconClass]]
            }, null, 2 /* CLASS */))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode("div", {
          class: ["el-notification__group", { 'is-with-icon': _ctx.typeClass || _ctx.iconClass }]
        }, [
          vue.createVNode("h2", {
            class: "el-notification__title",
            textContent: vue.toDisplayString(_ctx.title)
          }, null, 8 /* PROPS */, ["textContent"]),
          vue.withDirectives(vue.createVNode("div", {
            class: "el-notification__content",
            style: !!_ctx.title ? null : 'margin: 0'
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              (!_ctx.dangerouslyUseHTMLString)
                ? (vue.openBlock(), vue.createBlock("p", _hoisted_1, vue.toDisplayString(_ctx.message), 1 /* TEXT */))
                : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                    vue.createCommentVNode(" Caution here, message could've been compromized, nerver use user's input as message "),
                    vue.createCommentVNode(" eslint-disable-next-line "),
                    vue.createVNode("p", { innerHTML: _ctx.message }, null, 8 /* PROPS */, ["innerHTML"])
                  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
            ])
          ], 4 /* STYLE */), [
            [vue.vShow, _ctx.message]
          ]),
          (_ctx.showClose)
            ? (vue.openBlock(), vue.createBlock("div", {
                key: 0,
                class: "el-notification__closeBtn el-icon-close",
                onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => (_ctx.close && _ctx.close(...args)), ["stop"]))
              }))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */)
      ], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, ["id"]), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["onBeforeLeave"]))
}

script.render = render;
script.__file = "packages/notification/src/index.vue";

const notifications = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
};
let seed = 1;
const Notification = function (options = {}) {
    if (isServer__default['default'])
        return;
    const position = options.position || 'top-right';
    let verticalOffset = options.offset || 0;
    notifications[position]
        .forEach(({ vm }) => {
        verticalOffset += (vm.el.offsetHeight || 0) + 16;
    });
    verticalOffset += 16;
    const id = 'notification_' + seed++;
    const userOnClose = options.onClose;
    options = Object.assign(Object.assign({}, options), { onClose: () => {
            close(id, position, userOnClose);
        }, offset: verticalOffset, id, zIndex: PopupManager__default['default'].nextZIndex() });
    const container = document.createElement('div');
    const vm = vue.createVNode(script, options, util.isVNode(options.message)
        ? {
            default: () => options.message,
        }
        : null);
    vm.props.onDestroy = () => {
        vue.render(null, container);
    };
    vue.render(vm, container);
    notifications[position].push({ vm });
    document.body.appendChild(container.firstElementChild);
    return {
        close: () => {
            vm.component.proxy.visible = false;
        },
    };
};
['success', 'warning', 'info', 'error'].forEach(type => {
    Object.assign(Notification, {
        [type]: (options = {}) => {
            if (typeof options === 'string' || util.isVNode(options)) {
                options = {
                    message: options,
                };
            }
            options.type = type;
            return Notification(options);
        },
    });
});
function close(id, position, userOnClose) {
    const orientedNotifications = notifications[position];
    const idx = orientedNotifications.findIndex(({ vm }) => {
        const { id: _id } = vm.component.props;
        return id === _id;
    });
    if (idx === -1) {
        return;
    }
    const { vm } = orientedNotifications[idx];
    if (!vm)
        return;
    userOnClose === null || userOnClose === void 0 ? void 0 : userOnClose(vm);
    const removedHeight = vm.el.offsetHeight;
    orientedNotifications.splice(idx, 1);
    const len = orientedNotifications.length;
    if (len < 1)
        return;
    for (let i = idx; i < len; i++) {
        const verticalPos = position.split('-')[0];
        const pos = parseInt(orientedNotifications[i].vm.el.style[verticalPos], 10) -
            removedHeight -
            16;
        orientedNotifications[i].vm.component.props.offset = pos;
    }
}

const _Notify = Notification;
_Notify.install = app => {
    app.config.globalProperties.$notify = _Notify;
};

exports.default = _Notify;
