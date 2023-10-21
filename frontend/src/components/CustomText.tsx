import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type CustomTextProps = {
  children: ReactNode;
  color?: string;
  fontFamily?: string;
  fontSize?: string[];
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
  fontSize = ["sm", "md"],
  fontWeight = "normal",
  noOfLines,
}: CustomTextProps) => {
  return (
    <Text
      color={color}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      noOfLines={noOfLines}
    >
      {children}
    </Text>
  );
};

export default CustomText;
