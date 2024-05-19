import * as z from "zod";

export const emailValidation = z
  .string({
    required_error: "Please add valid email!",
  })
  .email();

export const passwordValidation = z
  .string()
  .min(8)
  .regex(/(?=.*[A-Za-z])/, "must contain at least 1 letter")
  .regex(/(?=.*\d)/, "must contain at least 1 number")
  .regex(
    /[!@#$%^&*()_+{}|:"<>?`\-=[\];',./]/,
    "must contain at least 1 special character"
  )
  .max(30);
