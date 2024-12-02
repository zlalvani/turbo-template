'use server';

import {
  edgeBindings,
  injectDatabase,
  injectIdService,
} from '@repo/backend-edge/injector';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function createUser(prevState: unknown, formData: FormData) {
  const validated = schema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid form data');
  }

  const ids = injectIdService(edgeBindings);
  const db = injectDatabase(edgeBindings);

  await Promise.resolve();

  db.user.get();
}
