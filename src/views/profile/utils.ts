import { getRandom, getRandomWithLength } from '@/utils';
import { firstName, lastName } from '@/data/name.json';
import cityData from '@/data/city.json';
import emailData from '@/data/email.json'
import { pushHistory } from '@/utils/history';
import { HISTORY_KEYS } from '@/utils/constants';

const allCity: Array<string> = [];
cityData.forEach((province) => {
    province.children && province.children.forEach((city) => {
        city.children && city.children.forEach((area) => {
            allCity.push(`${province.name}${city.name}${area.name}`);
        })
    })
})

export const generateName = () => {
    const result = `${firstName[getRandom(firstName.length)]}${lastName[getRandom(lastName.length)]}`
    pushHistory(HISTORY_KEYS.NAME, result);
    return result;
}

export const generatePhone = () => {
    const result = `${['13', '15', '18'][getRandom(3)]}${getRandomWithLength(999999999, 9)}`
    pushHistory(HISTORY_KEYS.PHONE, result);
    return result;
}

export const generateEmail = () => {
    const result = `${emailData.userName[getRandom(emailData.userName.length)]}@${emailData.domain[getRandom(emailData.domain.length)]}`
    pushHistory(HISTORY_KEYS.EMAIL, result);
    return result;
}

export const generateCity = () => {
    const result = allCity[getRandom(allCity.length)];
    pushHistory(HISTORY_KEYS.CITY, result);
    return result;
}

export const generateAddress = () => {
    const street = ['解放路', '中山路', '建设路', '人民路', '和平路', '新华路', '工农路', '兴隆路', '长江路', '西大街', '东大街', '南大街', '北大街', '西关街', '东关街', '南关街', '北关街', '西环街', '东环街', '南环街', '北环街', '西环路', '东环路', '南环路', '北环路', '西环大道', '东环大道', '南环大道', '北环大道', '西环中路', '东环中路', '南环中路', '北环中路', '西环北路', '东环北路', '南环北路', '北环北路', '西环南路', '东环南路', '南环南路', '北环南路', '西环西路', '东环西路', '南环西路', '北环西路', '西环东路', '东环东路', '南环东路', '北环东路', '西环北大街', '东环北大街', '南环北大街', '北环北大街', '西环南大街', '东环南大街', '南环南大街', '北环南大街', '西环西大街', '东环西大街', '南环西大街', '北环西大街', '西环东大街', '东环东大街', '南环东大街', '北环东大街', '西环北关街', '东环北关街', '南环北关街', '北环北关街', '西环南关街', '东环南关街', '南环南关街', '北环南关街', '西环西关街', '东环西关街', '南环西关街', '北环西关街', '西环东关街', '东环东关街', '南环东关街', '北环']
    const village = ['西山美庐', '懿品阁', '本家润园', '天和人家', '龙熙顺景', '珠江国际城', '龙山新新小镇', '远洋山水', '正阳天下', '青庭', '山水文园', '万象新天', '康斯丹郡', '嘉豪国际中心', '华府景园', '宽HOUSE', '北欧印象', '领秀硅', '北京奥林匹克花园', '科南中心', '富顿中心', '西山美墅馆', '花样年华', '格林雅地', '昆泰国际中心', '金地国际花园', '建东苑', '天伦锦城', '柏林爱乐', '观澜国际花园', '知本时代', '太阳国际公馆', '倚林佳园', '峻峰华亭', '石榴园小区', '世桥国贸公寓', '京贸国际公寓', '万科青青家园', '金晖家园', '国瑞城', '华鼎世家']
    const result = `${street[getRandom(street.length)]}${getRandom(1000)}号${village[getRandom(village.length)]}${getRandom(1000)}室`;
    pushHistory(HISTORY_KEYS.ADDRESS, result);
    return result;
}