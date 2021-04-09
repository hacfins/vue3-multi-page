import { Store, AnyObject } from '../table.type';
declare function useUtils(store: Store): {
    setCurrentRow: (row: AnyObject) => void;
    toggleRowSelection: (row: any, selected: any) => void;
    clearSelection: () => void;
    clearFilter: (columnKeys: string[]) => void;
    toggleAllSelection: () => void;
    toggleRowExpansion: (row: any, expanded: any) => void;
    clearSort: () => void;
    sort: (prop: any, order: any) => void;
};
export default useUtils;
