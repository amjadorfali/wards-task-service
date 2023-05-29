import express from "express";
import helmet from "helmet";
import { standardLimiter } from "./utils/rateLimiters";
import { healthTaskRoute } from "./routes/healthTask";
import bodyParser from "body-parser";

require("dotenv").config();
const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use("/api/task/health", standardLimiter, healthTaskRoute);

