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

export default function TweetList({ initialTweets }: TweetListProps) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(0);
  // const [isFirstPage, setIsFirstPage] = useState(true);
  // const [isLastPage, setIsLastPage] = useState(false);
  const [modal, setModal] = useState(false);
  const [tweets, setTweets] = useState(initialTweets);

  // const prevClick = async () => {
  //   setIsLoading(true);
   
	// if (page !== 0) {
	// 	const newTweets = await getTweet(page - 1);
	// 	setTweets((prev) => [...prev, ...newTweets]);
	// 	setPage((prev) => prev - 1);
	// } else {
		
	// }
  //   setIsLoading(false);
  // };

  // const nextClick = async () => {
  //   setIsLoading(true);
  //   const newTweets = await getTweet(page + 1);
	// if (newTweets.length !== 0) {
	// 	setTweets((prev) => [...prev, ...newTweets]);
	// 	setPage((prev) => prev + 1);
	// } else {
	// }
  //   setIsLoading(false);
  // };

  useEffect(() => {
   console.log('asd')
  }, [tweets])

  const newTweets = [...tweets].reverse();
  
  return (
    <>
      <div className={styles.tweet_list_wrap}>
        {/* <button
          onClick={prevClick}
          disabled={isLoading}
          className={`${styles.prev} ${styles.btn}`}
        >
          {isLoading ? "Loading...." : "prev"}
          prev
        </button> */}

        <ul>
          {
            newTweets.map((t)=>
              <li key={t.id}>
                <Link href={`/tweets/${t.id}`} className={styles.content}>{t.tweet}</Link>
                <Link href={`/users/${t.user.username}`}>
                  작성자 : {t.user.username}
                </Link>
              </li>
            )
          }
        </ul>
        
        {/* <button
          onClick={nextClick}
          disabled={isLoading}
          className={`${styles.next} ${styles.btn}`}
        >
          {isLoading ? "Loading...." : "next"}
          next
        </button> */}

        <button className={styles.add_btn} onClick={()=>setModal((prev)=>!prev)}>+</button>
      </div>
      {modal ? <AddTweet modal={modal} setModal={setModal}/> : null}
    </>
  );
}