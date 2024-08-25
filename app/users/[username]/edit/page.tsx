"use client"

import FormButton from '@/components/form-btn';
import Input from '@/components/input';
import Link from 'next/link';
import React from 'react'
import { updateUser,FormState } from './actions';
import styles from "@/styles/create.module.scss";
import { useFormState } from "react-dom";

const initialState: FormState = {
  errors: {},
  message: "",
};

export default function Edit() {

  const [state, action] = useFormState(updateUser, initialState);

  return (
    <div className={styles.create_wrap} >
      <div>
        <h1>
          <Link href="/">💙</Link>
        </h1>
      </div>
      <form action={action}>
        <Input
            name="email"
            type="email"
            placeholder="Email"
            errors={state?.errors?.fieldErrors?.email}
          />
          <Input
            name="username"
            type="text"
            placeholder="Username"
            errors={state?.errors?.fieldErrors?.username}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            errors={state?.errors?.fieldErrors?.password}
          />
          <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.errors?.fieldErrors?.confirm_password}
          />
          <Input
          name="introduce"
          type="text"
          placeholder="introduce"
          textarea={true}
          required
          errors={state?.errors?.fieldErrors?.introduce}
          />
          <FormButton text="Edit!" />
          {/* 필요 없어짐 */}
          {/* {state?.message && (
            <div className="bg-green-600 text-white p-3 rounded-md text-center">Welcome back!</div>
          )} */}
      </form>

    </div>
  );
}
