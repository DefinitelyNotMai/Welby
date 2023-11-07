import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

type LinkProps = ChakraLinkProps & {
  children: ChakraLinkProps["children"];
  color: ChakraLinkProps["color"];
  onClick: () => void;
};

const Link = ({ children, color, onClick, ...props }: LinkProps) => {
  return (
    <ChakraLink
      color={color}
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
