import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import CustomButton from "../CustomButton";
import CustomText from "../CustomText";

type TeamMember = {
  EmployeeId: string;
  Nickname: string;
};

type TeamMembersListProps = {
  handleMemberSelect: (userId: string) => void;
};

const TeamMembersList = ({ handleMemberSelect }: TeamMembersListProps) => {
  const { companyId } = useUserContext();
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userUrl = "https://localhost:44373/api/GetEmployee";
      try {
        const response = await axios.get(userUrl, {
          headers: { "Content-Type": "application/json" },
          params: { CompanyId: companyId },
        });

        const result = response.data;

        if (result != null && result.length > 0) {
          console.log(result);
          setTeamMembers(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [companyId]);

  return (
    <Flex flexDirection="column" width="full" gap={4}>
      {teamMembers.map((member) => (
        <CustomButton
          backgroundColor={
            selectedMember === member.EmployeeId ? "white" : "primary.1"
          }
          borderColor={
            selectedMember === member.EmployeeId ? "primary.1" : "white"
          }
          key={member.EmployeeId}
          onClick={() => {
            handleMemberSelect(member.EmployeeId);
            setSelectedMember(member.EmployeeId);
          }} // Pass the userId when a member is selected
          type="button"
          width={["100%"]}
        >
          <CustomText
            color={
              selectedMember === member.EmployeeId ? "input.text" : "white"
            }
            fontWeight="medium"
          >
            {member.Nickname}
          </CustomText>
        </CustomButton>
      ))}
    </Flex>
  );
};

export default TeamMembersList;
