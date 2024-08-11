import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

// user 상태 확인
async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        username: true,
        email:true,
      },
    });
    if (user) {
      return user;
    }
  }
}

export default async function Profile() {

  const user = await getUser();

  // 로그아웃
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <>
      <div>page Profile</div>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </>
  )
}
