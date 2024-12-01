import { Selectable } from "kysely";

import { DB } from "~/database/schema";
import { UserId, UserModel } from "~/models";

export const UserMapper = {
  toModel: (user: Selectable<DB["users"]>): UserModel => {
    return {
      id: user.id as UserId,
      email: user.email,
    };
  },
};
