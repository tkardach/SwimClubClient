export function compareDate(date1: Date, date2: Date) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date))
    return false;

  let date = new Date(date1);
  let comp = new Date(date2);
  date.setHours(0,0,0,0);
  comp.setHours(0,0,0,0);

  if (date < comp) return -1;
  else if (date > comp) return 1;
  else return 0;
}

export function dateDiffDays(date1: Date, date2: Date) {
  var timeDiff = date2.getTime() - date1.getTime(); 
  return  Math.abs(timeDiff) / (1000 * 3600 * 24); 
}

export function militaryTimeToString(time: number): string {
  if (time < 0 || time >= 2400) return "Invalid Time"

  let hour = time / 100;
  let minute = time % 100;

  let basicHour = Math.floor(hour % 12)
  
  let hourString = hour > 0 ? (basicHour > 0 ? String(basicHour) : "12") : "00";
  let minuteString = minute > 0 ? String(minute) : "00";

  return `${hourString}:${minuteString} ${hour >= 12 ? "PM":"AM"}`
}  

export function getValidDate(test) {
  if(isNaN(test)){ 
    var dt=new Date(test);
    if(isNaN(dt.getTime())){ 
      return null;
    }else{
      return dt; 
    }
  } else{
    return new Date(Number(test));
  }
}

export function weekdayToString(day: number) {
  switch (day) {
    case 0: return 'Sunday';
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
  }
}