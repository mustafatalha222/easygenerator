import * as z from "zod";

export const emailValidation = z
  .string({
    required_error: "Please add valid email!",
  })
  .email();

export const passwordValidation = z
  .string()
  .min(6)
  .regex(new RegExp(".*[A-Z].*"), "Require 1 uppercase character")
  .regex(new RegExp(".*[a-z].*"), "Require 1 lowercase character")
  .regex(new RegExp(".*\\d.*"), "Require 1 number")
  .regex(
    new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
    "Require 1 special character"
  )
  .max(30);
