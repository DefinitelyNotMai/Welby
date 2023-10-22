import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type CustomTextProps = {
  children: ReactNode;
  color?: string;
  fontFamily?: string;
  fontWeight?:
    | "black"
    | "bold"
    | "extrabold"
    | "hairline"
    | "light"
    | "medium"
    | "normal"
    | "semibold"
    | "thin";
  noOfLines?: number;
};

const CustomText = ({
  children,
  color = "white",
  fontFamily = "Montserrat",
  fontWeight = "normal",
  noOfLines,
}: CustomTextProps) => {
  return (
    <Text
      color={color}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      noOfLines={noOfLines}
    >
      {children}
    </Text>
  );
};

export default CustomText;
