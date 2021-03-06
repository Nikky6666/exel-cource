class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim()
    }
    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    clear() {
        this.html('');
        return this;
    }
    closest(selector) {
        return $(this.$el.closest(selector))
    }
    getCoords() {
        return this.$el.getBoundingClientRect();
    }
    get data() {
        return this.$el.dataset
    }
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    find(selector) {
       return $(this.$el.querySelector(selector))
    }
    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }
    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id;
    }
    focus() {
        this.$el.focus();
        return this;
    }
    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }
      if (this.$el.tagName.toLowerCase() === 'input') {
          return this.$el.value.trim()
      }
      return this.$el.textContent.trim()
    }
    css(styles = {}) {
        Object.keys(styles).forEach(styleName => {
            this.$el.style[styleName] = styles[styleName]
        })
    }
    getStyles(styles = []) {
        return styles.reduce((res, style) => {
            res[style] = this.$el.style[style]
            return res
        }, {})
    }
    attr(name, value) {
        if (typeof value === 'string') {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }
}


$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el);
};

export function $(selector) {
    return new Dom(selector);
}

