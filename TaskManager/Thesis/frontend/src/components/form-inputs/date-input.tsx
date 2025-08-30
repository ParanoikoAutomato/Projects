import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { RegisterOptions, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FormDateInputProps = {
  name: string;
  label: string;
  placeholder: string;
  dateFormat: "PPP" | "dd/MM/yyyy";
  validation?: RegisterOptions;
};

const FormDateInput = ({
  name,
  label,
  placeholder,
  dateFormat,
  validation,
}: FormDateInputProps) => {
  const [isOpen, setOpen] = useState(false);
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      rules={{ ...validation }}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="self-start">
            {label}
            {validation?.required && <span className="text-red-600">*</span>}
          </FormLabel>
          <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  ref={field.ref}
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, dateFormat)
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                // captionLayout='dropdown'
                // fromYear={2015}
                // toYear={2025}
                mode="single"
                selected={field.value}
                onSelect={(value) => {
                  field.onChange(value);
                  setOpen(false);
                }}
                // disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDateInput;
