import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormTextInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  validation?: RegisterOptions;
  isPassword?: boolean;
};

function FormTextInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  validation,
  isPassword = false,
}: FormTextInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name}
      rules={{ ...validation }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {validation?.required && <span className="text-red-600">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={isPassword ? "password" : "text"}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormTextInput;
