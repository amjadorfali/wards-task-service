import express from "express";
import helmet from "helmet";
import { standardLimiter } from "./utils";
import { healthTaskRoute } from "./routes/healthTask";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { userRoute } from "./routes/user";
import { teamRoute } from "./routes/team";
import cors from "cors";

require("dotenv").config();
const app = express();
//TODO: Remove from Production
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get("/api/health-check", (req, res) => res.sendStatus(200));
app.use("/api/task/health", standardLimiter, healthTaskRoute);
app.use("/api/team/", standardLimiter, teamRoute);
app.use("/api/me/", standardLimiter, userRoute);
app.use(helmet());
app.use(errorHandler);


app.listen(8700, () => console.log("app started with port 8700"));
