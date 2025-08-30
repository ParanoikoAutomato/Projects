import { RegisterOptions, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectAsyncInput } from "@/components/select-input";

type Option = {
  label: string;
  value: string | number;
};

type FormSelectAsyncInputProps = {
  name: string;
  label: string;
  emptyPlaceholder?: string;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  fetchOptions:
    | (() => Promise<Option[]>)
    | ((page: number, search: string) => Promise<Option[]>);
  isPaginated?: boolean;
  validation?: RegisterOptions;
};

const FormSelectAsyncInput = ({
  name,
  label,
  emptyPlaceholder,
  isMulti = false,
  isSearchable = false,
  isClearable = false,
  fetchOptions,
  validation,
  isPaginated = false,
}: FormSelectAsyncInputProps) => {
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
            <SelectAsyncInput
              ref={field.ref}
              value={field.value}
              placeholder={"Search"}
              emptyPlaceholder={emptyPlaceholder}
              isMulti={isMulti}
              onChange={(value) => {
                field.onChange(value);
              }}
              isClearable={isClearable}
              isSearchable={isSearchable}
              fetchOptions={fetchOptions}
              isPaginated={isPaginated}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelectAsyncInput;
