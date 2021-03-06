'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('@vue/shared');

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

exports.default = PopupManager;
