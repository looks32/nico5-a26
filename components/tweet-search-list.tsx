"use client";

import { useEffect, useState } from "react";
import TweetList from "./tweet-list";
import { InitialTweets } from "@/app/(home)/page";

interface TweetListProps {
	initialTweets: InitialTweets;
	keyword: string;
}

export default function TweetSearchList({ initialTweets, keyword }: any) {
	const [tweets, setTweets] = useState(initialTweets);

	useEffect(() => {
		if (keyword) {
			setTweets(initialTweets);
		}
	}, [keyword]);
	return (
		<div className="flex flex-col gap-5 w-full px-2">
			<ul className="w-full flex flex-col gap-5">
				{tweets.map(tweet => (
					<TweetList initialTweets={tweets}/>
				))}
			</ul>
			{tweets.length === 0 && <p>검색 결과가 없습니다.</p>}
		</div>
	);
}