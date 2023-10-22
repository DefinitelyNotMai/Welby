import { Flex, Image, Input, Textarea } from "@chakra-ui/react";
import CustomButton from "../CustomButton";
import CustomText from "../CustomText";

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
      fontSize={["xs", "sm"]}
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
      fontSize={["xs", "sm"]}
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

type UploadPhotoProps = {
  id: string;
  label: string;
  name: string;
  onChange: (base64: string) => void;
  value: string;
};

const UploadPhoto = ({
  label,
  id,
  name,
  onChange,
  value,
}: UploadPhotoProps) => {
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      onChange(base64Image);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          reject(new Error("Failed to read the file as base64."));
        } else {
          resolve(reader.result as string);
        }
      };
      reader.onerror = () => {
        reject(new Error("Error reading the file."));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="center">
      <Flex
        alignItems="center"
        backgroundColor="#c8c8c8"
        border="10px solid white"
        borderRadius="lg"
        boxSize={[32, 40]}
        flexDirection="column"
        fontSize={["sm", "md"]}
        justifyContent="center"
        marginBottom={4}
        textAlign="center"
      >
        {value ? (
          <Image
            alt="Company Logo"
            height="full"
            objectFit="cover"
            src={value}
            width="full"
          />
        ) : (
          <CustomText>{label}</CustomText>
        )}
        <Input
          accept="image/*"
          display="none"
          id={id}
          name={name}
          onChange={handleImageChange}
          type="file"
          value=""
        />
      </Flex>
      <CustomButton
        onClick={() => {
          const fileInput = document.getElementById(id);
          if (fileInput) {
            fileInput.click();
          }
        }}
        type="button"
        width={["100%", "80%"]}
      >
        <CustomText fontWeight="medium">
          {value ? "Change Photo" : "Upload Photo"}
        </CustomText>
      </CustomButton>
    </Flex>
  );
};

export { CustomTextarea, CustomTextbox, DateTimePicker, UploadPhoto };
