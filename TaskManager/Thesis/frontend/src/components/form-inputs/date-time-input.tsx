import { RegisterOptions, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type FormDateTimeInputProps = {
  name: string;
  label: string;
  placeholder: string;
  validation?: RegisterOptions;
};

const FormDateTimeInput = ({
  name,
  label,
  placeholder,
  validation,
}: FormDateTimeInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      disabled={validation?.disabled}
      rules={{ ...validation }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            <span className='text-red-600'>*</span>
          </FormLabel>
          <FormControl>
            <div>
              <Input
                type='datetime-local'
                placeholder={placeholder}
                {...field}
                value={field.value || ''}
                min={validation?.min as string}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDateTimeInput;
