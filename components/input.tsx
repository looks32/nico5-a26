import { InputHTMLAttributes } from "react";
import styles from "@/styles/input.module.scss";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={styles.input_wrap}>
      <input
        name={name}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index}>
          {error}
        </span>
      ))}
    </div>
  );
}