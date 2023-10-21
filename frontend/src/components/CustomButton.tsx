import { Button } from "@chakra-ui/react";
import CustomText from "./CustomText";

type CustomButtonProps = {
  backgroundColor?: string;
  children: string;
  onClick: () => void;
  type: "button" | "submit";
  width?: string[];
};

const CustomButton = ({
  backgroundColor = "primary.1",
  children,
  onClick,
  type,
  width = ["100%"],
}: CustomButtonProps) => {
  return (
    <Button
      backgroundColor={backgroundColor}
      border="2px solid white"
      onClick={onClick}
      type={type}
      width={width}
    >
      <CustomText fontWeight="medium">{children}</CustomText>
    </Button>
  );
};

export default CustomButton;
