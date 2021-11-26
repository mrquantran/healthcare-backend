// user
import { TYPE_USER } from "./../src/api/constant/ENUM.js";

const users = [
  {
    email: "quantran2381@gmail.com",
    firstName: "Quan",
    lastName: "Tran",
    password: "123456",
    type: TYPE_USER.user,
  },
  {
    email: "adminuser@gmail.com",
    firstName: "admin",
    lastName: "quan",
    password: "Admin@1234",
    type: TYPE_USER.admin,
  },
  {
    email: "quantranUser@gmail.com",
    firstName: "Quan",
    lastName: "Tran User",
    password: "123456",
    type: TYPE_USER.user,
  },
];

export const data = { users };
