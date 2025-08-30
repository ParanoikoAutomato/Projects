import { RegisterOptions, useFormContext } from "react-hook-form"; // Import Control type

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectInput } from "@/components/select-input";

type Option = {
  label: string;
  value: string | number;
};

type FormSelectInputProps = {
  name: string;
  label: string;
  emptyPlaceholder?: string;
  placeholder?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  options: Option[];
  binding?: React.ComponentProps<typeof SelectInput>["binding"];
  validation?: RegisterOptions;
};

const FormSelectInput = ({
  name,
  label,
  emptyPlaceholder,
  placeholder,
  isMulti = false,
  isClearable = true,
  isSearchable = false,
  options,
  binding = "option",
  validation,
}: FormSelectInputProps) => {
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
            <SelectInput
              ref={field.ref}
              value={field.value}
              isMulti={isMulti}
              options={options}
              isClearable={isClearable}
              isSearchable={isSearchable}
              placeholder={placeholder}
              emptyPlaceholder={emptyPlaceholder}
              binding={binding}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectInput;
