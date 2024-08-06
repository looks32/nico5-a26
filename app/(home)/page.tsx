"use client";

import FormButton from "@/components/form-btn";

import { useFormState } from "react-dom";
import { handleForm, IState } from "./actions";

const initialState: IState = {
  errors: [],
  message: "",
};

export default function Home() {

  const [state, action] = useFormState(handleForm, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl text-center">💙</h1>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <input type="email" name="email" placeholder="Email" required className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 p-2"/>
        <input type="text" name="username" placeholder="Username" required className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 p-2"/>
        <input type="password" name="password" placeholder="Password" required  className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 p-2"/>
        {state.errors &&
          state.errors.map((error, index) => (
            <p key={index} className="text-red-500">
              {error}
            </p>
           
          ))}
        <FormButton text="logIn" />
        {state.message && (
          <div className="bg-green-600 flex items-center text-white p-3 rounded-md">
            {state.message}
          </div>
        )}
      </form>

    </div>
  );
}
