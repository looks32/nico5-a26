"use client";

import { useFormStatus } from "react-dom";
import styles from "@/styles/formBtn.module.scss";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={styles.form_btn}
    >
      {pending ? "loading..." : text}
    </button>
  );
}