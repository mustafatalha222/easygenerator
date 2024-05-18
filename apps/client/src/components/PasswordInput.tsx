import { memo, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import FormInput from "./FormInput";
import { FormInputProps } from "@/lib/commonInterface";

const PasswordInput = <T,>({
  label,
  name,
  placeholder,
  control,
  isSimple,
  showSuccessMsg,
}: FormInputProps<T>) => {
  const [hidePassword, setHidePassword] = useState(true);

  const updateHide = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <FormInput<T>
      label={label}
      name={name}
      placeholder={placeholder}
      control={control}
      type={hidePassword ? "password" : "text"}
      isSimple={isSimple}
      showSuccessMsg={showSuccessMsg}
      rightComponent={
        hidePassword ? (
          <IoEyeOffOutline
            size={20}
            onClick={updateHide}
            className="text-dimmed"
          />
        ) : (
          <IoEyeOutline
            size={20}
            onClick={updateHide}
            className="text-dimmed"
          />
        )
      }
    />
  );
};

export default memo(PasswordInput) as typeof PasswordInput;
