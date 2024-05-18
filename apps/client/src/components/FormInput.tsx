import { memo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInputProps } from "@/lib/commonInterface";

const FormInput = <T,>({
  label,
  placeholder,
  name,
  control,
  type,
  rightComponent,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className={`bg-[#FFFFFF]`}>
            <Input
              className={`text-[#545454] ${
                control._formState?.errors[name]
                  ? "border border-[#FF494F]"
                  : ""
              }
              `}
              type={type || "text"}
              placeholder={placeholder || label}
              {...field}
              rightComponent={rightComponent}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(FormInput) as typeof FormInput;
