import { RegisterOptions, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormNumberInputProps = {
  name: string;
  label: string;
  step?: number;
  placeholder: string;
  validation?: RegisterOptions;
};

const FormNumberInput = ({
  name,
  label,
  placeholder,
  step = 1,
  validation,
}: FormNumberInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
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
              type="number"
              step={step}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormNumberInput;
