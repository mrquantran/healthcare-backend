// user
import { STATUS, TYPE_USER } from "./../src/api/constant/ENUM.js";

const users = [
  {
    email: "quantran2381@gmail.com",
    firstName: "Quan",
    lastName: "Tran",
    password: "123456",
    type: TYPE_USER.user,
  },
  {
    email: "quangdo2000@gmail.com",
    firstName: "Quang",
    lastName: "Do",
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
    email: "quantranuser@gmail.com",
    firstName: "Quan",
    lastName: "Tran User",
    password: "123456",
    type: TYPE_USER.user,
  },
];

const bookingCategory = [
  {
    name: 'HealthTalk',
    description: 'Description of category'
  },
  {
    name: 'Wellness Events',
    description: 'Description of category'
  },
  {
    name: 'Fitness Activites',
    description: 'Description of category'
  }
];

const bookings = [
  {
    place: 'Ho Chi Minh',
    title: 'Booking Review 1',
    user: 'quantran2381@gmail.com',
    category: 'HealthTalk',
    status: STATUS.pending,
    date: ['2021-11-26T19:20:30.451Z', '2021-11-27T19:20:30.451Z', '2021-11-28T19:20:30.451Z']
  },
  {
    place: 'Ho Chi Minh',
    title: 'Booking Review 0',
    user: 'quantran2381@gmail.com',
    category: 'Wellness Events',
    status: STATUS.pending,
    date: ['2021-11-26T19:20:30.451Z', '2021-11-27T19:20:30.451Z', '2021-11-28T19:20:30.451Z']
  },
  {
    place: 'Ho Chi Minh',
    user: 'quantran2381@gmail.com',
    title: 'Booking Review 2',
    category: 'Fitness Activites',
    status: STATUS.reject,
    date: ['2021-11-26T19:20:30.451Z', '2021-11-27T19:20:30.451Z', '2021-11-28T19:20:30.451Z']
  },
  {
    place: 'Ho Chi Minh',
    user: 'quantran2381@gmail.com',
    title: 'Booking Review 3',
    category: 'Fitness Activites',
    status: STATUS.approve,
    date: ['2021-11-26T19:20:30.451Z', '2021-11-27T19:20:30.451Z', '2021-11-28T19:20:30.451Z']
  },
  {
    place: 'Ho Chi Minh',
    user: 'quantran2381@gmail.com',
    title: 'Booking Review 4',
    category: 'HealthTalk',
    status: STATUS.approve,
    date: ['2021-11-26T19:20:30.451Z', '2021-11-27T19:20:30.451Z', '2021-11-28T19:20:30.451Z']
  },
  {
    place: 'Ho Chi Minh',
    user: 'quantran2381@gmail.com',
    title: 'Booking Review 5',
    category: 'Fitness Activites',
    status: STATUS.approve,
    date: ['2021-11-26T19:20:30.451Z', '2021-11-27T19:20:30.451Z', '2021-11-28T19:20:30.451Z']
  },
  {
    place: 'Ho Chi Minh',
    user: 'quantran2381@gmail.com',
    title: 'Booking Review 6',
    category: 'Wellness Events',
    status: STATUS.approve,
    date: ['2021-11-26T19:20:30.451Z', '2021-11-27T19:20:30.451Z', '2021-11-28T19:20:30.451Z']
  },

]

export const data = { users, bookingCategory, bookings };
