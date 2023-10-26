import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface LinkProps extends ChakraLinkProps {
  children: ReactNode;
  onClick: () => void;
}

const Link = ({ children, onClick, ...props }: LinkProps) => {
  return (
    <ChakraLink
      color="white"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      onClick={onClick}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
