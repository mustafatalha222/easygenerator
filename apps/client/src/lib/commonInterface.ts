/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormInputProps<T> {
  label: string;
  placeholder?: string;
  name: Extract<keyof T, string>;
  control: any;
  rightComponent?: React.ReactNode;
  type?: string;
  className?: string;
  showSuccessMsg?: string;
}

export interface FormTextareaProps<T> {
  label: string;
  placeholder?: string;
  name: Extract<keyof T, string>;
  control: any;
  rows?: number;
  className?: string;
}

export type ILOGIN = {
  accessToken: string;
  refreshToken: string;
};
