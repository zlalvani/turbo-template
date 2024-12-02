import type { Selectable } from 'kysely';

import type { DB } from '~/database/schema';
import type { UserId, UserModel } from '~/models';

export const UserMapper = {
  toModel: (user: Selectable<DB['users']>): UserModel => {
    return {
      id: user.id as UserId,
      email: user.email,
    };
  },
};
