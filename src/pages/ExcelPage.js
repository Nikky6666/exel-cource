import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Table} from '@/components/table/Table';
import {Formula} from '@/components/formula/Formula';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {normalizeInitialState} from '@/redux/initialState';

function storageName(param) {
    return `excel:${param}`
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();
        const state = storage(storageName(params))
        const store = createStore(rootReducer, normalizeInitialState(state));
        const storeListener = debounce(state => {
            storage(storageName(params), state)
        }, 300)

        store.subscribe(storeListener)

         this.excel = new Excel({
            components: [
                Header, Toolbar, Formula, Table
            ],
            store
        });

        return this.excel.getRoot();
    }
    afterRender() {
        this.excel.init()
    }
}
