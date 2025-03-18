import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Node.js API with Swagger",
    version: "1.0.0",
    description:
      "API documentation using Swagger in a Node.js TypeScript project.",
  },
  servers: [
    {
      url: "https://bookmyshowinoffice.onrender.com", // Your Render URL
      description: "Production Server",
    },
    {
      url: "http://localhost:3000", // Local development server
      description: "Local Development",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at /api-docs");
};
