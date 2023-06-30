import { User, UserIdentitiy } from "@prisma/client";

export interface UserWithIdentities extends User {
  userIdentities: UserIdentitiy[];
}
