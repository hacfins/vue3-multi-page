import { h, getCurrentInstance, watch, ref, watchEffect, computed, defineComponent, onBeforeMount, onMounted, onBeforeUnmount, Fragment } from 'vue';
import { getPropByPath } from '../utils/util';
import ElCheckbox from '../el-checkbox';
import '../utils/dom';
import '@popperjs/core';
import '../utils/popup-manager';
import cloneDeep from 'lodash/cloneDeep';

const cellStarts = {
    default: {
        order: '',
    },
    selection: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
        order: '',
        className: 'el-table-column--selection',
    },
    expand: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
        order: '',
    },
    index: {
        width: 48,
        minWidth: 48,
        realWidth: 48,
        order: '',
    },
};
const cellForced = {
    selection: {
        renderHeader: function ({ store: store_ }) {
            const store = store_;
            function isDisabled() {
                return store.states.data.value && store.states.data.value.length === 0;
            }
            return h(ElCheckbox, {
                disabled: isDisabled(),
                indeterminate: store.states.selection.value.length > 0 &&
                    !store.states.isAllSelected.value,
                'onUpdate:modelValue': store.toggleAllSelection,
                modelValue: store.states.isAllSelected.value,
            });
        },
        renderCell: function ({ row, column, store, $index, }) {
            return h(ElCheckbox, {
                disabled: column.selectable
                    ? !column.selectable.call(null, row, $index)
                    : false,
                onInput: () => {
                    store.commit('rowSelectedChanged', row);
                },
                onClick: (event) => event.stopPropagation(),
                modelValue: store.isSelected(row),
            });
        },
        sortable: false,
        resizable: false,
    },
    index: {
        renderHeader: function ({ column: column_ }) {
            const column = column_;
            return column.label || '#';
        },
        renderCell: function ({ column, $index, }) {
            let i = $index + 1;
            const index = column.index;
            if (typeof index === 'number') {
                i = $index + index;
            }
            else if (typeof index === 'function') {
                i = index($index);
            }
            return h('div', {}, [i]);
        },
        sortable: false,
    },
    expand: {
        renderHeader: function ({ column: column_ }) {
            const column = column_;
            return column.label || '';
        },
        renderCell: function ({ row: row_, store: store_ }) {
            const store = store_;
            const row = row_;
            const classes = ['el-table__expand-icon'];
            if (store.states.expandRows.value.indexOf(row) > -1) {
                classes.push('el-table__expand-icon--expanded');
            }
            const callback = function (e) {
                e.stopPropagation();
                store.toggleRowExpansion(row);
            };
            return h('div', {
                class: classes,
                onClick: callback,
            }, [
                h('i', {
                    class: 'el-icon el-icon-arrow-right',
                }),
            ]);
        },
        sortable: false,
        resizable: false,
        className: 'el-table__expand-column',
    },
};
function defaultRenderCell({ row, column, $index, }) {
    const property = column.property;
    const value = property && getPropByPath(row, property, false).v;
    if (column && column.formatter) {
        return column.formatter(row, column, value, $index);
    }
    return value;
}
function treeCellPrefix({ row: row_, treeNode: treeNode_, store: store_, }) {
    const row = row_;
    const store = store_;
    const treeNode = treeNode_;
    if (!treeNode)
        return null;
    const ele = [];
    const callback = function (e) {
        e.stopPropagation();
        store.loadOrToggle(row);
    };
    if (treeNode.indent) {
        ele.push(h('span', {
            class: 'el-table__indent',
            style: { 'padding-left': treeNode.indent + 'px' },
        }));
    }
    if (typeof treeNode.expanded === 'boolean' && !treeNode.noLazyChildren) {
        const expandClasses = [
            'el-table__expand-icon',
            treeNode.expanded ? 'el-table__expand-icon--expanded' : '',
        ];
        let iconClasses = ['el-icon-arrow-right'];
        if (treeNode.loading) {
            iconClasses = ['el-icon-loading'];
        }
        ele.push(h('div', {
            class: expandClasses,
            onClick: callback,
        }, [
            h('i', {
                class: iconClasses,
            }),
        ]));
    }
    else {
        ele.push(h('span', {
            class: 'el-table__placeholder',
        }));
    }
    return ele;
}

function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function mergeOptions(defaults, config) {
    const options = {};
    let key;
    for (key in defaults) {
        options[key] = defaults[key];
    }
    for (key in config) {
        if (hasOwn(config, key)) {
            const value = config[key];
            if (typeof value !== 'undefined') {
                options[key] = value;
            }
        }
    }
    return options;
}
function parseWidth(width) {
    if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
            width = null;
        }
    }
    return width;
}
function parseMinWidth(minWidth) {
    if (typeof minWidth !== 'undefined') {
        minWidth = parseWidth(minWidth);
        if (isNaN(minWidth)) {
            minWidth = 80;
        }
    }
    return minWidth;
}
function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function useWatcher(owner, props_) {
    const instance = getCurrentInstance();
    const registerComplexWatchers = () => {
        const props = ['fixed'];
        const aliases = {
            realWidth: 'width',
            realMinWidth: 'minWidth',
        };
        const allAliases = props.reduce((prev, cur) => {
            prev[cur] = cur;
            return prev;
        }, aliases);
        Object.keys(allAliases).forEach(key => {
            const columnKey = aliases[key];
            if (props_.hasOwnProperty(columnKey)) {
                watch(() => props_[columnKey], newVal => {
                    instance.columnConfig.value[columnKey] = newVal;
                    instance.columnConfig.value[key] = newVal;
                    const updateColumns = columnKey === 'fixed';
                    owner.value.store.scheduleLayout(updateColumns);
                });
            }
        });
    };
    const registerNormalWatchers = () => {
        const props = [
            'label',
            'property',
            'filters',
            'filterMultiple',
            'sortable',
            'index',
            'formatter',
            'className',
            'labelClassName',
            'showOverflowTooltip',
        ];
        const aliases = {
            prop: 'property',
            realAlign: 'align',
            realHeaderAlign: 'headerAlign',
        };
        const allAliases = props.reduce((prev, cur) => {
            prev[cur] = cur;
            return prev;
        }, aliases);
        Object.keys(allAliases).forEach(key => {
            const columnKey = aliases[key];
            if (props_.hasOwnProperty(columnKey)) {
                watch(() => props_[columnKey], newVal => {
                    instance.columnConfig.value[columnKey] = newVal;
                });
            }
        });
    };
    return {
        registerComplexWatchers,
        registerNormalWatchers,
    };
}

function useRender(props, slots, owner) {
    const instance = getCurrentInstance();
    const columnId = ref('');
    const isSubColumn = ref(false);
    const realAlign = ref();
    const realHeaderAlign = ref();
    watchEffect(() => {
        realAlign.value = !!props.align ? 'is-' + props.align : null;
        realAlign.value;
    });
    watchEffect(() => {
        realHeaderAlign.value = !!props.headerAlign
            ? 'is-' + props.headerAlign
            : realAlign.value;
        realHeaderAlign.value;
    });
    const columnOrTableParent = computed(() => {
        let parent = instance.vnode.vParent || instance.parent;
        while (parent && !parent.tableId && !parent.columnId) {
            parent = parent.vnode.vParent || parent.parent;
        }
        return parent;
    });
    const realWidth = ref(parseWidth(props.width));
    const realMinWidth = ref(parseMinWidth(props.minWidth));
    const setColumnWidth = column => {
        if (realWidth.value)
            column.width = realWidth.value;
        if (realMinWidth.value) {
            column.minWidth = realMinWidth.value;
        }
        if (!column.minWidth) {
            column.minWidth = 80;
        }
        column.realWidth =
            column.width === undefined ? column.minWidth : column.width;
        return column;
    };
    const setColumnForcedProps = column => {
        const type = column.type;
        const source = cellForced[type] || {};
        Object.keys(source).forEach(prop => {
            const value = source[prop];
            if (value !== undefined) {
                column[prop] = prop === 'className' ? `${column[prop]} ${value}` : value;
            }
        });
        return column;
    };
    const checkSubColumn = children => {
        if (children instanceof Array) {
            children.forEach(child => check(child));
        }
        else {
            check(children);
        }
        function check(item) {
            var _a;
            if (((_a = item === null || item === void 0 ? void 0 : item.type) === null || _a === void 0 ? void 0 : _a.name) === 'ElTableColumn') {
                item.vParent = instance;
            }
        }
    };
    const setColumnRenders = column => {
        if (props.renderHeader) {
            console.warn('[Element Warn][TableColumn]Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.');
        }
        else if (column.type !== 'selection') {
            column.renderHeader = scope => {
                instance.columnConfig.value['label'];
                const renderHeader = slots.header;
                return renderHeader ? renderHeader(scope) : column.label;
            };
        }
        let originRenderCell = column.renderCell;
        if (column.type === 'expand') {
            column.renderCell = data => h('div', {
                class: 'cell',
            }, [originRenderCell(data)]);
            owner.value.renderExpanded = data => {
                return slots.default ? slots.default(data) : slots.default;
            };
        }
        else {
            originRenderCell = originRenderCell || defaultRenderCell;
            column.renderCell = data => {
                let children = null;
                if (slots.default) {
                    children = slots.default(data);
                }
                else {
                    children = originRenderCell(data);
                }
                const prefix = treeCellPrefix(data);
                const props = {
                    class: 'cell',
                    style: {},
                };
                if (column.showOverflowTooltip) {
                    props.class += ' el-tooltip';
                    props.style = {
                        width: (data.column.realWidth || data.column.width) - 1 + 'px',
                    };
                }
                checkSubColumn(children);
                return h('div', props, [prefix, cloneDeep(children)]);
            };
        }
        return column;
    };
    const getPropsData = (...propsKey) => {
        return propsKey.reduce((prev, cur) => {
            if (Array.isArray(cur)) {
                cur.forEach(key => {
                    prev[key] = props[key];
                });
            }
            return prev;
        }, {});
    };
    const getColumnElIndex = (children, child) => {
        return [].indexOf.call(children, child);
    };
    return {
        columnId,
        realAlign,
        isSubColumn,
        realHeaderAlign,
        columnOrTableParent,
        setColumnWidth,
        setColumnForcedProps,
        setColumnRenders,
        getPropsData,
        getColumnElIndex,
    };
}

let columnIdSeed = 1;
var ElTableColumn = defineComponent({
    name: 'ElTableColumn',
    components: {
        ElCheckbox,
    },
    props: {
        type: {
            type: String,
            default: 'default',
        },
        label: String,
        className: String,
        labelClassName: String,
        property: String,
        prop: String,
        width: {
            type: [Object, Number, String],
            default: () => {
                return {};
            },
        },
        minWidth: {
            type: [Object, Number, String],
            default: () => {
                return {};
            },
        },
        renderHeader: Function,
        sortable: {
            type: [Boolean, String],
            default: false,
        },
        sortMethod: Function,
        sortBy: [String, Function, Array],
        resizable: {
            type: Boolean,
            default: true,
        },
        columnKey: String,
        align: String,
        headerAlign: String,
        showTooltipWhenOverflow: Boolean,
        showOverflowTooltip: Boolean,
        fixed: [Boolean, String],
        formatter: Function,
        selectable: Function,
        reserveSelection: Boolean,
        filterMethod: Function,
        filteredValue: Array,
        filters: Array,
        filterPlacement: String,
        filterMultiple: {
            type: Boolean,
            default: true,
        },
        index: [Number, Function],
        sortOrders: {
            type: Array,
            default() {
                return ['ascending', 'descending', null];
            },
            validator(val) {
                return val.every((order) => ['ascending', 'descending', null].indexOf(order) > -1);
            },
        },
    },
    setup(prop, { slots }) {
        const instance = getCurrentInstance();
        const columnConfig = ref({});
        const props = prop;
        const owner = computed(() => {
            let parent = instance.parent;
            while (parent && !parent.tableId) {
                parent = parent.parent;
            }
            return parent;
        });
        const { registerNormalWatchers, registerComplexWatchers } = useWatcher(owner, props);
        const { columnId, isSubColumn, realHeaderAlign, columnOrTableParent, setColumnWidth, setColumnForcedProps, setColumnRenders, getPropsData, getColumnElIndex, realAlign, } = useRender(props, slots, owner);
        const parent = columnOrTableParent.value;
        columnId.value =
            (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;
        onBeforeMount(() => {
            isSubColumn.value = owner.value !== parent;
            const type = props.type || 'default';
            const sortable = props.sortable === '' ? true : props.sortable;
            const defaults = Object.assign(Object.assign({}, cellStarts[type]), { id: columnId.value, type: type, property: props.prop || props.property, align: realAlign, headerAlign: realHeaderAlign, showOverflowTooltip: props.showOverflowTooltip || props.showTooltipWhenOverflow, filterable: props.filters || props.filterMethod, filteredValue: [], filterPlacement: '', isColumnGroup: false, filterOpened: false, sortable: sortable, index: props.index });
            const basicProps = [
                'columnKey',
                'label',
                'className',
                'labelClassName',
                'type',
                'renderHeader',
                'formatter',
                'fixed',
                'resizable',
            ];
            const sortProps = ['sortMethod', 'sortBy', 'sortOrders'];
            const selectProps = ['selectable', 'reserveSelection'];
            const filterProps = [
                'filterMethod',
                'filters',
                'filterMultiple',
                'filterOpened',
                'filteredValue',
                'filterPlacement',
            ];
            let column = getPropsData(basicProps, sortProps, selectProps, filterProps);
            column = mergeOptions(defaults, column);
            const chains = compose(setColumnRenders, setColumnWidth, setColumnForcedProps);
            column = chains(column);
            columnConfig.value = column;
            registerNormalWatchers();
            registerComplexWatchers();
        });
        onMounted(() => {
            var _a;
            const parent = columnOrTableParent.value;
            const children = isSubColumn.value
                ? parent.vnode.el.children
                : (_a = parent.refs.hiddenColumns) === null || _a === void 0 ? void 0 : _a.children;
            const getColumnIndex = () => getColumnElIndex(children || [], instance.vnode.el);
            columnConfig.value.getColumnIndex = getColumnIndex;
            const columnIndex = getColumnIndex();
            columnIndex > -1 &&
                owner.value.store.commit('insertColumn', columnConfig.value, isSubColumn.value ? parent.columnConfig.value : null);
        });
        onBeforeUnmount(() => {
            owner.value.store.commit('removeColumn', columnConfig.value, isSubColumn.value ? parent.columnConfig.value : null);
        });
        instance.columnId = columnId.value;
        instance.columnConfig = columnConfig;
        return;
    },
    render() {
        var _a, _b, _c;
        let children = [];
        try {
            const renderDefault = (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, { row: {}, column: {}, $index: -1 });
            if (renderDefault instanceof Array) {
                for (const childNode of renderDefault) {
                    if (((_c = childNode.type) === null || _c === void 0 ? void 0 : _c.name) === 'ElTableColumn' || childNode.shapeFlag !== 36) {
                        children.push(childNode);
                    }
                    else if (childNode.type === Fragment && childNode.children instanceof Array) {
                        renderDefault.push(...childNode.children);
                    }
                }
            }
        }
        catch (_d) {
            children = [];
        }
        return h('div', children);
    },
});

const _TableColumn = ElTableColumn;
_TableColumn.install = app => {
    app.component(_TableColumn.name, _TableColumn);
};

export default _TableColumn;
