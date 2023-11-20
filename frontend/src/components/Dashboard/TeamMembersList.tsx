import { Button, Flex } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import { UserContext } from "../../context/UserContext";

type TeamMember = {
  CompanyId: string;
  EmployeeId: string;
  Nickname: string;
};

export const TeamMembersList = () => {
  const [employees, setEmployees] = useState<TeamMember[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const userContext = useContext(UserContext);
  const companyId = userContext.companyId;
  const email = userContext.email;
  const phone = userContext.phone;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const employeesUrl = "https://localhost:44373/api/GetAllEmployees";

        const data = await fetchData(employeesUrl, {
          Email: email,
          Phone_Number: phone,
          CompanyId: companyId,
        });
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMembers();
  }, [companyId, email, employees, phone]);

  return (
    <Flex flexDirection="column">
      {employees.map((member) => (
        <Button
          key={member.EmployeeId}
          onClick={() => {
            console.log("My name is: " + member.Nickname);
            console.log("My companyId is: " + member.CompanyId);
          }}
        >
          {member.Nickname}
        </Button>
      ))}
    </Flex>
  );
};
