import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type DateMonthYearInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  validation?: RegisterOptions;
  // control: Control<T>;
};

function DateMonthYearInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  validation,
  // control,
}: DateMonthYearInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      rules={{ ...validation }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {validation?.required && <span className='text-red-600'>*</span>}
          </FormLabel>
          <FormControl>
            <Input type='month' placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DateMonthYearInput;
