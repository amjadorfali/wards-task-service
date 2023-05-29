import express from "express";
import helmet from "helmet";
import { standardLimiter } from "./utils/rateLimiters";
import { healthTaskRoute } from "./routes/healthTask";

require("dotenv").config();
const app = express();
app.use(helmet());
app.use("/api/task/health", standardLimiter, healthTaskRoute);

