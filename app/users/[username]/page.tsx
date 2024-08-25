import { getIsOwner, getTweet, getUser, logOut } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import styles from "@/styles/users.module.scss";
import TweetListUsers from '@/components/tweet-list-users';

export default async function Users({
	params,
  }: {
	params: { username: string };
  }) {

  const id = Number(params.username)

  const isOwner = await getIsOwner(id);
  const tweet = await getTweet(id);

  return (
    <div className={styles.users_wrap}>
      <div>Profile</div>
      <div className={styles.inner}>
        <div>username : {tweet?.user.username}</div>
        <div>email : {tweet?.user.email}</div>
      </div>


      {/* 작성자 프로필 확인 */}
      {isOwner ? <Link href={`/users/${tweet?.id}/edit`} className={styles.btn}>Edit</Link> : null}

      <form action={logOut}>
        <button className={styles.btn}>Log out</button>
      </form>

      <Link href="/" className={styles.btn}>home 으로</Link>
    
      <h2>작성한 Tweet</h2>
      <TweetListUsers initialTweets={tweet?.user.Tweet}/>
    </div>
  )
}
