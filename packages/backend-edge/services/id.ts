import { nanoid } from 'nanoid';

import type { UserId } from '~/models';
import type { HashService } from '~/services/hash';

export const createIdService = (hash: HashService) => {
  return {
    userId: async (): Promise<UserId> => `u_${await hash.hash(nanoid())}`,
  };
};
