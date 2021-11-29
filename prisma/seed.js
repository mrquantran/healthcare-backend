import pkg from "@prisma/client";
import bcrypt from "bcrypt";

import { data } from "./data.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  // delete all data
  await prisma.token.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.categories.deleteMany({});
  await prisma.bookingCategory.deleteMany({});
  await prisma.bookingDate.deleteMany({});
  await prisma.booking.deleteMany({});


  // users
  for (const user of data.users) {
    const saltRounds = await bcrypt.genSalt(10);

    // // now we set user password to hashed password
    const hash = bcrypt.hashSync(user.password, saltRounds);

    await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: hash,
        active: true,
        type: user.type,
      },
    });
  }

  // category
  for (const category of data.bookingCategory) {
    await prisma.categories.create({
      data: {
        title: category.name,
        description: category.description
      },
    });
  }

  // //booking
  // for (const booking of data.bookings) {
  //   await prisma.booking.create({
  //     data: {
  //       title: booking.title,
  //       place: booking.place,
  //       status: booking.status,
  //       user: {
  //         connect: {
  //           email:booking.user
  //         }
  //       },
  //       date: {
  //         create: booking.date.map((item) => ({
  //           startDate: item,
  //         }))
  //       },
  //     },
  //   });
  // }

}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
