import {$} from '@core/dom';

export function Loader() {
    return $.create('div', 'loader').html(
        `
        <div class="loadingio-spinner-double-ring-smhszkzk6kd"><div class="ldio-wven8bowsk">
            <div></div>
            <div></div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            </div>
        </div>
    `)
}
