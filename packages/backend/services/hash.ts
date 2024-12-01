import crypto from "crypto";
import base58 from "bs58";

const encode = (str: string | Buffer): string =>
  base58.encode(Buffer.from(str));

// Does it make sense to have a separate implementation for node?
export const createHashService = () => {
  return {
    hash: async (...args: string[]) => {
      const hashed = crypto
        .createHash("sha256")
        .update(args.join("/"))
        .digest();
      return encode(hashed);
    },
  };
};
