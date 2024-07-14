export const getRemainingDay = (targetDateStr: string) => {
    let differenceDays: number = 0;
    const targetDate = new Date(targetDateStr);
    const currentDate = new Date();
    const differenceMs: number = targetDate.getTime() - currentDate.getTime();
    differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    if(differenceDays < 0 ){
        differenceDays = 0
    }

    return differenceDays;
};


export function generateDatesArray(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export function mapRegistrationData(datesArray: Date[], registrationData: { date: string; count: number }[]): { day: string, registration: number }[] {
    const registrationMap = new Map(registrationData.map(item => [item.date, item.count]));

    return datesArray.map(date => {
        const day = ("0" + date.getDate()).slice(-2); // Format day to two digits
        const dateString = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        return {
            day: day,
            registration: registrationMap.get(dateString) || 0 // Default to 0 if no registration data found for that day
        };
    });
}

export function calculateDailyCounts(registrations: { id : string , createdAt: Date | undefined }[]): { date: string; count: number }[] {
    const countsMap = new Map<string, number>();

    registrations?.forEach(reg => {
        const dateStr = reg.createdAt?.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        if (countsMap.has(dateStr??"")) {
            countsMap.set(dateStr?? "", countsMap.get(dateStr ?? "")! + 1);
        } else {
            countsMap.set(dateStr??"", 1);
        }
    });

    return Array.from(countsMap, ([date, count]) => ({ date, count }));
}

