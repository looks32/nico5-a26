"use client";

import { useEffect, useState } from "react";
// import { getTweet } from "@/app/(home)/action";
import { InitialTweets } from "@/app/(home)/page";
import Link from "next/link";
// import { setTimeout } from "timers";
import styles from "@/styles/tweetList.module.scss";
import AddTweet from "./add-tweet";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetListUsers({ initialTweets }:any) {

  const [modal, setModal] = useState(false);
  const [tweets, setTweets] = useState(initialTweets);

  // const newTweets = [...tweets].reverse();
  return (
    <>
      <div className={styles.tweet_list_wrap}>
        <ul>
          {
            tweets.Tweet.map((t:any)=>
              <li key={t.id}>
                <Link href={`/tweets/${t.id}`} className={styles.content}>{t.tweet}</Link>
                <Link href={`/users/${tweets.id}`}>
                  작성자 : {tweets.username}
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </>
  );
}