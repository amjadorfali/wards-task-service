import { HealthTaskService } from "./HealthTaskService";
import { TeamService } from "./TeamService";
import { UserService } from "./UserService";
import { IncidentService } from "./IncidentService";
import { SubscriptionService } from "./SubscriptionService";

export const teamService = new TeamService();
export const userService = new UserService();
export const incidentService = new IncidentService();
export const healthTaskService = new HealthTaskService(teamService);
export const subscriptionService = new SubscriptionService();
