import { ComputedRef } from 'vue';
import { TableColumnCtx } from '../table.type';
declare function useWatcher(owner: ComputedRef<any>, props_: TableColumnCtx): {
    registerComplexWatchers: () => void;
    registerNormalWatchers: () => void;
};
export default useWatcher;
