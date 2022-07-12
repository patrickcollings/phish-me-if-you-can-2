import { getRandomTime } from "./helper";

const scamList = [
  {
    subject: "Renewal Successful",
    name: "Norton Software Security",
    email: "norton.support@gmail.com",
    to: "you",
    template: "norton-renewal",
    attachment: true,
    attachmentExtension: "exe",
    attachmentName: "openme",
    description: "This is a scam email because:",
  },
  {
    subject: "Problem with your account",
    name: "Paypal Support",
    email: "technical.support@palpay.com",
    to: "you",
    body: "body 2",
    template: "paypal-problem-with-your-account",
    description: "This is a scam email because:",
  },
  {
    subject: "£5 from us to you",
    name: "PayPal",
    email: "mail.paypal.co.uk",
    to: "you",
    body: "body 5",
    template: "paypal-free-five-pound",
    description: "This is a scam email because:",
  },
  {
    subject: "Please update your Spotify password.",
    name: "no-reply",
    email: "support@royal-intermodal.com",
    to: "you",
    template: "spotify-reset-password",
    description: "This is a scam email because:",
  },
  {
    subject: "Someone has tried to reset your password",
    name: "MyFitnessPal",
    email: "no-reply@rnyfitnesspal.com",
    to: "you",
    template: "myfitnesspal-someone-reset-password",
    description: "This is a scam email because:",
  },
  {
    subject: "URGENT",
    name: "Laura Simpson",
    email: "laura@startup.com",
    to: "andrew@startup.com",
    template: "spear-phishing-1",
    description: "This is a scam email because:",
  },
  {
    subject: "Verified Twitter has messaged you",
    name: "Twitter",
    email: "verified@twittersupport.co.uk",
    to: "you",
    template: "twitter-verified-user-mentioned-you",
    description: "This is a scam email because:",
  },
];

const normalList = [
  {
    subject: "Your Royal Mail parcel delivery update",
    name: "Royal Mail",
    email: "no-reply@royalmail.com",
    to: "you",
    template: "royalmail-requested-redelivery",
  },
  {
    subject: "We have been unable to add or update your bank account details",
    name: "service@paypal.co.uk",
    email: "service@paypal.co.uk",
    to: "you",
    template: "paypal-unable-to-update-bank-details",
  },
  {
    subject: "need urgent help!",
    name: "Sally Thompson",
    email: "sally.t.55@gmail.com",
    to: "you",
    template: "grandma-need-help",
  },
  {
    subject: "James: You have an unused Prime benefit",
    name: "Amazon.co.uk",
    email: "amazon-offers@amazon.co.uk",
    to: "you",
    template: "amazon-you-have-benefits",
  },
  {
    subject:
      "Did your recent Amazon order meet your expectations? Review it on Amazon",
    name: "Amazon.co.uk",
    email: "donotreply@amazon.co.uk",
    to: "you",
    template: "amazon-review-product",
  },
  {
    subject:
      "Important document added to your library in My Barclays documents. Account number ending ****6789",
    name: "Barclays Bank Alerts",
    email: "email.correspondence@assure4.barclays.co.uk",
    to: "you",
    template: "barclays-important-document-added",
  },
];

const addDefaults = (email, scam) => {
  email['read'] = false;
  email['scam'] = scam;
  email['time'] = getRandomTime();
  return email;
}  

function cyrb128(str) {
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

const date = new Date();
const month = date.toLocaleString("default", { month: "long" }).toLowerCase();
const year = date.getFullYear();

const seed = cyrb128(`${month}/${year}`)[0];

Math.seed = function (s) {
  return function () {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
};

var random1 = Math.seed(seed);
var random2 = Math.seed(random1());
Math.random = Math.seed(random2());

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // not inclusive of the max number
}

function getRandomIndexes(count, max) {
  let arr = [];
  while (arr.length < count) {
    var r = getRandomInt(0, max);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

const monthlyScamEmailIndexes = getRandomIndexes(5, scamList.length);
const monthlyNormalEmailIndexes = getRandomIndexes(5, normalList.length);

const monthlyScamList = monthlyScamEmailIndexes.map((index) => scamList[index]);
const monthlyNormalList = monthlyNormalEmailIndexes.map((index) => normalList[index]);

let emails = [
  ...monthlyScamList.map((email) => addDefaults(email, true)),
  ...monthlyNormalList.map((email) => addDefaults(email, false)),
];

emails = emails.map((email, index) => {
  email['id'] = index;
  return email;
});

export default emails;
