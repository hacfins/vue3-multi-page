import { WatcherPropsData } from '../table.type';
declare function useExpand(watcherData: WatcherPropsData): {
    updateExpandRows: () => void;
    toggleRowExpansion: (row: any, expanded: boolean | undefined) => void;
    setExpandRowKeys: (rowKeys: string[]) => void;
    isRowExpanded: (row: any) => boolean;
    states: {
        expandRows: import("vue").Ref<any[]>;
        defaultExpandAll: import("vue").Ref<boolean>;
    };
};
export default useExpand;
