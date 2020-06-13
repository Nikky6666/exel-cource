import {clone} from '@core/utils';
import {defaultCellsStyles, defaultTableTitle} from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    tableTitle: defaultTableTitle,
    currentCellStyles: defaultCellsStyles,
    openedDate: new Date().toJSON()
}
const normalize = state => {
    const newSate = {
        ...state,
        currentCellStyles: defaultCellsStyles,
        currentText: '',
    }
    if (!state.tableTitle) {
        newSate.tableTitle = defaultTableTitle
    }
    return newSate
}
export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
