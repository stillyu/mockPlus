import moment from 'moment';
import { HISTORY_KEYS } from './constants'
import { getLocalStorage, setLocalStorage } from './localStorage';

export interface IHistory {
    value: string;
    time: string;
}

export const pushHistory = (key: HISTORY_KEYS, value: string) => {
    Promise.all([getLocalStorage<Array<IHistory>>(key, []), getLocalStorage<{ enableHistory: boolean }>('setting', { enableHistory: true })]).then(([history, setting]) => {
        if (setting.enableHistory) {
            setLocalStorage(key, [{ value, time: moment().format('YYYY-MM-DD HH:mm:ss') }, ...history])
        }
    })
}

export const getHistory = (key: HISTORY_KEYS) => {
    return getLocalStorage<Array<IHistory>>(key, [])
}

export const clearHistory = (key: HISTORY_KEYS) => {
    setLocalStorage(key, [])
}

export const clearAllHistory = () => {
    clearHistory(HISTORY_KEYS.ID_CARD);
    clearHistory(HISTORY_KEYS.NAME);
    clearHistory(HISTORY_KEYS.PHONE);
    clearHistory(HISTORY_KEYS.EMAIL);
    clearHistory(HISTORY_KEYS.CITY);
    clearHistory(HISTORY_KEYS.ADDRESS);
}