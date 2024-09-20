export const formatViewers = (num: number) => {
    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + ' ming';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + ' mln';
    }
    return num;
};