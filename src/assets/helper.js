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

export const getScoreTitle = (score) => {
  if (score < 0)
    return 'you should be forbidden from the internet...';
  if (score >= 0 && score < 10)
    return 'you should be forbidden from reading your emails...';
  if (score >= 10 && score < 30)
    return 'you are a bit of a dinosaur...';
  if (score >= 30 && score < 60)
    return 'you might want to practice again next month';
  if (score >= 60 && score < 80)
    return 'you can do better than that';
  if (score >= 80 && score < 90)
    return 'you are so close yet so far';
  if (score >= 90 && score < 100)
    return 'not too shabby';
  if (score >= 100)
    return 'you are unhackable';

  return 'uncharted territory';
} 
