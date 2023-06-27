import express from "express";
import helmet from "helmet";
import { standardLimiter } from "./utils";
import { healthTaskRoute } from "./routes/healthTask";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoute } from "./routes/user";
import { teamRoute } from "./routes/team";

require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use("/api/task/health", standardLimiter, healthTaskRoute);
app.use("/api/team/", standardLimiter, teamRoute);
app.use("/api/user/", standardLimiter, userRoute);

app.use(helmet());
app.use(errorHandler);


app.listen(8700, () => console.log("app started with port 8700"));
