import login from './login.js';
import refreshToken from './refreshToken.js';

const pathAccount = {
  '/login': {
    ...login,
  },
  '/refresh-token': {
    ...refreshToken
  }
};

export default pathAccount;
