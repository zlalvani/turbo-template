import base58 from "bs58";

const encode = (str: string | Buffer): string =>
  base58.encode(Buffer.from(str));

export const createHashService = () => {
  return {
    hash: async (...args: string[]) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(args.join("/"));
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashed = Buffer.from(hashBuffer);
      return encode(hashed);
    },
  };
};

export type HashService = ReturnType<typeof createHashService>;
