import { Input, Textarea } from "@chakra-ui/react";

type CustomInputProps = {
  autoComplete: string;
  id: string;
  maxLength?: number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: "date" | "email" | "number" | "password" | "text";
  value: string;
};

const CustomInput = ({
  autoComplete,
  id,
  name,
  onChange,
  maxLength,
  placeholder,
  type,
  value,
}: CustomInputProps) => {
  return (
    <Input
      autoComplete={autoComplete}
      backgroundColor="white"
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      maxLength={maxLength}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      _placeholder={{ color: "input.placeholder" }}
      type={type}
      value={value}
    />
  );
};

const CustomTextbox = ({
  autoComplete,
  id,
  name,
  onChange,
  placeholder,
  type,
  value,
}: CustomInputProps) => {
  return (
    <CustomInput
      autoComplete={autoComplete}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

type DateTimePickerProps = {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const DateTimePicker = ({ id, name, onChange, value }: DateTimePickerProps) => {
  return (
    <CustomInput
      autoComplete="off"
      id={id}
      name={name}
      onChange={onChange}
      placeholder=""
      type="date"
      value={value}
    />
  );
};

type CustomTextareaProps = {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  value: string;
};

const CustomTextarea = ({
  id,
  name,
  onChange,
  placeholder,
  value,
}: CustomTextareaProps) => {
  return (
    <Textarea
      backgroundColor="white"
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      height="10rem"
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      _placeholder={{ color: "input.placeholder" }}
      value={value}
    />
  );
};

export { CustomTextarea, CustomTextbox, DateTimePicker };
