import {
  Button,
  Flex,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useContext, useState, FormEvent, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

type EditMissionProps = {
  missionData: string;
};

export const EditMission = ({ missionData }: EditMissionProps) => {
  const [editedMission, setEditedMission] = useState(missionData);

  const userContext = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {});
  const handleEditCompany = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const company = {
      CompanyId: userContext.companyId,
      Mission: editedMission,
      Encoded_By: 24287,
    };

    const updateCompanyUrl = "https://localhost:44373/api/UpdateCompany";

    axios
      .patch(updateCompanyUrl, company, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: "Company Mission has been updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //handleEditCompany();
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Mission</ModalHeader>
        <ModalCloseButton />
        <Form onSubmit={handleSubmit}>
          <Flex alignItems="center" flexDirection="column" gap={4} margin={8}>
            <Textarea
              onChange={(e) => setEditedMission(e.target.value)}
              value={editedMission}
            />
            <Button type="submit">SUBMIT</Button>
          </Flex>
        </Form>
      </ModalContent>
    </>
  );
};
