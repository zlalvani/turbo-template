import { nanoid } from "nanoid";

import { UserId } from "~/models";
import { HashService } from "~/services/hash";

export const createIdService = (hash: HashService) => {
  return {
    userId: (): UserId => `u_${hash.hash(nanoid())}`,
  };
};
