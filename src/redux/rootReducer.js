import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
    let field;
    switch (action.type) {
        case TABLE_RESIZE:
             field = action.data.type === 'col' ? 'colState' : 'rowState';
            return {
                ...state,
                [field]: value(state, action, field)
            }
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                currentText: action.data.value,
                dataState: value(state, action, field)
            }
        case CHANGE_STYLES:
            return {
                ...state,
                currentCellStyles: action.data
            }
        case APPLY_STYLE:
            field = 'stylesState';
            const val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {
                    ...val[id],
                    ...action.data.value
                }
            })
            return {
                ...state,
                [field]: val,
                currentCellStyles: {
                    ...state.currentCellStyles,
                    ...action.data.value
                }
            }
        case CHANGE_TITLE:
          //  console.log(state)
            return {
                ...state,
                tableTitle: action.data
            }
        default: return state
    }
}

function value(state, action, field) {
    const prevSate = state[field] || {};
    prevSate[action.data.id] = action.data.value;
    return prevSate;
}

