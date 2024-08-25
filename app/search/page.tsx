import TweetSearchList from "@/components/tweet-search-list";
import { getSearchedTweet } from "./action";
import { notFound } from "next/navigation";
import styles from "@/styles/search.module.scss";
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: { keyword: string } }) {

	const keyword = searchParams.keyword;

	if (!keyword) {
		notFound();
	}

	const tweets = await getSearchedTweet(keyword);

	return (
		<div className={styles.search_wrap}>
			<h1>
				<Link href="/">💙</Link>
			</h1>
			
			<div>
				{`'${keyword}'`}로 검색한 결과 : {tweets.length}건
			</div>

			<TweetSearchList initialTweets={tweets} keyword={keyword} />
		</div>
	);
}