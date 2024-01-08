export const convertDate = (date: string) => {
    const selectedDate = new Date(date);
    const offsetHours = String(Math.floor(selectedDate.getTimezoneOffset() / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(selectedDate.getTimezoneOffset() % 60)).padStart(2, '0');
    const offsetSign = selectedDate.getTimezoneOffset() < 0 ? '+' : '-';
    const formattedDateString = `${selectedDate.toISOString().substring(0, 19)}${offsetSign}${offsetHours}:${offsetMinutes}`;
    
    return formattedDateString
};
