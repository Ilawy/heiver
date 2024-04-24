import { z } from "zod";
import { formData } from "zod-form-data";
import { IUsers } from "./db/schema";

export const DayDate = z.string().regex(/^\d{1,2}-\d{1,2}-\d{4}$/);

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


export const AddDayDataActionPayload = formData({
  date: DayDate,
  religion: z.number().min(1).max(5),
  life: z.number().min(1).max(5),
  health: z.number().min(1).max(5),
  note: z.string().max(255).optional(),
})



export const parseDate = (d: string) => {
  const result =  /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(d);  
  if(!result)throw new Error("invalid date");
  const [_, day, month, year] = result;
  return {
    day: Number(day),
    month: Number(month),
    year: Number(year),
  }
}