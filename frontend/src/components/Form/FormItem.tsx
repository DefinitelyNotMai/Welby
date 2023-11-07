import { FormControl, FormLabel, FormLabelProps } from "@chakra-ui/react";

type FormItemProps = FormLabelProps & {
  children: FormLabelProps["children"];
  htmlFor?: FormLabelProps["htmlFor"];
  isRequired?: boolean;
  label?: string;
  hideIndicator?: boolean;
};

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
        color="#ffffff"
        fontFamily="Montserrat"
        fontWeight="medium"
        fontSize={["sm", "md"]}
        htmlFor={htmlFor}
        requiredIndicator={
          hideIndicator ? (
            <span />
          ) : (
            <span style={{ color: "#ff0000" }}> *</span>
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

export default FormItem;
