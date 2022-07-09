const dev = {
  url: {
    landing: "http://localhost:3001",
  },
};

const prod = {
  url: {
    landing: "https://www.phishmeifyoucan.com",
  },
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  ...config,
};
