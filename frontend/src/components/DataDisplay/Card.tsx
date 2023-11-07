// npm package imports
import {
  Card as ChakraCard,
  CardProps as ChakraCardProps,
} from "@chakra-ui/react";

type CardProps = ChakraCardProps & {
  children: ChakraCardProps["children"];
  cardVariant: "welcome" | "data";
};

const Card = ({ children, cardVariant, ...props }: CardProps) => {
  const cardVariants = {
    welcome: {
      backgroundColor: "#24a2f0",
      boxShadow: "dark-lg",
      marginY: 16,
    },
    data: {
      backgroundColor: "#ffffff",
    },
  };

  return (
    <ChakraCard
      borderRadius="xl"
      width={["90%", "75%", "60%", "40%"]}
      {...cardVariants[cardVariant]}
      {...props}
    >
      {children}
    </ChakraCard>
  );
};

export default Card;
