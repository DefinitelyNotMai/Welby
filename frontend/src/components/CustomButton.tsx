import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

type CustomButtonProps = {
  backgroundColor?: string;
  children: ReactNode;
  fontSize?: string[];
  onClick?: () => void;
  type: "button" | "submit";
  width?: string[];
};

const CustomButton = ({
  backgroundColor = "primary.1",
  children,
  fontSize = ["xs", "sm"],
  onClick,
  type,
  width = ["60%", "50%"],
}: CustomButtonProps) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      border="2px solid white"
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
