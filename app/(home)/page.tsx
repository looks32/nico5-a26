import TweetList from '@/components/tweet-list';
import AddTweet from '@/components/add-tweet';
import { logOut } from '@/lib/constants'
import db from '@/lib/db';
import Link from 'next/link';
import { Prisma } from "@prisma/client";
import styles from "@/styles/home.module.scss";


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
      <div className={styles.home_wrap}>
        {/* profile 1로 이동 임시 */}
        <Link href="/users/1">profile</Link>
        <form action={logOut}>
          <button>Log out</button>
        </form>
      </div>
      <TweetList initialTweets={initialTweets}/>
      <AddTweet/>
    </>
  )
}
