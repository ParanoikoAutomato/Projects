import { RegisterOptions, useFormContext } from "react-hook-form"; // Import Control type

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type FormTextAreaInputProps = {
  name: string;
  label: string;
  placeholder: string;
  validation?: RegisterOptions;
};

const FormTextAreaInput = ({
  name,
  label,
  placeholder,
  validation,
}: FormTextAreaInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      rules={{ ...validation }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextAreaInput;
