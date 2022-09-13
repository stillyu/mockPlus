import { generateName, generateAddress, generateCity, generateEmail, generatePhone } from '@/views/profile/utils';
import { generateIdCardNumFromStorage } from '@/views/idcard/utils';
import { HISTORY_KEYS } from '@/utils/constants';
import { ISettingFormData, defaultSetting } from '@/views/setting';
import { getLocalStorage } from '@/utils/localStorage';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        type: 'normal',
        title: 'Mock Plus',
        id: 'Mock Plus',
        contexts: ['editable'],
    });
    chrome.contextMenus.create({
        parentId: 'Mock Plus',
        type: 'normal',
        title: '身份证号',
        id: HISTORY_KEYS.ID_CARD,
        contexts: ['editable'],
    });
    chrome.contextMenus.create({
        parentId: 'Mock Plus',
        type: 'normal',
        title: '姓名',
        id: HISTORY_KEYS.NAME,
        contexts: ['editable'],
    });
    chrome.contextMenus.create({
        parentId: 'Mock Plus',
        type: 'normal',
        title: '手机号',
        id: HISTORY_KEYS.PHONE,
        contexts: ['editable'],
    });
    chrome.contextMenus.create({
        parentId: 'Mock Plus',
        type: 'normal',
        title: '邮箱',
        id: HISTORY_KEYS.EMAIL,
        contexts: ['editable'],
    });
    chrome.contextMenus.create({
        parentId: 'Mock Plus',
        type: 'normal',
        title: '省市区',
        id: HISTORY_KEYS.CITY,
        contexts: ['editable'],
    });
    chrome.contextMenus.create({
        parentId: 'Mock Plus',
        type: 'normal',
        title: '地址',
        id: HISTORY_KEYS.ADDRESS,
        contexts: ['editable'],
    });

    chrome.contextMenus.onClicked.addListener((info) => {
        switch (info.menuItemId) {
            case HISTORY_KEYS.ID_CARD:
                generateIdCardNumFromStorage().then((id) => {
                    sendMessage('generate', id);
                });
                break;
            case HISTORY_KEYS.NAME:
                sendMessage('generate', generateName());
                break;
            case HISTORY_KEYS.PHONE:
                sendMessage('generate', generatePhone());
                break;
            case HISTORY_KEYS.EMAIL:
                sendMessage('generate', generateEmail());
                break;
            case HISTORY_KEYS.ADDRESS:
                sendMessage('generate', generateAddress());
                break;
            case HISTORY_KEYS.CITY:
                sendMessage('generate', generateCity());
                break;
            default:
                break;
        }
    })

    getLocalStorage<ISettingFormData>('setting', defaultSetting).then((setting) => {
        updateMenu(setting);
    })

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes['setting']) {
            const setting = changes['setting'].newValue as ISettingFormData;
            updateMenu(setting);
        }
    });
})

const updateMenu = (setting: ISettingFormData) => {
    console.log("🚀 ~ updateMenu ~ setting", setting);
    if (setting.contextMenus.length === 0 || !setting.enableContextMenu) {
        chrome.contextMenus.update('Mock Plus', { visible: false });
    } else {
        chrome.contextMenus.update('Mock Plus', { visible: true });
        chrome.contextMenus.update(HISTORY_KEYS.ID_CARD, { visible: setting.contextMenus.includes(HISTORY_KEYS.ID_CARD) });
        chrome.contextMenus.update(HISTORY_KEYS.NAME, { visible: setting.contextMenus.includes(HISTORY_KEYS.NAME) });
        chrome.contextMenus.update(HISTORY_KEYS.PHONE, { visible: setting.contextMenus.includes(HISTORY_KEYS.PHONE) });
        chrome.contextMenus.update(HISTORY_KEYS.EMAIL, { visible: setting.contextMenus.includes(HISTORY_KEYS.EMAIL) });
        chrome.contextMenus.update(HISTORY_KEYS.ADDRESS, { visible: setting.contextMenus.includes(HISTORY_KEYS.ADDRESS) });
        chrome.contextMenus.update(HISTORY_KEYS.CITY, { visible: setting.contextMenus.includes(HISTORY_KEYS.CITY) });
    }
}

const sendMessage = (action: 'generate', payload: any) => {
    console.log("🚀 ~ sendMessage ~ payload", payload);
    chrome.runtime.sendMessage({ action, payload });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(Number(tabs[0].id), { action, payload });
    });
};

export { }