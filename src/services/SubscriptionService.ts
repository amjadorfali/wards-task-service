import { prisma } from "../db";

export class SubscriptionService {


    async processSubscription(webhookData:any) {
        switch (webhookData.meta.event_name) {
            case "subscrition_created":
                break;
            case "subscrition_updated":
                break;
            case "subscrition_plan_changed":
                break;
            case "subscrition_cancelled":
            case "subscrition_expired":

                break;
        }
        return true
    }
}