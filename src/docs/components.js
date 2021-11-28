/* eslint-disable no-useless-escape */
const components = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      id: {
        type: "number",
        description: "Pass an id",
        example: 1,
      },
      Account: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "email user",
            example: "quantran2381@gmail.com",
          },
          password: {
            type: "string",
            description: "password user",
            example: "123456",
          },
        },
      },
      Bookings: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "title",
            example: "Booking Review 1",
          },
          place: {
            type: "string",
            description: "place booking",
            example: "123456",
          },
          status: {
            type: "string",
            description: "password user",
            example: "Pending",
          }
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
  },
};

export default components;
