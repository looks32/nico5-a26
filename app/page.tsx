"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
// import SocialLogin from "@/components/social-login";

export default function Home() {

  const onClick = async () => {
    const response = await fetch("/www/users", {
      method: "POST",
      body: JSON.stringify({
        username: "nico",
        password: "1234",
      }),
    });
    console.log(await response.json());
  };


  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" placeholder="Username" required errors={[]} />
        <FormInput
          type="password"
          placeholder="Password"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          required
          errors={[]}
        />
      </form>

      {/* form 때문에 잠깐 밖으로 빼놓음 */}
      <span onClick={onClick}>
        <FormButton loading={false} text="logIn" />
      </span>
    </div>
  );
}
