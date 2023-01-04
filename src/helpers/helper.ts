import { Email } from "models/Email";

export function getRandomTime() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
} 

function compare(a: Email, b: Email) {
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


export function orderListByTime(emailList: Email[]) {
    if (!emailList) return;
    emailList.sort(compare);
}

export function getHoursAndMinutes(time: Date) {
    var date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
}

export const getScoreTitle = (score: number) => {
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

// generate set of random numbers using a seed
export function cyrb128(str: string) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [
    (h1 ^ h2 ^ h3 ^ h4) >>> 0,
    (h2 ^ h1) >>> 0,
    (h3 ^ h1) >>> 0,
    (h4 ^ h1) >>> 0,
  ];
}

const emailColors = [
  "#6ddc6e",
  "#5b82d2",
  "#f7d9a3",
  "#01c1ae",
  "#ed5c9f",
  "#0d5850",
  "#730b0b",
  "#625c5b",
  "#46416a",
  "#5d5909",
];

export const getColor = (index: number) => {
  return emailColors[index];
}

export const getYearAndMonth = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${year}${month}`;
}