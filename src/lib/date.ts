const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SHORT_MONTHS = MONTHS.map((month) => month.slice(0, 3));

function ordinalSuffix(day: number): string {
  const rem100 = day % 100;
  if (rem100 >= 11 && rem100 <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// "2024-07-23" -> "July 23rd, 2024"
export function formatLong(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}${ordinalSuffix(day)}, ${year}`;
}

// "2024-07-23" -> "Jul/2024"
export function formatShort(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return `${SHORT_MONTHS[month - 1]}/${year}`;
}
