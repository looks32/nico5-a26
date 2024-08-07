import { z } from "zod";

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