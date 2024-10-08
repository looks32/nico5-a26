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
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export interface FormState {
  errors?: {
    fieldErrors?: {
      email?: string[];
      username?: string[];
      password?: string[];
      confirm_password?: string[];
      introduce?: string[];
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

// email 중복 확인
const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
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
  email: z.string().email(EMAIL_ERROR).toLowerCase().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR).refine(
    checkUniqueEmail,
    "email 중복입니다."
  ), 
  username : z.string().min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR).refine(
    checkUniqueUsername,
    "username 중복입니다."
  ),
  introduce : z.string().min(1, '소개를 입력해주세요.'),
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


export async function updateUser(prevState: FormState | undefined, formData: FormData) {

  const session = await getSession();

  // 사용자로부터 수정된 데이터 가져오기
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    introduce: formData.get("introduce"),
  };

  // 데이터 유효성 검사
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    // 유효성 검사 실패 시 오류 반환
    return {
      errors: {
        fieldErrors: result.error.flatten().fieldErrors,
      },
      message: "",
    };
  } else {
    // 비밀번호가 변경된 경우에만 해시화 수행
    let hashedPassword;
    if (data.password) {
      hashedPassword = await bcrypt.hash(result.data.password, 12);
    }

    // try {
      // 사용자 정보 업데이트
      const user = await db.user.update({
        where: { id: session.id }, // 임시 수정할 사용자의 ID
        data: {
          username: result.data.username,
          email: result.data.email,
          introduce: result.data.introduce,
          ...(hashedPassword && { password: hashedPassword }), // 비밀번호가 제공된 경우에만 업데이트
        },
        select: {
          id: true,
        },
      });

      // 성공 후 홈으로 이동
      redirect("/");
  }
}