export const setLocalStorage = (key: string, value: any) => {
    if (chrome.storage) {
        chrome.storage.local.set({ [key]: value });
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export function getLocalStorage<T>(key: string, defaultValue?: T): Promise<T> {
    return new Promise((resolve, reject) => {
        if (chrome.storage) {
            chrome.storage.local.get([key], (result) => {
                if (result[key]) {
                    resolve(result[key]);
                } else {
                    resolve(defaultValue as T);
                }
            });
        } else {
            const value = localStorage.getItem(key);
            if (value) {
                try {
                    resolve(JSON.parse(value) as T);
                } catch (e) {
                    resolve(defaultValue as T);
                }
            } else {
                resolve(defaultValue as T);
            }
        }
    })
}   