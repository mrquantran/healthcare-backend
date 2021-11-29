import account from './account/index.js';
import bookings from "./booking/index.js"
import categories from "./categories/index.js"
import feedback from './feedback/index.js';

const path = {
  paths: {
    ...account,
    ...bookings,
    ...categories,
    ...feedback
  },
};

export default path;
