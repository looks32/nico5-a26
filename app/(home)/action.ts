"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";

// tweet 업로드 interface
export interface FormState {
	errors?: {
		fieldErrors?: {
		tweet?: string[];
		};
	};
	message?: string;
};

// tweet 가져오기
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

// tweet 업로드 schema
const formSchema = z.object({
	tweet: z.string().min(1,'내용을 입력해주세요.')
});

// tweet 업로드
export async function uploadTweet(prevState: FormState | undefined, formData: FormData) {
	const data = {
		tweet: formData.get("tweet"),
	};

	const result = await formSchema.safeParseAsync(data);

	if (!result.success) {
		return {
         errors: {
            fieldErrors: result.error.flatten().fieldErrors,
         },
         message: "",
		};
	}
	else {
      const session = await getSession();
		const tweets = await db.tweet.create({
         data: {
            tweet: result.data.tweet,
            user: {
               connect: {
                 id: session.id,
               },
             },
         },
         select: {
            id: true,
         },
		});
      // await new Promise((resolve) => setTimeout(resolve, 5000));
	}
}
