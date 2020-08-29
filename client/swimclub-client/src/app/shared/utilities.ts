

export function militaryTimeToString(time: number): string {
  if (time < 0 || time >= 2400) return "Invalid Time"

  let hour = time / 100;
  let minute = time % 100;

  let basicHour = Math.floor(hour % 12)
  
  let hourString = hour > 0 ? (basicHour > 0 ? String(basicHour) : "12") : "00";
  let minuteString = minute > 0 ? String(minute) : "00";

  return `${hourString}:${minuteString} ${hour >= 12 ? "PM":"AM"}`
}  

