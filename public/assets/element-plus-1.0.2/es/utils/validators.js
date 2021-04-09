import 'vue';
import '@vue/shared';

const isNumber = (val) => typeof val === 'number';

const isValidWidthUnit = (val) => {
    if (isNumber(val)) {
        return true;
    }
    else {
        return ['px', 'rem', 'em', 'vw', '%', 'vmin', 'vmax'].some(unit => val.endsWith(unit));
    }
};
const isValidComponentSize = (val) => ['', 'large', 'medium', 'small', 'mini'].includes(val);

export { isValidComponentSize, isValidWidthUnit };
