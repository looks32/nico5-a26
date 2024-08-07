"use client";

import FormButton from "@/components/form-btn";
import Input from "@/components/input";

import { useFormState } from "react-dom";
import { logIn } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Home() {

  const [state, action] = useFormState(logIn, null);

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
          errors={state?.fieldErrors.email}
        />
        <Input
          name="username"
          type="text"
          placeholder="Username"
          errors={state?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
        <FormButton text="logIn" />
        {!state?.fieldErrors ? (
          <div className="bg-green-600 text-white p-3 rounded-md text-center">로그인 ㅊㅋ</div>
        ) : null}
      </form>

    </div>
  );
}
