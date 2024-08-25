"use client";

import { useState } from "react";
import { getTweet } from "@/lib/constants";
import Link from "next/link";
import styles from "@/styles/tweetList.module.scss";
import { Prisma } from "@prisma/client";


export default function TweetListUsers({ initialTweets }:any) {

  const [modal, setModal] = useState(false);
  const [tweets, setTweets] = useState(initialTweets);

  const newTweets = [...tweets].reverse();
  return (
    <>
      <div className={styles.tweet_list_wrap}>
        <ul>
          {
            newTweets.map((t)=>
              <li key={t.id}>
                <Link href={`/tweets/${t.id}`} className={styles.content}>{t.tweet}</Link>
              </li>
            )
          }
        </ul>
      </div>
    </>
  );
}