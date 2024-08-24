import { getUser, logOut } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

import styles from "@/styles/users.module.scss";

export default async function Users() {

  const user = await getUser();

  return (
    <div className={styles.users_wrap}>
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
