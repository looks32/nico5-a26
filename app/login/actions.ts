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

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

export interface FormState {
  errors?: {
    fieldErrors?: {
      email?: string[];
      password?: string[];
    };
  };
  message?: string;
};

// email 존재하는지 확인
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z.string().email(EMAIL_ERROR).toLowerCase().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR).refine(checkEmailExists, "An account with this email does not exist."),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
})


export async function logIn(prevState: FormState | undefined, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      errors: {
        fieldErrors: result.error.flatten().fieldErrors,
      },
      message: "",
    };
  }
  else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    // 비번 확인
    const ok = await bcrypt.compare(
	    // user가 존재 하지 않는다면 xxxx와 비교?
      result.data.password,
      user!.password ?? "xxxx"
    );

    if (ok) {
      const session = await getSession();
      session.id = user!.id;

      // 저장하고 home 보냄
      await session.save();
      redirect("/");
     
    } else {
      return {
        // 에러 안되는 것 수정..
        fieldErrors: {
          password: ["Wrong password."],
          // ts가 에러를 뱉기때문에 추가
          // email 관련된 뭔가 있는듯
          email: [],
        },
      };
    }
   
  }
}