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

export interface FormState {
  errors?: {
    fieldErrors?: {
      email?: string[];
      username?: string[];
      password?: string[];
      confirm_password?: string[];
    };
  };
  message?: string;
};

// username 중복 확인
const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

// 비번 같은지 체크
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z.object({
  email: z.string().email(EMAIL_ERROR).toLowerCase().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
  username : z.string().min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR).refine(
    checkUniqueUsername,
    "username 중복임다"
  ),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
})
.refine(checkPasswords, {
  message: "Both passwords should be the same!",
  path: ["confirm_password"],
});


export async function createUser(prevState: FormState | undefined, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
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

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    // user 회원가입
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    console.log('완료', user);
    redirect('/')

    // return {
    //   errors: {},
    //   message: "Welcome back!",
    // };
  }
}