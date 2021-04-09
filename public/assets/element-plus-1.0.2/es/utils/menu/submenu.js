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
const triggerEvent = function (elm, name, ...opts) {
    let eventName;
    if (name.includes('mouse') || name.includes('click')) {
        eventName = 'MouseEvents';
    }
    else if (name.includes('key')) {
        eventName = 'KeyboardEvent';
    }
    else {
        eventName = 'HTMLEvents';
    }
    const evt = document.createEvent(eventName);
    evt.initEvent(name, ...opts);
    elm.dispatchEvent(evt);
    return elm;
};

class SubMenu {
    constructor(parent, domNode) {
        this.parent = parent;
        this.domNode = domNode;
        this.subIndex = 0;
        this.subIndex = 0;
        this.init();
    }
    init() {
        this.subMenuItems = this.domNode.querySelectorAll('li');
        this.addListeners();
    }
    gotoSubIndex(idx) {
        if (idx === this.subMenuItems.length) {
            idx = 0;
        }
        else if (idx < 0) {
            idx = this.subMenuItems.length - 1;
        }
        this.subMenuItems[idx].focus();
        this.subIndex = idx;
    }
    addListeners() {
        const parentNode = this.parent.domNode;
        Array.prototype.forEach.call(this.subMenuItems, (el) => {
            el.addEventListener('keydown', (event) => {
                let prevDef = false;
                switch (event.code) {
                    case EVENT_CODE.down: {
                        this.gotoSubIndex(this.subIndex + 1);
                        prevDef = true;
                        break;
                    }
                    case EVENT_CODE.up: {
                        this.gotoSubIndex(this.subIndex - 1);
                        prevDef = true;
                        break;
                    }
                    case EVENT_CODE.tab: {
                        triggerEvent(parentNode, 'mouseleave');
                        break;
                    }
                    case EVENT_CODE.enter:
                    case EVENT_CODE.space: {
                        prevDef = true;
                        event.currentTarget.click();
                        break;
                    }
                }
                if (prevDef) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                return false;
            });
        });
    }
}

export default SubMenu;
