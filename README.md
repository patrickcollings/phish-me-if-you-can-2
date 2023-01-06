## What is PhishMeIfYouCan?
3.4 billion scam emails are sent every day. Email filters are constantly lagging behind as new scams and methods come out that bypass them. PhishMeIfYouCan is a game to teach people how to avoid scam emails. It mimicks an email inbox where users must find all the scam emails and add them to their scambox. They get 3 attempts to find all 5. Each month the game rotates through a new set of emails.

## Project Architecture
![phish-me-architecture](https://user-images.githubusercontent.com/30416464/211018608-da456fd3-c0aa-4956-9bcc-a0ca9d5c4682.PNG)

## How to setup
Add `.env.development` file to root directory with the environment variables required below.

`npm install`

`npm run start`

## Environment Variables
````
REACT_APP_LANDING_URL={Landing Page URL}
REACT_APP_MIXPANEL_ID={Mixpanel id}
REACT_APP_EMAIL_TEMPLATES_S3={Email Templates URL}
REACT_APP_MAIL_CHIMP_LIST={MailChimp Subscriber List ID}
````




