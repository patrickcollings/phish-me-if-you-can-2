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
    console.log(a.time, b.time);
  if (a.time.getTime() < b.time.getTime()) {
    return 1;
  }
  if (a.time.getTime() > b.time.getTime()) {
    return -1;
  }
  return 0;
}


export function orderListByTime(emailList) {
    if (!emailList) return;
    const t = emailList.sort(compare);
    console.log(t);
}

export function getHoursAndMinutes(time) {
    var date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
}

