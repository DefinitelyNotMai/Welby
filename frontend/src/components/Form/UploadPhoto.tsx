import { Flex, Image } from "@chakra-ui/react";
import Text from "../Typography/Text";
import Button from "./Button";
import Input from "./Input";

interface UploadPhotoProps {
  buttonWidth: string[];
  id: string;
  label: string;
  name: string;
  onChange: (base64: string) => void;
  value: string;
}

const UploadPhoto = ({
  buttonWidth,
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
          <Text color="#ffffff">{label}</Text>
        )}
        <Input
          accept="image/*"
          display="none"
          id={id}
          name={name}
          onChange={handleImageChange}
          placeholder=""
          type="file"
          value=""
        />
      </Flex>
      <Button
        buttonVariant="primary"
        onClick={() => {
          const fileInput = document.getElementById(id);
          if (fileInput) {
            fileInput.click();
          }
        }}
        type="button"
        width={buttonWidth}
      >
        {value ? "Change Photo" : "Upload Photo"}
      </Button>
    </Flex>
  );
};

export default UploadPhoto;
