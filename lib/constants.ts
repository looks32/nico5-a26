import { z } from "zod";
import getSession from "./session";
import { redirect } from "next/navigation";
import db from "./db";

// @zod.com 필수 이메일
export const EMAIL_REGEX = new RegExp(
	/.*@zod\.com.*/
)

// 이메일 형식 에러 알림
export const EMAIL_ERROR = "Please maintain email format";

// @zod.com 필수 이메일 에러 알림
export const EMAIL_REGEX_ERROR = "Only @zod.com email are allowed";

// username 최소 단위
export const USERNAME_MIN_LENGTH = 5;

// username 최소 단위 에러 알림
export const USERNAME_MIN_LENGTH_ERROR = 'Username should be at least 5 characters long';

// 비밀번호 최소 단위
export const PASSWORD_MIN_LENGTH = 10;

// 비밀번호 최소 단위 에러 알림
export const PASSWORD_MIN_LENGTH_ERROR = 'Password should be at least 10 characters long';

// 숫자 1개 이상 무조건 있어야하는 정규식
export const PASSWORD_REGEX = new RegExp(
  /.*\d+.*/
);

// 비밀번호 정규식 에러 알림
export const PASSWORD_REGEX_ERROR =
  "Password should contain at least one number(0123456789)";




 // 로그아웃
export const logOut = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/");
};


// user 상태 확인
export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id:true,
        username: true,
        email:true,
        Tweet:true,
        introduce:true,
      },
    });
    if (user) {
      return user;
    }
  }
}


// tweet user 상태 확인
export async function getTweetUser(id:number) {
  const user = await db.user.findUnique({
    where: {
      id
    },
    select: {
      id:true,
      username: true,
      email:true,
      Tweet:true,
      introduce:true,
    },
  });
  if (user) {
    return user;
  }
}


// 작성자 확인
export async function getIsOwner(userId: number) {
	const session = await getSession();
	if (session.id) {
		return session.id === userId;
	}
	return false;
}


// tweet 가져오기
export async function getTweet(id: number) {
	const tweet = await db.tweet.findUnique({
		where: {
			id,
		},
		include: {
			user: {
				select: {
          id:true,
					username: true,
					Tweet:true,
          email:true,
          introduce:true,
				},
			},
		},
	});
	return tweet;
}