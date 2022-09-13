import moment from 'moment';
import { HISTORY_KEYS } from '@/utils/constants';
import { pushHistory } from '@/utils/history';
import { getRandom, getRandomWithLength } from '@/utils';
import { getLocalStorage } from '@/utils/localStorage';
import { IIDCardData } from '@/views/idcard'

export const defaultIdCardData: IIDCardData = {
    birthday: "",
    city: ["31", "3101", "310101"],
    age: [12, 30],
    sex: "女",
    default: true,
}

export const getAgeDateArea = (min: number, max: number) => {
    return [moment().subtract(max, 'year'), moment().subtract(min, 'year')]
}

export const getRandomDateFromAgeArea = (min: number, max: number) => {
    const area = getAgeDateArea(min, max);
    const days = area[1].diff(area[0], 'day');
    const random = getRandom(days);
    return area[0].add(random, 'day');
}

export const getSexCode = (sex: '男' | '女') => {
    if (sex === '男') {
        return [1, 3, 5, 7, 9][getRandom(5)];
    } else {
        return [0, 2, 4, 6, 8][getRandom(5)];
    }
}

export const getValidateCode = (str: string) => {
    const ratio = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const sum = str.split('').reduce((a, b, index) => a + Number(b) * ratio[index], 0);
    return ['1', '0', 'X ', '9', '8', '7', '6', '5', '4', '3', '2'][sum % 11];
}

export const generateIdCardNum = (city: string, birthday: moment.Moment, sex: '男' | '女') => {
    let str = `${city}${birthday.format('YYYYMMDD')}${getRandomWithLength(100, 2)}${getSexCode(sex)}`;
    const id = `${str}${getValidateCode(str)}`;
    pushHistory(HISTORY_KEYS.ID_CARD, id);
    return id;
}

export const generateIdCardNumFromStorage = (): Promise<string> => {
    return new Promise((resolve) => {
        getLocalStorage<IIDCardData>('idCardData', defaultIdCardData).then(idCardData => {
            const birthday =
                idCardData.birthday ? moment(idCardData.birthday) : getRandomDateFromAgeArea(idCardData.age[0], idCardData.age[1]);
            const id = generateIdCardNum(idCardData.city[2], birthday, idCardData.sex);
            resolve(id);
        })
    })


}