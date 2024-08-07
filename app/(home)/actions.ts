"use server";

import { 
  EMAIL_ERROR,
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR, 
  USERNAME_MIN_LENGTH,
  USERNAME_MIN_LENGTH_ERROR
} from "@/lib/constants";

import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(EMAIL_ERROR).toLowerCase().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
  username : z.string().min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, '10글자 이상하셈')
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});



export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.success);
  }
}