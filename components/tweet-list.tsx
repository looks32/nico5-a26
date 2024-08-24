"use client";

import { useState } from "react";
import { getTweet } from "@/app/(home)/action";
import { InitialTweets } from "@/app/(home)/page";
import Link from "next/link";
import { setTimeout } from "timers";
import styles from "@/styles/tweetList.module.scss";
import AddTweet from "./add-tweet";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [modal, setModal] = useState(false)

  const prevClick = async () => {
    setIsLoading(true);
   
	if (page !== 0) {
		const newTweets = await getTweet(page - 1);
		setTweets((prev) => [...prev, ...newTweets]);
		setPage((prev) => prev - 1);
	} else {
		
	}
    setIsLoading(false);
  };

  const nextClick = async () => {
    setIsLoading(true);
    const newTweets = await getTweet(page + 1);
	if (newTweets.length !== 0) {
		setTweets((prev) => [...prev, ...newTweets]);
		setPage((prev) => prev + 1);
	} else {
	}
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.tweet_list_wrap}>
        <button
          onClick={prevClick}
          disabled={isLoading}
          className={`${styles.prev} ${styles.btn}`}
        >
          {/* {isLoading ? "Loading...." : "prev"} */}
          prev
        </button>


        <Link href={`/tweets/${tweets[page].id}`} className={styles.content}>
          {tweets[page].tweet}
        </Link>

        <Link href={`/users/${tweets[page].user.username}`}>
          작성자 : {tweets[page].user.username}
        </Link>
      
        <button
          onClick={nextClick}
          disabled={isLoading}
          className={`${styles.next} ${styles.btn}`}
        >
          {/* {isLoading ? "Loading...." : "next"} */}
          next
        </button>

        <button className={styles.add_btn} onClick={()=>setModal((prev)=>!prev)}>+</button>
      </div>
      {modal ? <AddTweet modal={modal} setModal={setModal}/> : null}
    </>
  );
}