import {
  Card as ChakraCard,
  CardProps as ChakraCardProps,
} from "@chakra-ui/react";

import { ReactNode } from "react";

interface CardProps extends ChakraCardProps {
  children: ReactNode;
  variant: "welcome" | "data";
}

const Card = ({ children, variant, ...props }: CardProps) => {
  const cardVariants = {
    welcome: {
      backgroundColor: "primary.1",
      boxShadow: "dark-lg",
      marginY: 16,
    },
    data: {
      backgroundColor: "white",
    },
  };

  return (
    <ChakraCard
      borderRadius="xl"
      width={["90%", "75%", "60%", "40%"]}
      {...cardVariants[variant]}
      {...props}
    >
      {children}
    </ChakraCard>
  );
};

export default Card;
