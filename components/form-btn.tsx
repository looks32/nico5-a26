"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed p-3 bg-gray-300 rounded-md"
    >
      {pending ? "loading..." : text}
    </button>
  );
}