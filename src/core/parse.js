export function parse(string = '') {
    try {
        if (string.startsWith('=')) {
            return eval(string.slice(1))
        }
    } catch (e) {
        return string
    }

    return string;
}
