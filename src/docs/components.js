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
          category: {
            type: "string",
            description: "category",
            example: "Health Talk",
          },
          date: {
            type: 'array',
            description: 'Date',
            example: '["1/11/2021","1/12/2022","1/12/2023"]'
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
      Category: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "title",
            example: "HealthTalk",
          },
        },
      },
      Feedback: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "description",
            example: "Description why reject",
          },
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
