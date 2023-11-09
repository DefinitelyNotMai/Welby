// lib
import { FormControl, FormLabel, FormLabelProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type FormItemProps = FormLabelProps & {
  children: ReactNode;
  isRequired?: boolean;
  label?: string;
  hideIndicator?: boolean;
};

export const FormItem = ({
  children,
  isRequired,
  label,
  hideIndicator,
  ...props
}: FormItemProps) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel
        color="#ffffff"
        fontSize="0.875rem"
        fontWeight="medium"
        requiredIndicator={
          hideIndicator ? (
            <span />
          ) : (
            <span style={{ color: "#ffa500" }}> *</span>
          )
        }
        {...props}
      >
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
};
