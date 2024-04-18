import { z } from "zod";
import { formData } from "zod-form-data";

export const LoginActionPayload = formData({
  usernameOrEmail: z.string().min(3).max(32),
  password: z.string().min(8).max(255),
});

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
