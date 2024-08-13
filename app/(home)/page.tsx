import TweetList from '@/components/tweet-list';
import { logOut } from '@/lib/constants'
import db from '@/lib/db';
import Link from 'next/link';
import { Prisma } from "@prisma/client";


async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
    },
    take: 1,
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;


export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <>
      <div className="w-[400px] mx-auto flex justify-between p-6">
        <Link href="/profile">profile</Link>
        <form action={logOut}>
          <button>Log out</button>
        </form>
      </div>
      <TweetList initialTweets={initialTweets}/>
    </>
  )
}
