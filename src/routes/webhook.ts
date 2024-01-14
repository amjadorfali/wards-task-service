import {validate} from "../utils/validations";
import express, {NextFunction, Request, response, Response} from "express";
import {getResponse} from "../utils";
import { subscriptionService } from "../services/factory";
const crypto = require('crypto');

export const subscriptionRoute = express.Router();

subscriptionRoute.post("/overview",
  validate([]),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const hmac = crypto.createHmac('sha256', process.env.SIGNING_SECRET);
    const digest = Buffer.from(hmac.update(req.body).digest('hex'), 'utf8');
    // @ts-ignore
    const signature = Buffer.from(req.headers['X-Signature'] || '', 'utf8');
    let sigOK = false;

    try {
      sigOK = crypto.timingSafeEqual(digest, signature);
    } catch (err) {
      console.log("ERROR: timingSafeEqual: " + err);
    }

    if (!sigOK) {
      console.log("ERROR: Invalid signature");
      res.status(400).send("ERROR: Invalid signature");
      return;
    }
    const event = JSON.parse(req.body.toString());

    console.log(`${event.meta.event_name} webhook received`);

    // Explore the event object's contents, and do your thing with it
    console.log(event);

    res.send();

    // return subscriptionService.processSubscription(req.body)
    //   .then((response) => res.json(getResponse.success(response)).status(200))
    //   .catch((e) => {
    //     next(e);
    //   });
  })

