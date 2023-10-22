import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

type CustomButtonProps = {
  backgroundColor?: string;
  borderColor?: string;
  children: ReactNode;
  fontSize?: string[];
  onClick?: () => void;
  type: "button" | "submit";
  width?: string[];
};

const CustomButton = ({
  backgroundColor = "primary.1",
  borderColor = "white",
  children,
  fontSize = ["xs", "sm"],
  onClick,
  type,
  width = ["60%", "50%"],
}: CustomButtonProps) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      borderWidth="2px"
      borderStyle="solid"
      borderColor={borderColor}
      fontSize={fontSize}
      onClick={onClick}
      type={type}
      width={width}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
