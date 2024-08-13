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
		
		<div className="w-[400px] mx-auto relative">
			<Link href="/">뒤로</Link>
			<div className="p-8">작성자 : {tweet.user.username}</div>
			<div className="p-8">내용 : {tweet.tweet}</div>
			
			{/* 작성자 확인 */}
			{/* {isOwner ? <div>💙</div> : null} */}
		</div>
	</>
  )
}
