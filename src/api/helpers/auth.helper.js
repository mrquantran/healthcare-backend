import { accessTokenSecret } from '../../config.js';
import * as jwtHelper from './jwt.helper.js';

export function getAccessToken(req) {
  const authHeader = req.header('Authorization');
  const tokenFromClient = authHeader && authHeader.split(' ')[1];
  return tokenFromClient;
}

export async function getDecodedToken(req) {
  const token = await getAccessToken(req);
  const { data } = await jwtHelper.verifyToken(token, accessTokenSecret);
  return data;
}