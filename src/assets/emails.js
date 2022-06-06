import { getRandomTime } from "./helper";

export default [
  {
    id: 1,
    subject: "Renewal Successful super long subject name what what what",
    name: "Norton Software Security Super long email name",
    email: "norton.support@gmail.com",
    to: "you",
    template: "norton-renewal",
    scam: true,
    time: getRandomTime(),
    read: false,
  },
  {
    id: 2,
    subject: "Problem with your account",
    name: "Paypal Support",
    email: "technical.support@palpay.com",
    to: "you",
    body: "body 2",
    scam: true,
    time: getRandomTime(),
    read: false,
    template: "paypal-problem-with-your-account",
  },
  {
    id: 3,
    subject: "Your Royal Mail parcel delivery update",
    name: "Royal Mail",
    email: "no-reply@royalmail.com",
    to: "you",
    body: "body 3",
    scam: false,
    time: getRandomTime(),
    read: false,
    template: "royalmail-requested-redelivery",
  },
  {
    id: 4,
    subject: "We have been unable to add or update your bank account details",
    name: "service@paypal.co.uk",
    email: "service@paypal.co.uk",
    to: "you",
    body: "body 4",
    time: getRandomTime(),
    read: false,
    template: "paypal-unable-to-update-bank-details",
    scam: false,
  },
  {
    id: 5,
    subject: "£5 from us to you",
    name: "PayPal",
    email: "mail.paypal.co.uk",
    to: "you",
    body: "body 5",
    time: getRandomTime(),
    read: false,
    template: "paypal-free-five-pound",
    scam: true,
  },
  {
    id: 6,
    subject: "Please update your Spotify password.",
    name: "no-reply",
    email: "support@royal-intermodal.com",
    to: "you",
    body: "body 6",
    time: getRandomTime(),
    read: false,
    scam: true,
    template: "spotify-reset-password",
  },
  {
    id: 7,
    subject: "Someone has tried to reset your password",
    name: "MyFitnessPal",
    email: "no-reply@rnyfitnesspal.com",
    to: "you",
    body: "body 7",
    time: getRandomTime(),
    read: false,
    scam: true,
    template: "myfitnesspal-someone-reset-password",
  },
  {
    id: 8,
    subject: "URGENT",
    name: "Laura Simpson",
    email: "laura@startup.com",
    to: "andrew@startup.com",
    body: "body 8",
    time: getRandomTime(),
    read: false,
    scam: true,
    template: "spear-phishing-1",
  },
  {
    id: 9,
    subject: "Verified Twitter has messaged you",
    name: "Twitter",
    email: "verified@twittersupport.co.uk",
    to: "you",
    body: "body 9",
    time: getRandomTime(),
    read: false,
    scam: true,
    template: "twitter-verified-user-mentioned-you",
  },
];
