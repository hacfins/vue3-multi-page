import { WatcherPropsData, AnyObject } from '../table.type';
declare function useCurrent(watcherData: WatcherPropsData): {
    setCurrentRowKey: (key: string) => void;
    restoreCurrentRowKey: () => void;
    setCurrentRowByKey: (key: string) => void;
    updateCurrentRow: (_currentRow: AnyObject) => void;
    updateCurrentRowData: () => void;
    states: {
        _currentRowKey: any;
        currentRow: any;
    };
};
export default useCurrent;
