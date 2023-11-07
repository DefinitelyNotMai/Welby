import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

type AdminModalProps = ModalProps & {
  children: ModalProps["children"];
  header: string;
  isOpen: boolean;
  onClose: ModalProps["onClose"];
};

const AdminModal = ({
  children,
  header,
  isOpen,
  onClose,
  ...props
}: AdminModalProps) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent
        background="#24a2f0"
        minWidth="50%"
        paddingX={4}
        paddingY={8}
      >
        <ModalHeader
          color="#ffffff"
          fontFamily="Montserrat"
          fontWeight="extrabold"
          fontSize="4xl"
          textAlign="center"
        >
          {header}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminModal;
