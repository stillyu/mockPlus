import { useEffect, useState } from "react";

function useChromeStorageState<T>(key: string, defaultValue: T) {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        chrome.storage.local.get([key], (result) => {
            console.log("🚀 ~ chrome.storage.local.get ~ result", result);
            if (result[key]) {
                console.log("🚀 ~ chrome.storage.local.get ~ result[key]", result[key]);
                setState({ ...result[key] });
            }
        });
    }, []);

    const updateState = (value: T) => {
        chrome.storage.local.set({ [key]: value }, () => {
            setState(value);
        });
    };

    chrome.storage.onChanged.addListener((changes) => {
        if (changes[key]) {
            setState(changes[key].newValue);
        }
    })

    return [state, updateState] as const;
}


function useLocalStorageState<T>(key: string, defaultValue: T) {
    const [state, setState] = useState<T>(() => {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value) as T;
            } catch (e) {
                return defaultValue;
            }
        } else {
            return defaultValue;
        }
    });

    const updateState = (value: T) => {
        try {
            setState(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(e);
        }
    };

    return [state, updateState] as const;
}

function useStorageState<T>(key: string, defaultValue: T) {
    if (chrome.storage) {
        return useChromeStorageState(key, defaultValue);
    } else {
        return useLocalStorageState(key, defaultValue);
    }
}

export default useStorageState;