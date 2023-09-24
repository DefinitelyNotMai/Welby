import { Flex, Grid, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, VStack } from "@chakra-ui/react";

type EditMissionProps = {
    isOpen: boolean;
    onClose: () => void;
}

const EditMission = ({
    isOpen,
    onClose,
}: EditMissionProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent minW="35%" p="16" bg="#24a2f0">
                <ModalHeader>
                    <Text color="#ffffff" fontFamily="Montserrat" fontWeight="500" fontSize="24" textAlign="center">MISSION</Text>
                </ModalHeader>
                <ModalBody>
                    <Textarea bg="#ffffff" h="10rem"/>
                </ModalBody>
            </ModalContent>
        </Modal>
    ); 
}

export default EditMission;