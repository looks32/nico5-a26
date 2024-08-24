import { InputHTMLAttributes } from "react";
import styles from "@/styles/input.module.scss";

interface InputProps {
  name: string;
  errors?: string[];
  textarea?: boolean;
}

export default function Input({
  textarea,
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement> &InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={styles.input_wrap}>
      {textarea ? 
        <textarea 
        name={name} 
        {...rest}
        /> 
        : <input
          name={name}
          {...rest}
        />
      }
      {errors.map((error, index) => (
        <span key={index}>
          {error}
        </span>
      ))}
    </div>
  );
}