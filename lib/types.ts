import { z } from "zod";
import { formData } from "zod-form-data";
import { IUsers } from "./db/schema";

export const LoginActionPayload = formData({
  usernameOrEmail: z.string().min(3).max(32),
  password: z.string().min(8).max(255),
});


export const UpdateUserActionPayload = IUsers.insert.pick({
  name: true,
}).partial()

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
