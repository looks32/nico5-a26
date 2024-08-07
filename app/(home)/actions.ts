"use server";

import { 
  EMAIL_ERROR,
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR, 
  USERNAME_MIN_LENGTH,
  USERNAME_MIN_LENGTH_ERROR
} from "@/lib/constants";

import { z } from "zod";

export interface FormState {
  errors?: {
    fieldErrors?: {
      email?: string[];
      username?: string[];
      password?: string[];
    };
  };
  message?: string;
};

const formSchema = z.object({
  email: z.string().email(EMAIL_ERROR).toLowerCase().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
  username : z.string().min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});


export async function logIn(prevState: FormState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: {
        fieldErrors: result.error.flatten().fieldErrors,
      },
      message: "",
    };
  }
  else {
    return {
      errors: {},
      message: "Welcome back!",
    };
  }
}