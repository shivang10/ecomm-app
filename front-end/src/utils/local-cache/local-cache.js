export const setLocalCache = (key, value) => {
    localStorage.setItem(key, value)
}

export const getLocalCache = (key) => localStorage.getItem(key);

export const clearLocalCache = () => localStorage.clear();