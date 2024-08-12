// 인증된 사용자만 접근할 수 있도록 하는 미들웨어 만들기

import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

// 누구나 들어갈 수 있는 URL
const publicOnlyUrls: Routes = {
  // "/": true,
  "/login": true,
  "/create": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  
  // 누구나 들어갈 수 있는 URL
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  
  // 비로그인 상태라면
  if (!session.id) {

	  // session.id가 없고 public이외의 페이지 접근시
    if (!exists) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
  // 로그인 상태일때
  } else {

	// publicOnly 페이지에는 들어갈 수 없음
    if (exists) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};