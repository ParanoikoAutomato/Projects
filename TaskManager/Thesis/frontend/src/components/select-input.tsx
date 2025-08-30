import { forwardRef, useRef, useState } from "react";
import Select, {
  GroupBase,
  MultiValue,
  SelectInstance,
  SingleValue,
} from "react-select";

type Option = {
  label: string;
  value: string | number;
};

type SelectInputProps = {
  isMulti?: boolean;
  options: Option[];
  isClearable?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  emptyPlaceholder?: string;
  onChange: (
    value:
      | MultiValue<Option>
      | SingleValue<Option>
      | Option["value"]
      | Option["value"][]
      | undefined
  ) => void;
} & (BindByOption | BindByValue);

type BindByOption = {
  binding?: "option";
  value: Option | Option[];
};

type BindByValue = {
  binding?: "value";
  value: Option["value"] | Option["value"][];
};

type SelectRef = SelectInstance<Option, boolean, GroupBase<Option>>;

export const SelectInput = forwardRef<SelectRef, SelectInputProps>(
  (props, ref) => {
    const {
      value,
      options = [],
      isClearable = true,
      isSearchable,
      isMulti = false,
      emptyPlaceholder,
      placeholder,
      onChange,
      binding = "option",
    } = props;

    const getValuesBindByOption = (): Option | undefined => {
      return isMulti
        ? (value as Option)
        : options.find((option) => option.value === value);
    };

    const getValuesBindByValue = (): Option | Option[] | undefined => {
      return isMulti
        ? options.filter((option) =>
            (value as Option["value"][]).includes(option.value)
          )
        : options.find((option) => option.value === value);
    };

    const getValues = () =>
      binding === "option" ? getValuesBindByOption() : getValuesBindByValue();

    const onChangeFunction = (
      val: MultiValue<Option> | SingleValue<Option>
    ) => {
      if (binding === "option") {
        onChange(isMulti ? val : (val as SingleValue<Option>)?.value);
      } else if (binding === "value") {
        onChange(
          isMulti
            ? (val as MultiValue<Option>).map((v) => v.value)
            : (val as SingleValue<Option>)?.value
        );
      }
    };

    return (
      <Select
        ref={ref}
        menuPlacement="auto"
        value={getValues()}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        noOptionsMessage={() => emptyPlaceholder}
        isMulti={isMulti}
        onChange={onChangeFunction}
        options={options}
        closeMenuOnSelect={isMulti ? false : true}
        // below props used for showing SelectInput component inside a scrollable modal
        menuPosition="fixed"
        menuPortalTarget={document.querySelector("body")}
        styles={{
          menuPortal: (base) => ({
            ...base,
            pointerEvents: "auto",
            zIndex: 9999,
          }),
        }}
      />
    );
  }
);

SelectInput.defaultProps = {
  isSearchable: false,
  isMulti: false,
  isClearable: true,
};

/**
 *
 * SELECT ASYNC
 *
 */

type OmitOptions<T> = T extends SelectInputProps
  ? Omit<T, "options" | "binding">
  : never;

type SelectAsyncInputProps = OmitOptions<SelectInputProps> & {
  options?: Option[];
  fetchOptions:
    | (() => Promise<Option[]>)
    | ((page: number, search: string) => Promise<Option[]>);
  isPaginated?: boolean;
};

export const SelectAsyncInput = forwardRef<SelectRef, SelectAsyncInputProps>(
  (props, ref) => {
    const {
      value,
      isClearable = true,
      isSearchable,
      isMulti = false,
      placeholder,
      emptyPlaceholder,
      onChange,
      fetchOptions,
      isPaginated = false,
    } = props;

    const [options, setOptions] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const page = useRef<number>(1);
    const search = useRef<string>("");
    const hasMoreOptions = useRef<boolean>(true);

    // const onChangeFunction = (val: MultiValue<Option> | SingleValue<Option>) => {
    //   onChange(isMulti ? val : (val as SingleValue<Option>));
    // };

    const onMenuClose = () => {
      setIsLoading(false);
      page.current = 1;
      hasMoreOptions.current = true;
      search.current = "";
      setOptions([]);
    };

    const onInputChange = (newValue: string) => {
      if (isPaginated && newValue) {
        page.current = 1;
        search.current = newValue;
        setOptions([]);
        loadOptions();
      }
    };

    const onMenuScrollToBottom = () => {
      if (isPaginated) {
        page.current = page.current + 1;
        if (hasMoreOptions.current) loadOptions();
      }
    };

    const loadOptions = async () => {
      setIsLoading(true);
      const res = await fetchOptions(page.current, search.current);
      setOptions((prev) => [...prev, ...res]);
      setIsLoading(false);
      if (res.length === 0) {
        hasMoreOptions.current = false;
      }
    };

    return (
      <Select
        ref={ref}
        menuPlacement="auto"
        value={value as Option}
        isClearable={isClearable}
        isSearchable={isSearchable}
        placeholder={placeholder}
        noOptionsMessage={() => emptyPlaceholder}
        isOptionSelected={
          isMulti ? undefined : (option) => option.value === value
        }
        isMulti={isMulti}
        onChange={onChange}
        options={options}
        onMenuOpen={loadOptions}
        onMenuClose={onMenuClose}
        onInputChange={onInputChange}
        onMenuScrollToBottom={onMenuScrollToBottom}
        closeMenuOnSelect={isMulti ? false : true}
        isLoading={isLoading}
      />
    );
  }
);

SelectAsyncInput.defaultProps = {
  isSearchable: false,
  isMulti: false,
  isPaginated: false,
  isClearable: true,
};
