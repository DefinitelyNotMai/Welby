import { Flex, Grid, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CustomButton from "../Button";
import Label from "./Label";
import Textbox from "./Textbox";

type EmployeeFormData = {
    Email: string;
    Role: string;
}

const EMPLOYEE_DATA: EmployeeFormData = {
    Email: '',
    Role: '',
}

type ModalAddEmployeeProps = {
    isOpen: boolean;
    onClose: () => void;
}

const AddEmployee = ({ isOpen, onClose }: ModalAddEmployeeProps) => {
    const [addEmployeeData, setAddEmployeeData] = useState(EMPLOYEE_DATA);

    function updateAddEmployeeFields(fields: Partial<EmployeeFormData>) {
        setAddEmployeeData((prev) => {
            return { ...prev, }
        })
    }

    const handleSubmit = () => { };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent minW="35%">
                <ModalHeader>
                    <Text fontFamily="Montserrat" fontWeight="700" fontSize="24">Add Employee</Text>
                </ModalHeader>
                <ModalBody>
                    <Grid templateColumns="1fr 2fr" mb="8">
                        <VStack justifyContent="center">
                            <Label name="Member Email:" pb="4" />
                            <Label name="Member Role:" />
                        </VStack>
                        <VStack>
                            <Textbox placeholder="Email" />
                            <Textbox placeholder="Team Leader || Team Member" />
                        </VStack>
                    </Grid>
                    <Flex flexDirection="row-reverse" gap="4" mb="4">
                        <CustomButton color="#ffffff" width="25%">Add</CustomButton>
                        <CustomButton color="#ffffff" bg="#bcbcbc" width="25%" onClick={onClose}>Cancel</CustomButton>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddEmployee;