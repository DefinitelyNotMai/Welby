// lib
import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";

type UploadPhotoProps = {
  buttonWidth: string[];
  id: string;
  label: string;
  name: string;
  onChange: (base64: string) => void;
  value: string;
};

export const UploadPhoto = ({
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
          <Text>{label}</Text>
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