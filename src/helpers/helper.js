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
    emailList.sort(compare);
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
    return 'time to get off the internet...';
  if (score >= 0 && score < 10)
    return 'ouch...';
  if (score >= 10 && score < 30)
    return 'really?';
  if (score >= 30 && score < 60)
    return "please be careful...";
  if (score >= 60 && score < 80)
    return 'keep trying...';
  if (score >= 80 && score < 90)
    return 'not bad...';
  if (score >= 90 && score < 100)
    return 'so close...';
  if (score >= 100)
    return 'Congratulations. You are ready for the internet!';

  return 'uncharted territory';
} 
