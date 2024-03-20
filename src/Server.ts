import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";

import "@configs/EnvConfig";
import _Request from "@appTypes/CustomExpress";
import indexRouter from "@routes/IndexRouter";
import { swaggerConfig } from "@configs/SwaggerConfig";

// init
const port = process.env.SERVER_PORT;
const app: Application = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

// middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// routes
app.use("/api/v1", indexRouter);

// serve
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
