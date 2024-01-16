
let environment = process.env.ACTIVE_PROFILE;

if (!environment) {
  require('dotenv').config();
  environment = process.env.ACTIVE_PROFILE;
}
import { requestLogger } from "./middlewares/requestLogger";

import express from "express";
import helmet from "helmet";
import { standardLimiter } from "./utils";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/errorHandler";
import { healthTaskRoute } from "./routes/healthTask";
import { userRoute } from "./routes/user";
import { teamRoute } from "./routes/team";
import { taskInsightsRoute } from "./routes/taskInsights";
import { subscriptionRoute } from "./routes/webhook";

import cors from "cors";



const app = express();
//TODO: Remove from Production
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(requestLogger)

app.get("/api/health-check", (req, res) => {
  return res.json({
    strTest: "asdadasd",
    objTest:{
      child:"asdads"
    },
    arrTest:[
      {
        childArr:123
      },
      {
        childArr2:123
      }
    ]
  }).status(200);
});
app.use("/api/task/health", standardLimiter, healthTaskRoute);
app.use("/api/team/", standardLimiter, teamRoute);
app.use("/api/me/", standardLimiter, userRoute);
app.use("/api/insights", standardLimiter, taskInsightsRoute)
app.use("/api/subscription", standardLimiter, subscriptionRoute)

app.use(helmet());
app.use(errorHandler);


app.listen(3020, () => console.log("app started with port 3020"));
