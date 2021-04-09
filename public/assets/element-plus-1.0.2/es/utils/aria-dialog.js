const isFocusable = (element) => {
    if (element.tabIndex > 0 ||
        (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
        return true;
    }
    if (element.disabled) {
        return false;
    }
    switch (element.nodeName) {
        case 'A': {
            return !!element.href && element.rel !== 'ignore';
        }
        case 'INPUT': {
            return !(element.type === 'hidden' || element.type === 'file');
        }
        case 'BUTTON':
        case 'SELECT':
        case 'TEXTAREA': {
            return true;
        }
        default: {
            return false;
        }
    }
};
const attemptFocus = (element) => {
    var _a;
    if (!isFocusable(element)) {
        return false;
    }
    Utils.IgnoreUtilFocusChanges = true;
    (_a = element.focus) === null || _a === void 0 ? void 0 : _a.call(element);
    Utils.IgnoreUtilFocusChanges = false;
    return document.activeElement === element;
};
const Utils = {
    IgnoreUtilFocusChanges: false,
    focusFirstDescendant: function (element) {
        for (let i = 0; i < element.childNodes.length; i++) {
            const child = element.childNodes[i];
            if (attemptFocus(child) ||
                this.focusFirstDescendant(child)) {
                return true;
            }
        }
        return false;
    },
    focusLastDescendant: function (element) {
        for (let i = element.childNodes.length - 1; i >= 0; i--) {
            const child = element.childNodes[i];
            if (attemptFocus(child) ||
                this.focusLastDescendant(child)) {
                return true;
            }
        }
        return false;
    },
};

let tabEvent;
class Dialog {
    constructor(dialogNode, focusAfterClosed, focusFirst) {
        this.dialogNode = dialogNode;
        this.focusAfterClosed = focusAfterClosed;
        this.focusFirst = focusFirst;
        this.lastFocus = null;
        if (this.dialogNode === null || this.dialogNode.getAttribute('role') !== 'dialog') {
            throw new Error('Dialog() requires a DOM element with ARIA role of dialog.');
        }
        if (typeof focusAfterClosed === 'string') {
            this.focusAfterClosed = document.getElementById(focusAfterClosed);
        }
        else if (typeof focusAfterClosed === 'object') {
            this.focusAfterClosed = focusAfterClosed;
        }
        else {
            this.focusAfterClosed = null;
        }
        if (typeof focusFirst === 'string') {
            this.focusFirst = document.getElementById(focusFirst);
        }
        else if (typeof focusFirst === 'object') {
            this.focusFirst = focusFirst;
        }
        else {
            this.focusFirst = null;
        }
        if (this.focusFirst) {
            this.focusFirst.focus();
        }
        else {
            Utils.focusFirstDescendant(this.dialogNode);
        }
        this.lastFocus = document.activeElement;
        tabEvent = (e) => {
            this.trapFocus(e);
        };
        this.addListeners();
    }
    addListeners() {
        document.addEventListener('focus', tabEvent, true);
    }
    removeListeners() {
        document.removeEventListener('focus', tabEvent, true);
    }
    closeDialog() {
        this.removeListeners();
        if (this.focusAfterClosed) {
            setTimeout(() => {
                this.focusAfterClosed.focus();
            });
        }
    }
    trapFocus(event) {
        if (Utils.IgnoreUtilFocusChanges) {
            return;
        }
        if (this.dialogNode.contains(event.target)) {
            this.lastFocus = event.target;
        }
        else {
            Utils.focusFirstDescendant(this.dialogNode);
            if (this.lastFocus === document.activeElement) {
                Utils.focusLastDescendant(this.dialogNode);
            }
            this.lastFocus = document.activeElement;
        }
    }
}

export default Dialog;
