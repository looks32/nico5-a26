"use server";

import { z } from "zod";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSearchedTweet(keyword: string) {
	const tweets = await db.tweet.findMany({
		where : {
			tweet :{
				contains:keyword,
			}
		},
		select: {
			id: true,
			created_at: true,
			updated_at: true,
			tweet:true,
			user: {
				select: {
					id: true,
					username: true,
					
				},
			},
		},
	});
	return tweets;
}

const searhSchema = z.object({
	keyword: z.string({
		required_error: "검색할 키워드를 입력해주세요",
	}),
});

export async function validateSearchKeyword(_: any, formData: FormData) {
	const data = {
		keyword: formData.get("keyword"),
	};
	const result = await searhSchema.safeParseAsync(data);

	if (!result.success) {
		return result.error.flatten();
	} else {
		const encodedKeyword = encodeURI(result.data.keyword);
		revalidatePath(`/search?keyword=${encodedKeyword}`);
		redirect(`/search?keyword=${encodedKeyword}`);
	}
}