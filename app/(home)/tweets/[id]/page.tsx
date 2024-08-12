import db from '@/lib/db';
import getSession from '@/lib/session';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

// 작성자 확인
async function getIsOwner(userId: number) {
	const session = await getSession();
	if (session.id) {
		return session.id === userId;
	}
	return false;
}

async function getTweet(id: number) {
	const tweet = await db.tweet.findUnique({
		where: {
			id,
		},
		include: {
		user: {
			select: {
				username: true,
				Tweet:true
			},
		},
		},
	});
	return tweet;
}

export default async function tweets({
	params,
  }: {
	params: { id: string };
  }) {
  const id = Number(params.id);

  const prev = id - 1
  const next = id + 1

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
		<Link href={`/tweets/${prev}`}>이전</Link>
		<div>작성자 : {tweet.user.username}</div>
		<div>내용 : {tweet.tweet}</div>

		{/* 작성자 확인 */}
		{isOwner ? <div>💙</div> : null}
		<Link href={`/tweets/${next}`}>다음</Link>
	</>
  )
}
