"use client";

import FormButton from "@/components/form-btn";
import Input from "@/components/input";

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
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl text-center">💙</h1>
      </div>
      <form action={action} className="flex flex-col gap-3">
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
      <Link href="/create">create user</Link>
    </div>
  );
}
