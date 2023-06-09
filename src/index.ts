import express from "express";
import helmet from "helmet";
import { standardLimiter } from "./utils";
import { healthTaskRoute } from "./routes/healthTask";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";

require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use("/api/task/health", standardLimiter, healthTaskRoute);

app.use(helmet());
app.use(errorHandler);


app.listen(8700, () => console.log("app started with port 8700"));
