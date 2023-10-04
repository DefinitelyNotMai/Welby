import { Flex, Grid, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CustomButton from "../Button";
import Label from "./Label";
import Textbox from "./Textbox";
import { useUserContext } from '../../context/UserContext'
import axios from "axios";
import bcrypt from 'bcryptjs'

type EmployeeFormData = {
    Email: string;
    Password: string;
    Role: string;
}

const EMPLOYEE_DATA: EmployeeFormData = {
    Email: '',
    Password: '',
    Role: '',
}

type ModalAddEmployeeProps = {
    isOpen: boolean;
    onClose: () => void;
    updateFields: (fields: Partial<EmployeeFormData>) => void;
}



const AddEmployee = ({ isOpen, onClose, updateFields }: ModalAddEmployeeProps) => {
    const [addEmployeeData, setAddEmployeeData] = useState(EMPLOYEE_DATA);
    const { userId } = useUserContext();

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    function updateAddEmployeeFields(fields: Partial<EmployeeFormData>) {
        setAddEmployeeData((prev) => {
            return { ...prev, }
        })
    }

    const handleSubmit = async () => {
        let temporaryData = {
            "Email": addEmployeeData.Email,
            //"CompanyId": use,
            "CompanyPosition": addEmployeeData.Role,
            "FirstLogIn": 1,
            "Encoded_By": userId,
        }

        try {
            var addEmployeeUrl = 'https://localhost:44373/api/AddEmployee' 
            const addEmployee = await axios
                .post(addEmployeeUrl, temporaryData, config)
                .then((response) => {
                    console.log(response.data)
                    return response.data
                }).catch((error) => {
                    console.log(error)
                });

            if (addEmployee != null) {
                const getEmployeeUrl = 'https://localhost:44373/api/GetEmployee'
                let param = {
                    "Email": addEmployeeData.Email,
                }
                const employee = await axios
                    .get(getEmployeeUrl, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        params: param,
                    })
                    .then((response) => {
                        var result = response.data;
                        if (result != null) {
                            if (result.length > 0) {
                                console.log(result);
                                console.log("added to welby")
                                //setting company admin id
                                return result[0]
                            }
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });

                if (employee != null) {
                    const tokenUrl = 'http://localhost:58258/token';
                    let header = {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*',
                    };

                    const adminUserName = "Venancio"
                    const adminUserPassword = "Jones"

                    const formData = new URLSearchParams();
                    formData.append('grant_type', 'password');
                    formData.append('username', adminUserName);
                    formData.append('password', adminUserPassword);

                    const tokenResponse = await fetch(tokenUrl, {
                        method: 'POST',
                        headers: header,
                        body: formData,
                    }).then((res) => {
                        return res.json();
                    }).catch(function (error) {
                        console.log(error);
                    });

                    if (tokenResponse != null) {
                        var token = tokenResponse.access_token;
                        const addToOWSUrl = 'http://localhost:58258/api/AddSystemUsers';

                        const hashedPassword = await bcrypt.hash(addEmployeeData.Password, 10)

                        let user = {
                            "UserCode": employee.EmployeeId,
                            "UserName": addEmployeeData.Email,
                            "Password": hashedPassword,
                            "AccountLocked": 0,
                            "LoggedIn": 0,
                            "PasswordNoExpiry": null,
                            "ExpiryDays": null,
                            "AccountVerified": null,
                            "VerifiedDate": null,
                            "Encoded_By": userId,
                            "Active": true
                        }

                        const addToOWS = await axios
                            .post(addToOWSUrl, user, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                }

                            })
                            .then((response) => {
                                console.log(response.data);
                                //alert("Success! Log in to access your dashboard.")
                                console.log("Successfully added to OWS")
                                return response.data
                                //navigate('/')
                            })
                            .catch(function (error) {
                                console.log(error)
                            });

                        if (addToOWS != null) {
                            const tokenUrl = 'http://localhost:58258/token';
                            let header = {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Access-Control-Allow-Origin': '*',
                            };

                            const adminUserName = "Venancio"
                            const adminUserPassword = "Jones"

                            const formData = new URLSearchParams();
                            formData.append('grant_type', 'password');
                            formData.append('username', adminUserName);
                            formData.append('password', adminUserPassword);

                            const tokenResponse = await fetch(tokenUrl, {
                                method: 'POST',
                                headers: header,
                                body: formData,
                            }).then((res) => {
                                return res.json();
                            }).catch(function (error) {
                                console.log(error);
                            });

                            if (tokenResponse != null) {
                                var token = tokenResponse.access_token;
                                const mapCompanyAdminrUrl = 'http://localhost:58258/api/MapSystemUsersToSecurityGroupMapping';

                                let mapAdmin = {
                                    "SecurityGroupId": 6,
                                    "UserId": addToOWS.UserId,
                                    "Encoded_By": userId
                                }

                                axios
                                    .post(mapCompanyAdminrUrl, mapAdmin, {
                                        headers: {
                                            'Authorization': `Bearer ${token}`,
                                            'Content-Type': 'application/json',
                                        }

                                    })
                                    .then((response) => {
                                        console.log(response.data);
                                        alert("Success! Added member to your team!")
                                        console.log("Mapped Admin")
                                        return response.data
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    });
                            }
                        }
                    }
                }
            }

        } catch (error) {
            // Handle network or other error
            console.error('An error occurred:', error);
        }
    };

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
                    <Grid templateColumns="1fr 2fr" mb="8" gap={2}>
                        <VStack justifyContent="center" alignItems="flex-end">
                            <Label name="Member Email:" pb="4"  />
                            <Label name="Member Temporary Password:" />
                            <Label name="Member Role:" />
                        </VStack>
                        <VStack>
                            <Textbox
                                placeholder="Email"
                                onChange={(e) => updateFields({Email: e.target.value})}
                            />
                            <Textbox
                                placeholder="Temporary member password"
                                onChange={(e) => updateFields({Password: e.target.value })}
                            />
                            <Textbox
                                placeholder="Team Leader || Team Member"
                                onChange={(e) => updateFields({Role: e.target.value })}  
                            />
                        </VStack>
                    </Grid>
                    <Flex flexDirection="row-reverse" gap="4" mb="4">
                        <CustomButton color="#ffffff" width="25%" onClick={handleSubmit}>Add</CustomButton>
                        <CustomButton color="#ffffff" bg="#bcbcbc" width="25%" onClick={onClose}>Cancel</CustomButton>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default AddEmployee;