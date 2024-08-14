"use client";

import React from 'react'
import Input from './input';
import { useFormState } from 'react-dom';
import { FormState, uploadTweet } from '@/app/(home)/action';
import FormButton from './form-btn';

const initialState: FormState = {
	errors: {},
	message: "",
};

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, initialState);

  return (
	<div className="w-[400px] mx-auto">
		<div>AddTweet</div>
		<form action={action} className="mt-3">
			<Input
				name="tweet"
				type="text"
				placeholder="Tweet"
				errors={state?.errors?.fieldErrors?.tweet}
			/>
			<div className="mt-3 text-center">
				<FormButton text="tweet!"/>
			</div>			
		</form>
	</div>
  )
}
