import { logOut } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

import styles from "@/styles/profile.module.scss";

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

  

  return (
    <div className={styles.profile_wrap}>
      <div>page Profile</div>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
      <form action={logOut}>
        <button>Log out</button>
      </form>

      <Link href="/">home 으로</Link>
    </div>
  )
}
