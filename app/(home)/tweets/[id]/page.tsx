import db from '@/lib/db';
import getSession from '@/lib/session';
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
		<div>tweets {tweet.user.username}</div>
		<div>{tweet.tweet}</div>
		{isOwner ? '내가오너다' : '오너아닌디'}
	</>
  )
}
