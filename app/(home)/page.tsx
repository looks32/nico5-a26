import TweetList from '@/components/tweet-list';
import AddTweet from '@/components/add-tweet';
import { getUser, logOut } from '@/lib/constants'
import db from '@/lib/db';
import Link from 'next/link';
import { Prisma } from "@prisma/client";
import styles from "@/styles/home.module.scss";
import getSession from '@/lib/session';
import Search from '@/components/search';


async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: true
    },
    // take: 1,
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;


export default async function Home() {
  const initialTweets = await getInitialTweets();
  // const user = await getUser();
  const session = await getSession();
  

  return (
    <>
      <div className={styles.home_wrap}>
        <Link href={`/users/${session?.id}`}>My page</Link>
        <Search/>
        <form action={logOut}>
          <button>Log out</button>
        </form>
        <TweetList initialTweets={initialTweets}/>
      </div>
    </>
  )
}
