import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory API Documentation",
      version: "1.0.0",
      description:
        "API documentation for Inventory API using Node.js & Express.js",
    },
    servers: [
      {
        url: "http://localhost:3000", // Adjust the URL as needed
      },
    ],
  },

  // paths to API docs and route files
  apis: ["./src/routes/*.ts"],
};

export const swaggerConfig = swaggerJSDoc(options);
