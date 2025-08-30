import { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  columnsLabels?: Record<string, string>;
  openFilters?: () => void;
  onFiltersChange?: (filters: Record<string, unknown>) => void;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          value={table.getState().globalFilter ?? ""}
          onChange={(value) => table.setGlobalFilter(String(value))}
          className="w-64"
          placeholder="Search..."
        />
      </div>
      <div className="flex space-x-2"></div>
    </div>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  className,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={cn(
        "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        className
      )}
    />
  );
}
