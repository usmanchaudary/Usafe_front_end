const setValue = (key, value) => {
    window.localStorage.setItem(key, value);
}

const getValue = (key) => {
    return window.localStorage.getItem(key);
}