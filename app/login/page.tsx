"use client";

import FormButton from "@/components/form-btn";
import Input from "@/components/input";
import styles from "@/styles/login.module.scss";

import { useFormState } from "react-dom";
import { logIn, FormState } from "./actions";
import Link from "next/link";

const initialState: FormState = {
  errors: {},
  message: "",
};


export default function Login() {

  const [state, action] = useFormState(logIn, initialState);

  return (
    <div className={styles.login_wrap}>
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
            name="password"
            type="password"
            placeholder="Password"
            errors={state?.errors?.fieldErrors?.password}
          />
          <FormButton text="Log In!" />
      </form>
      <Link href="/create" className={styles.create_btn}>Create user</Link>
    </div>
  );
}
