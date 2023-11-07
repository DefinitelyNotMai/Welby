import {
  Drawer as ChakraDrawer,
  DrawerProps as ChakraDrawerProps,
  DrawerBody,
  DrawerContent,
} from "@chakra-ui/react";

type DrawerProps = ChakraDrawerProps & {
  children: ChakraDrawerProps["children"];
  isOpen: boolean;
  onClose: () => void;
};

const Drawer = ({ children, isOpen, onClose }: DrawerProps) => {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      size={["full", "xs"]}
    >
      <DrawerContent width="full">
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
