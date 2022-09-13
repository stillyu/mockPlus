export const getRandom = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getRandomWithLength = (max: number, length: number) => {
    const random = Math.floor(Math.random() * max);
    return `${random}`.padStart(length, '0');
}