"use client";

import React from 'react'
import Input from './input';
import { useFormState } from 'react-dom';
import { FormState, uploadTweet } from '@/app/(home)/action';
import FormButton from './form-btn';
import styles from "@/styles/addTweet.module.scss";


const initialState: FormState = {
	errors: {},
	message: "",
};

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, initialState);

  return (
	<div className={styles.add_tweet_wrap}>
		<div>AddTweet</div>
		<form action={action}>
			<Input
				name="tweet"
				type="text"
				placeholder="Tweet"
				errors={state?.errors?.fieldErrors?.tweet}
			/>
			<div>
				<FormButton text="tweet!"/>
			</div>			
		</form>
	</div>
  )
}
