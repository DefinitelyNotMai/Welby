import { Card } from "@chakra-ui/react";
import { ReactNode } from "react";

type WelcomeCardProps = {
  children: ReactNode;
  width?: string[];
};

const WelcomeCard = ({
  children,
  width = ["90%", "75%", "60%", "40%"],
}: WelcomeCardProps) => {
  return (
    <Card
      backgroundColor="primary.1"
      borderRadius="xl"
      boxShadow="dark-lg"
      marginY={16}
      width={width}
    >
      {children}
    </Card>
  );
};

export default WelcomeCard;
