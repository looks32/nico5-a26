"use server";
import db from "@/lib/db";


export async function getTweet(page:number) {
	const tweet = await db.tweet.findMany({
		select: {
			id: true,
			tweet: true,
			created_at: true,
			updated_at: true,
			user: true,
		},
		take: 1,
    	skip: page * 1,
	});
	return tweet;
}