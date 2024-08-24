"use client";

import FormButton from "@/components/form-btn";
import Input from "@/components/input";
import styles from "@/styles/create.module.scss";

import { useFormState } from "react-dom";
import { createUser, FormState } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import Link from "next/link";

const initialState: FormState = {
  errors: {},
  message: "",
};

export default function Create() {

  const [state, action] = useFormState(createUser, initialState);

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
          <FormButton text="Create!" />
          {/* 필요 없어짐 */}
          {/* {state?.message && (
            <div className="bg-green-600 text-white p-3 rounded-md text-center">Welcome back!</div>
          )} */}
      </form>

    </div>
  );
}
