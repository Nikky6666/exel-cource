import {defaultCellsStyles} from '@/constants';
import {toInlineStyles} from '@core/utils';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
}
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state = {}, index) {
    return `${state[index] || DEFAULT_WIDTH}px`
}
function getHeight(state = {}, index) {
    return `${state[index] || DEFAULT_HEIGHT}px`
}
function getCellContent(state = {}, id) {
    return `${state[id] || ''}`
}
function withWidthFrom(state = {}) {
    return function(col, index) {
        return {
            col,
            index,
            width: getWidth(state.colState, index)
        }
    }
}
function toCell(row, state) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const styles = toInlineStyles({
            ...defaultCellsStyles,
            ...state.stylesState[id]
        })
        const data = getCellContent(state.dataState, id);
        return `<div 
            class="cell" 
            contenteditable 
            data-col="${col}"
            data-type="cell"
            data-id="${id}"
           data-value="${data}"
            style="${styles};width: ${getWidth(state.colState, col)}"
            >${parse(data)}</div>`
    }
}

function toColumn({col, index, width}) {
        return `
    <div class="column" style="width: ${width}" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(rowIndex, content, state) {
    const height = getHeight(state.rowState, rowIndex);
    const resizer = typeof rowIndex === 'number' ? ` <div class="row-resize" data-resize="row" ></div>` : ''
    return `
    <div class="row"
     data-type="resizable" 
     data-row="${rowIndex}"
     style="height: ${height}"
     >
    <div class="row-info">
    ${typeof rowIndex === 'number' ? rowIndex + 1 : ''}
    ${resizer}
    </div>
    <div class="row-data">${content}</div>
</div>`
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 30, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
  //  console.log('-------------->', state)
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('');

    rows.push(createRow(null, cols, {}));
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
        rows.push(createRow(row, cells, state))
    }
    return rows.join('')
}
