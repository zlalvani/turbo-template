type ConvertNullableFieldsToOptional<T> = {
  [P in keyof T as null extends T[P] ? P : never]?: T[P];
} & {
  [P in keyof T as null extends T[P] ? never : P]: T[P];
};

export type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T],
  undefined
>;

// For database updates, we want to allow partial update so we need to make all fields optional.
// `id` is excluded because it is used to specify the record, and `createdAt` and `updatedAt` are excluded because they are managed by the database function.
export type Update<T extends { id: string; createdAt: Date; updatedAt: Date }> =
  {
    id: T['id'];
  } & Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

// Database inserts require all fields (even nullable ones) to be explicitly set.
export type Insert<T extends { createdAt: Date; updatedAt: Date }> = Omit<
  T,
  'createdAt' | 'updatedAt'
>;

// For upserts, we don't want to force nullable fields to be set explicitly since that will override the existing record,
// so we need to make all nullable fields optional.
// For some reason, Except doesn't work here, so we use Omit instead.
export type Upsert<T extends { createdAt: Date; updatedAt: Date }> =
  ConvertNullableFieldsToOptional<Omit<T, 'createdAt' | 'updatedAt'>>;
