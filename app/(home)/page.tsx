import { logOut } from '@/lib/constants'
import db from '@/lib/db';
import Link from 'next/link'
import React from 'react'


async function getTweet() {
  const tweet = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: true,
    },
  });
  return tweet;
}

export default async function Home() {

  const tweet = await getTweet();

  return (
    <>
      <div>
        <Link href="/profile">profile</Link>
        <form action={logOut}>
          <button>Log out</button>
        </form>
        <div>Home</div>
      </div>
      <ul>
        {tweet.map((t,i) => (
          <li key={t.id}>
            <Link href={`/tweets/${t.id}`}>{t.tweet}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
