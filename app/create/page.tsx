"use client";

import FormButton from "@/components/form-btn";
import Input from "@/components/input";

import { useFormState } from "react-dom";
import { createUser, FormState } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

const initialState: FormState = {
  errors: {},
  message: "",
};

export default function Create() {

  const [state, action] = useFormState(createUser, initialState);

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
