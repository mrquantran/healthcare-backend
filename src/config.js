// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 3000;

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "mysecret";
export const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "myrefreshsecret";

export const clientURL = process.env.CLIENT_URL || "http://localhost:";

// export const db = {
//   name: process.env.DB_NAME || '',
//   host: process.env.DB_HOST || '',
//   port: process.env.DB_PORT || '',
//   user: process.env.DB_USER || '',
//   password: process.env.DB_USER_PWD || '',
// };

export const corsUrl = process.env.CORS_URL || "*";

export const tokenInfo = {
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || "3650d", //1h
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || "3650d",
};
