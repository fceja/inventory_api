import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";

import "@configs/EnvConfig";
import _Request from "@appTypes/CustomExpress";
import indexRouter from "@routes/IndexRouter";
import { swaggerConfig } from "@configs/SwaggerConfig";

// init
const port = process.env.SERVER_PORT;
const app: Application = express();

// middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    name: "app-session",
    secret: process.env.SESSION_COOKIE_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

// routes
app.use("/api", indexRouter);

// serve
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
