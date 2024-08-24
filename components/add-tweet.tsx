"use client";

import React, { useState } from 'react'
import Input from './input';
import { useFormState } from 'react-dom';
import { FormState, uploadTweet } from '@/app/(home)/action';
import FormButton from './form-btn';
import styles from "@/styles/addTweet.module.scss";


const initialState: FormState = {
	errors: {},
	message: "",
};

interface AddTweetProps {
	modal: boolean;
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function AddTweet({modal,setModal}: AddTweetProps) {
  const [state, action] = useFormState(uploadTweet, initialState);
  return (
	<div className={styles.add_tweet_wrap}>
		<div>
			<h2>AddTweet</h2>
			<form action={action}>
				<Input
					name="tweet"
					type="text"
					placeholder="Tweet"
					textarea={true}
					errors={state?.errors?.fieldErrors?.tweet}
				/>
				<div>
					<FormButton text="tweet!"/>
				</div>
			</form>
			<button type="button" className={styles.close} onClick={() => setModal(false)}>close</button>
		</div>
	</div>
  )
}
