import { DB } from "database/schema";
import { Selectable } from "kysely";

export declare const brand: unique symbol;

export type Brand<T, TBrand extends string> = T & {
  [brand]: TBrand;
};

export type UserId = `u_${string}`;

export type UserModel = Selectable<DB["users"]> & {
  id: UserId;
};
