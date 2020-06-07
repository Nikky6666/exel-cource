import {storage} from '@core/utils';
import {defaultCellsStyles, defaultTableTitle} from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableTitle: defaultTableTitle,
    currentCellStyles: defaultCellsStyles
}
const nomalize = state => {
    const newSate = {
        ...state,
        currentCellStyles: defaultCellsStyles,
        currentText: '',
    }
    if (!state.tableTitle) {
        newSate.tableTitle = ''
    }
    return newSate
}
const storageSate = storage('excel-state');
export const initialState = storageSate ? nomalize(storageSate) : defaultState
