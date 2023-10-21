import { FormControl, FormLabel } from "@chakra-ui/react";

type FormItemProps = {
  children: React.ReactNode;
  htmlFor: string;
  isRequired?: boolean;
  label?: string;
};

const FormItem = ({ children, htmlFor, isRequired, label }: FormItemProps) => {
  return (
    <FormControl isRequired={isRequired}>
      {label && (
        <FormLabel
          color="white"
          fontFamily="Montserrat"
          fontWeight="medium"
          fontSize={["sm", "md"]}
          htmlFor={htmlFor}
        >
          {label}
        </FormLabel>
      )}
      {children}
    </FormControl>
  );
};

export default FormItem;
