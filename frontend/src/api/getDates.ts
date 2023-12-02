export const getDateToday = () => {
   const today: Date = new Date();

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return today.toLocaleDateString("en-US", options);
}

export const get7DaysAgo = () => {
   const today: Date = new Date();
   const sevenDaysAgo: Date = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
   return sevenDaysAgo.toLocaleDateString('en-US', options);
}

export function getDateDaysAgo(numDays: number): string {
   const today: Date = new Date();
   const daysAgo: Date = new Date(today.getTime() - numDays * 24 * 60 * 60 * 1000);

   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
   return daysAgo.toLocaleDateString('en-US', options);
}