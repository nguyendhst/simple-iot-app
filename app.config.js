import 'dotenv/config';

export default {
  // ...other configurations
  extra: {
    apiKey: process.env.API_KEY,
    apiUsr: process.env.API_USR,
  },
};
