import TweetSearchList from "@/components/tweet-search-list";
import { getSearchedTweet } from "./action";
import { notFound } from "next/navigation";

export default async function SearchPage({ searchParams }: { searchParams: { keyword: string } }) {
	const keyword = searchParams.keyword;
	if (!keyword) {
		notFound();
	}

	const tweets = await getSearchedTweet(keyword);

	return (
		<div>
			<h3>
				{`'${keyword}'`}로 검색한 결과 : {tweets.length}건
			</h3>
			<TweetSearchList initialTweets={tweets} keyword={keyword} />
		</div>
	);
}