"use client";

import { useState } from "react";
import { getTweet } from "@/app/(home)/action";
import { InitialTweets } from "@/app/(home)/page";
import Link from "next/link";
import { setTimeout } from "timers";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

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
    <div className="p-5 flex flex-col gap-5">
	
      <button
        onClick={prevClick}
        // disabled={isFirstPage}
        className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95 disabled:bg-slate-700"
      >
        {isLoading ? "Loading...." : "prev"}
      </button>
	  <Link href={`/tweets/${tweets[page].id}`}>{tweets[page].tweet}</Link>
	  
      <button
        onClick={nextClick}
        // disabled={isLastPage}
        className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95 disabled:bg-slate-700"
      >
        {isLoading ? "Loading...." : "next"}
      </button>
    </div>
  );
}