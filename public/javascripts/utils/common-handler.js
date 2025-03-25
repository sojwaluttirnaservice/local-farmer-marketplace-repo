
const storeItem = (key, storeData) => {
    try {
        localStorage.setItem(key, JSON.stringify(storeData))
        return true;
    } catch (err) {
        console.error('Error:', err);
        return false;
    }
}


const getItem = (key) => {
    let storedData = localStorage.getItem(key);
    if (storedData) {
        return JSON.parse(storedData)
    }
    return null;
}


const removeItem = (key) => {
    localStorage.removeItem(key)
}

export {
    storeItem,
    getItem,
    removeItem
}