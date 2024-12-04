import type { Selectable } from 'kysely';
import type { DB } from './../database/schema';

export declare const brand: unique symbol;

export type Brand<T, TBrand extends string> = T & {
  [brand]: TBrand;
};

export type UserId = `u_${string}`;

export type UserModel = Selectable<DB['users']> & {
  id: UserId;
};
