export function getRandomTime() {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
} 

function compare(a, b) {
  const aDate = new Date(a.time);
  const bDate = new Date(b.time);
  if (aDate.getTime() < bDate.getTime()) {
    return 1;
  }
  if (aDate.getTime() > bDate.getTime()) {
    return -1;
  }
  return 0;
}


export function orderListByTime(emailList) {
    if (!emailList) return;
    const t = emailList.sort(compare);
}

export function getHoursAndMinutes(time) {
    var date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
}

