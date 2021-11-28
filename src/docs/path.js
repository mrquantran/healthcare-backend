import account from './account/index.js';
import bookings from "./booking/index.js"

const path = {
  paths: {
    ...account,
    ...bookings
  },
};

export default path;
