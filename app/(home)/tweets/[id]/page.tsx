import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import styles from "@/styles/tweetDetail.module.scss";
import { getIsOwner } from '@/lib/constants';
import { getTweet } from '@/lib/constants';


export default async function tweets({
	params,
  }: {
	params: { id: string };
  }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  // 작성자 확인
  const isOwner = await getIsOwner(tweet.userId);

  return (
	<>	
		<div className={styles.tweet_detail_wrap}>
			<Link href="/">home</Link>
			<div>작성자 : {tweet.user.username}</div>
			<div>내용 : {tweet.tweet}</div>
			
			{/* 작성자 확인 */}
			{/* {isOwner ? <div>💙</div> : null} */}
		</div>
	</>
  )
}
