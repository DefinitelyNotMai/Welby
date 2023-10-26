import { FormControl, FormLabel, FormLabelProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormItemProps extends FormLabelProps {
  children: ReactNode;
  htmlFor?: string;
  isRequired?: boolean;
  label?: string;
  hideIndicator?: boolean;
}

const FormItem = ({
  children,
  hideIndicator,
  htmlFor,
  isRequired,
  label,
  ...props
}: FormItemProps) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel
        color="white"
        fontFamily="Montserrat"
        fontWeight="medium"
        fontSize={["sm", "md"]}
        htmlFor={htmlFor}
        requiredIndicator={hideIndicator ? <span /> : <span> *</span>}
        {...props}
      >
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
};

export default FormItem;
