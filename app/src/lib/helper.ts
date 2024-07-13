export const getRemainingDay = (targetDateStr: string) => {
    let differenceDays: number = 0;
    const targetDate = new Date(targetDateStr);
    const currentDate = new Date();
    const differenceMs: number = targetDate.getTime() - currentDate.getTime();
    differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
};
