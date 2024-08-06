"use server";

export interface IState {
  errors?: string[];
  message?: string;
};

export async function handleForm(prevState: IState, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (formData.get("password") !== "12345") {
    return {
      errors: ["Wrong password"],
      message: "",
    };
  } else {
    return {
      errors: [],
      message: "Welcome back!",
    };
  }
}