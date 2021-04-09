import { getCurrentInstance, reactive, onBeforeMount, toRefs, onBeforeUnmount, watch, nextTick } from 'vue';
import { camelize } from '@vue/shared';

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

var isServer = typeof window === 'undefined';

let $ELEMENT = {};
const getConfig = (key) => {
    return $ELEMENT[key];
};

const trim = function (s) {
    return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
const on = function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
    }
};
function hasClass(el, cls) {
    if (!el || !cls)
        return false;
    if (cls.indexOf(' ') !== -1)
        throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    }
    else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}
function addClass(el, cls) {
    if (!el)
        return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName)
            continue;
        if (el.classList) {
            el.classList.add(clsName);
        }
        else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}
function removeClass(el, cls) {
    if (!el || !cls)
        return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName)
            continue;
        if (el.classList) {
            el.classList.remove(clsName);
        }
        else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}
const getStyle = function (element, styleName) {
    if (isServer)
        return;
    if (!element || !styleName)
        return null;
    styleName = camelize(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        const style = element.style[styleName];
        if (style)
            return style;
        const computed = document.defaultView.getComputedStyle(element, '');
        return computed ? computed[styleName] : '';
    }
    catch (e) {
        return element.style[styleName];
    }
};

const EVENT_CODE = {
    tab: 'Tab',
    enter: 'Enter',
    space: 'Space',
    left: 'ArrowLeft',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    esc: 'Escape',
    delete: 'Delete',
    backspace: 'Backspace',
};

const onTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const onModalClick = () => {
    PopupManager === null || PopupManager === void 0 ? void 0 : PopupManager.doOnModalClick();
};
let hasModal = false;
let zIndex;
const getModal = function () {
    if (isServer)
        return;
    let modalDom = PopupManager.modalDom;
    if (modalDom) {
        hasModal = true;
    }
    else {
        hasModal = false;
        modalDom = document.createElement('div');
        PopupManager.modalDom = modalDom;
        on(modalDom, 'touchmove', onTouchMove);
        on(modalDom, 'click', onModalClick);
    }
    return modalDom;
};
const instances = {};
const PopupManager = {
    modalFade: true,
    modalDom: undefined,
    zIndex,
    getInstance: function (id) {
        return instances[id];
    },
    register: function (id, instance) {
        if (id && instance) {
            instances[id] = instance;
        }
    },
    deregister: function (id) {
        if (id) {
            instances[id] = null;
            delete instances[id];
        }
    },
    nextZIndex: function () {
        return ++PopupManager.zIndex;
    },
    modalStack: [],
    doOnModalClick: function () {
        const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topItem)
            return;
        const instance = PopupManager.getInstance(topItem.id);
        if (instance && instance.closeOnClickModal.value) {
            instance.close();
        }
    },
    openModal: function (id, zIndex, dom, modalClass, modalFade) {
        if (isServer)
            return;
        if (!id || zIndex === undefined)
            return;
        this.modalFade = modalFade;
        const modalStack = this.modalStack;
        for (let i = 0, j = modalStack.length; i < j; i++) {
            const item = modalStack[i];
            if (item.id === id) {
                return;
            }
        }
        const modalDom = getModal();
        addClass(modalDom, 'v-modal');
        if (this.modalFade && !hasModal) {
            addClass(modalDom, 'v-modal-enter');
        }
        if (modalClass) {
            const classArr = modalClass.trim().split(/\s+/);
            classArr.forEach(item => addClass(modalDom, item));
        }
        setTimeout(() => {
            removeClass(modalDom, 'v-modal-enter');
        }, 200);
        if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
            dom.parentNode.appendChild(modalDom);
        }
        else {
            document.body.appendChild(modalDom);
        }
        if (zIndex) {
            modalDom.style.zIndex = String(zIndex);
        }
        modalDom.tabIndex = 0;
        modalDom.style.display = '';
        this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
    },
    closeModal: function (id) {
        const modalStack = this.modalStack;
        const modalDom = getModal();
        if (modalStack.length > 0) {
            const topItem = modalStack[modalStack.length - 1];
            if (topItem.id === id) {
                if (topItem.modalClass) {
                    const classArr = topItem.modalClass.trim().split(/\s+/);
                    classArr.forEach(item => removeClass(modalDom, item));
                }
                modalStack.pop();
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                }
            }
            else {
                for (let i = modalStack.length - 1; i >= 0; i--) {
                    if (modalStack[i].id === id) {
                        modalStack.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (modalStack.length === 0) {
            if (this.modalFade) {
                addClass(modalDom, 'v-modal-leave');
            }
            setTimeout(() => {
                if (modalStack.length === 0) {
                    if (modalDom.parentNode)
                        modalDom.parentNode.removeChild(modalDom);
                    modalDom.style.display = 'none';
                    PopupManager.modalDom = undefined;
                }
                removeClass(modalDom, 'v-modal-leave');
            }, 200);
        }
    },
};
Object.defineProperty(PopupManager, 'zIndex', {
    configurable: true,
    get() {
        if (zIndex === undefined) {
            zIndex = getConfig('zIndex') || 2000;
        }
        return zIndex;
    },
    set(value) {
        zIndex = value;
    },
});
const getTopPopup = function () {
    if (isServer)
        return;
    if (PopupManager.modalStack.length > 0) {
        const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topPopup)
            return;
        const instance = PopupManager.getInstance(topPopup.id);
        return instance;
    }
};
if (!isServer) {
    on(window, 'keydown', function (event) {
        if (event.code === EVENT_CODE.esc) {
            const topPopup = getTopPopup();
            if (topPopup && topPopup.closeOnPressEscape.value) {
                topPopup.handleClose
                    ? topPopup.handleClose()
                    : topPopup.handleAction
                        ? topPopup.handleAction('cancel')
                        : topPopup.close();
            }
        }
    });
}

let scrollBarWidth;
function getScrollBarWidth () {
    if (isServer)
        return 0;
    if (scrollBarWidth !== undefined)
        return scrollBarWidth;
    const outer = document.createElement('div');
    outer.className = 'el-scrollbar__wrap';
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    scrollBarWidth = widthNoScroll - widthWithScroll;
    return scrollBarWidth;
}

let idSeed = 1;
let scrollBarWidth$1;
const usePopup = (props, doClose, rootRef = 'root') => {
    let _popupId;
    let _opening = false;
    let _closing = false;
    let _closeTimer = null;
    let _openTimer = null;
    const vm = getCurrentInstance();
    const state = reactive({
        opened: false,
        bodyPaddingRight: null,
        computedBodyPaddingRight: 0,
        withoutHiddenClass: true,
        rendered: false,
        visible: false,
    });
    onBeforeMount(() => {
        const { handleClose, handleAction } = vm.proxy;
        _popupId = 'popup-' + idSeed++;
        PopupManager.register(_popupId, Object.assign(Object.assign({}, toRefs(props)), { close,
            handleClose,
            handleAction }));
    });
    onBeforeUnmount(() => {
        PopupManager.deregister(_popupId);
        PopupManager.closeModal(_popupId);
        restoreBodyStyle();
    });
    const doOpen = merProps => {
        if (isServer)
            return;
        if (state.opened)
            return;
        _opening = true;
        const dom = vm.refs[rootRef];
        const modal = merProps.modal;
        const zIndex = merProps.zIndex;
        if (zIndex) {
            PopupManager.zIndex = zIndex;
        }
        if (modal) {
            if (_closing) {
                PopupManager.closeModal(_popupId);
                _closing = false;
            }
            PopupManager.openModal(_popupId, PopupManager.nextZIndex(), props.modalAppendToBody ? undefined : dom, merProps.modalClass, merProps.modalFade);
            if (merProps.lockScroll) {
                state.withoutHiddenClass = !hasClass(document.body, 'el-popup-parent--hidden');
                if (state.withoutHiddenClass) {
                    state.bodyPaddingRight = document.body.style.paddingRight;
                    state.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10);
                }
                scrollBarWidth$1 = getScrollBarWidth();
                const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
                const bodyOverflowY = getStyle(document.body, 'overflowY');
                if (scrollBarWidth$1 > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && state.withoutHiddenClass) {
                    document.body.style.paddingRight = state.computedBodyPaddingRight + scrollBarWidth$1 + 'px';
                }
                addClass(document.body, 'el-popup-parent--hidden');
            }
        }
        if (getComputedStyle(dom).position === 'static') {
            dom.style.position = 'absolute';
        }
        dom.style.zIndex = String(PopupManager.nextZIndex());
        state.opened = true;
        doAfterOpen();
    };
    const open = function (options) {
        if (!state.rendered) {
            state.rendered = true;
        }
        const _props = Object.assign({}, props || vm.proxy, options);
        if (_closeTimer) {
            clearTimeout(_closeTimer);
            _closeTimer = null;
        }
        clearTimeout(_openTimer);
        const openDelay = Number(_props.openDelay);
        if (openDelay > 0) {
            _openTimer = setTimeout(() => {
                _openTimer = null;
                doOpen(_props);
            }, openDelay);
        }
        else {
            doOpen(_props);
        }
    };
    const close = () => {
        if (_openTimer !== null) {
            clearTimeout(_openTimer);
            _openTimer = null;
        }
        clearTimeout(_closeTimer);
        const closeDelay = Number(props.closeDelay);
        if (closeDelay > 0) {
            _closeTimer = setTimeout(() => {
                _closeTimer = null;
                doClose();
            }, closeDelay);
        }
        else {
            doClose();
        }
    };
    const doAfterOpen = () => {
        _opening = false;
    };
    const restoreBodyStyle = () => {
        if (props.modal && state.withoutHiddenClass) {
            document.body.style.paddingRight = state.bodyPaddingRight;
            removeClass(document.body, 'el-popup-parent--hidden');
        }
        state.withoutHiddenClass = true;
    };
    const doAfterClose = () => {
        PopupManager.closeModal(_popupId);
        _closing = false;
    };
    const updateClosingFlag = value => {
        _closing = value;
    };
    watch(() => state.visible, (val) => __awaiter(void 0, void 0, void 0, function* () {
        if (val) {
            if (_opening)
                return;
            if (!state.rendered) {
                state.rendered = true;
                yield nextTick();
                open();
            }
            else {
                open();
            }
        }
        else {
            close();
        }
    }));
    return {
        state,
        open,
        close,
        doAfterClose,
        updateClosingFlag,
        restoreBodyStyle,
    };
};

export default usePopup;
