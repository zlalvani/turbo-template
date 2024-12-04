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

export async function createUser(_: unknown, formData: FormData) {
  const validated = schema.safeParse(Object.fromEntries(formData));

  if (!validated.success) {
    return {
      error: {
        type: 'validation',
        email: validated.error.flatten().fieldErrors.email,
        message: 'Validation error',
      },
    };
  }

  const ids = injectIdService(edgeBindings);
  const db = injectDatabase(edgeBindings);

  try {
    const user = await db.users.create({
      id: await ids.userId(),
      email: validated.data.email,
    });
    return {
      success: true,
      user,
    };
  } catch (e) {
    return {
      error: {
        type: 'server',
        message: 'Failed to create user',
      },
    };
  }
}
