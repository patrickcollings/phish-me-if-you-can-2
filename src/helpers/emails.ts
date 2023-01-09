import { Email } from "models/Email";
import { TOTAL_NORMAL_EMAILS, TOTAL_SCAM_EMAILS } from "./constants";
import { cyrb128, getRandomTime, orderListByTime } from "./helper";

const scamList = [
  {
    subject: "Renewal Successful",
    name: "Norton Software Security",
    email: "norton.support@gmail.com",
    to: "you",
    template: "norton-renewal",
    description:
      "The sender of this email is norton.support@gmail.com which is not an official email. Anyone can setup a Gmail account without having to verify who they are. These sort of scams are trying to get you to pay money for a service that you may actually have by scaring you into action. In this case by saying that you have already paid a lot of money for a renewal. They will then get you on the phone to extract money from you.",
  },
  {
    subject: "Problem with your account",
    name: "Paypal Support",
    email: "technical.support@palpay.com",
    to: "you",
    body: "body 2",
    template: "paypal-problem-with-your-account",
    description:
      "Firstly the sender of this email is technical.support@palpay.com, look at the fact it says palpay and paypal, a commonly used trick. This is quite a clever scam where they show you the whole link in full. But when you click the link it will actually take you to a different website. This is why it's important to double check a link AND the URL of the website you arrive at.",
  },
  {
    subject: "£5 from us to you",
    name: "PayPal",
    email: "mail.paypal.co.uk",
    to: "you",
    body: "body 5",
    template: "paypal-free-five-pound",
    description:
      "This is a real scam that made it's way through to my inbox last year. The link takes you to a website https://epl.paypal-communication.com yet it is sent from mail.paypal.co.uk. The scammers were able to use a real address to send the email so these sort of scams you have to be very wary of. If it seems too good to be true then it probably is. And as always double check the website URL that you are on.",
  },
  {
    subject: "Please update your Spotify password.",
    name: "no-reply",
    email: "support@royal-intermodal.com",
    to: "you",
    template: "spotify-reset-password",
    description:
      "Firstly the sender of this email is support@royal-intermodal.com, which has no affiliation to Spotify. It also suggests you can reset your password by using the old one. If you are resetting a password you should never use an old one. In this scam they are trying to catch lazy people who don't want to create a new password and simply type in their old one when prompted.",
  },
  {
    subject: "Someone has tried to reset your password",
    name: "MyFitnessPal",
    email: "no-reply@rnyfitnesspal.com",
    to: "you",
    template: "myfitnesspal-someone-reset-password",
    description:
      "This scam works by getting you to ring a scammer's number and provide a code to reset your password. The scammers will get you on the phone and while they have you there they will be resetting your password in the background and getting you to read out the real code to them.",
  },
  {
    subject: "URGENT",
    name: "Laura Simpson",
    email: "laura.simpson@gmail.com",
    to: "andrew@startup.com",
    template: "spear-phishing-1",
    description:
      "This type of scam is called spear phishing. It is where a person is specifically targeted (most often at work) due to their role or access within a company. In this case a scammer is pretending to be someone else in the company but they are using a Gmail account instead. They use urgency to force someone in the finance department to make a transaction on their behalf without checking with their boss to see if it's real first. ALWAYS double check, before sending money to anyone.",
  },
  {
    subject: "Verified Twitter has messaged you",
    name: "Twitter",
    email: "verified@twittersupport.co.uk",
    to: "you",
    template: "twitter-verified-user-mentioned-you",
    description:
      "The sender is verified@twittersupport.co.uk which is not the real twitter domain. This is a simple scam forcing you to take action in order to not lose your account. It will often lead to a website which looks completely identical to Twitter but is owned by the scammers.",
  },
  {
    subject: "HMRC Tax Refund | Claim Your Tax Refund | P800 application",
    name: "no-reply@hmrc.gov.uk",
    email: "service@online.com",
    to: "you",
    template: "changes-to-your-health-benefits",
    description:
      "This scam is still very common as of 2022. The link does not take you to an official gov.uk website. Also, while the name of the email sender is a real one the email address is different. Anyone can give themselves an official looking name but the real from address is a give away here.",
  },
  {
    subject: "Quotation required now",
    name: "mike",
    email: "mike@fastwindows.co.uk",
    to: "you",
    template: "quotation-required",
    attachment: true,
    attachmentExtension: "pdf",
    attachmentName: "quote",
    description:
      "This scam works by getting you to open the PDF. From within the PDF the scammer can lead you with links to a fake website where they will try to steal your password.",
  },
  {
    subject: "Please fix delivery address",
    name: "no-reply",
    email: "no-reply@deliveryone.com",
    to: "you",
    template: "wrong-delivery-address",
    attachment: true,
    attachmentExtension: "iso",
    attachmentName: "IMG_123QW990LLC5K",
    description:
      "Be very careful of these scams. The attached file is actually an .iso file and not an image as you'd be led to believe. The blurry image within the email makes you think that the attachment is the same image but not blurry. ISO files allow scammers to install malicious software on your computer, compromising all of your private information.",
  },
  {
    subject: "My Company",
    name: "Danny Cummings",
    email: "danmingsesq@gmail.com",
    to: "you",
    template: "looking-for-local-supplier",
    description:
      "This scam first waits for you to reply to an email asking if you are available. It is very well worded and someone has clearly put a lot of effort in to it but there is a few giveaways: mentioning that 'this isn't illegal', talking about all the money we can make and using industry jargon (such as the chemical compound: Gedoroxin Herbal Extract G 55) to make themselves seem official and trustworthy. This is one of those scams that is just too good to be true therefore somethings not right. You have to ask yourself why would this person email a random stranger from the internet asking them to do this.",
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
    subject: "are you free?",
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

const date = new Date();
const month = date.toLocaleString("default", { month: "long" }).toLowerCase();
const year = date.getFullYear();
const seed = cyrb128(`${month}/${year}`)[0];

Math.seed = function (s: number) {
  return function () {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
};

const random1 = Math.seed(seed);
const random2 = Math.seed(random1());
Math.random = Math.seed(random2());

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // not inclusive of the max number
}

function getRandomIndexes(count: number, max: number) {
  const arr = [];
  while (arr.length < count) {
    const r = getRandomInt(0, max);
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

const monthlyScamEmailIndexes = getRandomIndexes(
  TOTAL_SCAM_EMAILS,
  scamList.length
);
const monthlyNormalEmailIndexes = getRandomIndexes(
  TOTAL_NORMAL_EMAILS,
  normalList.length
);

const monthlyScamList = monthlyScamEmailIndexes.map((index) => scamList[index]);
const monthlyNormalList = monthlyNormalEmailIndexes.map(
  (index) => normalList[index]
);

const addDefaults = (email: any, scam: boolean) => {
  email.read = false;
  email.scam = scam;
  email.time = getRandomTime();
  return email;
};

let emails = [
  ...monthlyScamList.map((email) => addDefaults(email, true)),
  ...monthlyNormalList.map((email) => addDefaults(email, false)),
];

emails = emails.map((email, index) => {
  email.id = index;
  return email;
});

orderListByTime(emails);

export default <Email[]>emails;
