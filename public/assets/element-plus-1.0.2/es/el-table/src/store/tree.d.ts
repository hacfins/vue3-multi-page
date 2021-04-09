import { WatcherPropsData } from '../table.type';
declare function useTree(watcherData: WatcherPropsData): {
    loadData: (row: any, key: any, treeNode: any) => void;
    loadOrToggle: (row: any) => void;
    toggleTreeExpansion: (row: any, expanded: any) => void;
    updateTreeExpandKeys: (value: any) => void;
    updateTreeData: () => void;
    normalize: (data: any) => {};
    states: {
        expandRowKeys: import("vue").Ref<any[]>;
        treeData: import("vue").Ref<{}>;
        indent: import("vue").Ref<number>;
        lazy: import("vue").Ref<boolean>;
        lazyTreeNodeMap: import("vue").Ref<{}>;
        lazyColumnIdentifier: import("vue").Ref<string>;
        childrenColumnName: import("vue").Ref<string>;
    };
};
export default useTree;
