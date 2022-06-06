import { getRandomTime } from "./helper";

const scamList = [
  {
    subject: "Renewal Successful",
    name: "Norton Software Security",
    email: "norton.support@gmail.com",
    to: "you",
    template: "norton-renewal",
  },
  {
    subject: "Problem with your account",
    name: "Paypal Support",
    email: "technical.support@palpay.com",
    to: "you",
    body: "body 2",
    template: "paypal-problem-with-your-account",
  },
  {
    subject: "£5 from us to you",
    name: "PayPal",
    email: "mail.paypal.co.uk",
    to: "you",
    body: "body 5",
    template: "paypal-free-five-pound",
  },
  {
    subject: "Please update your Spotify password.",
    name: "no-reply",
    email: "support@royal-intermodal.com",
    to: "you",
    template: "spotify-reset-password",
  },
  {
    subject: "Someone has tried to reset your password",
    name: "MyFitnessPal",
    email: "no-reply@rnyfitnesspal.com",
    to: "you",
    template: "myfitnesspal-someone-reset-password",
  },
  {
    subject: "URGENT",
    name: "Laura Simpson",
    email: "laura@startup.com",
    to: "andrew@startup.com",
    template: "spear-phishing-1",
  },
  {
    subject: "Verified Twitter has messaged you",
    name: "Twitter",
    email: "verified@twittersupport.co.uk",
    to: "you",
    template: "twitter-verified-user-mentioned-you",
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

let emails = [
  ...scamList.map((email) => addDefaults(email, true)),
  ...normalList.map((email) => addDefaults(email, false)),
];

emails = emails.map((email, index) => {
  email['id'] = index;
  return email;
});

console.log(emails);

export default emails;