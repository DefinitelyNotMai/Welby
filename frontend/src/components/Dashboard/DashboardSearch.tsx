import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const DashboardSearch = () => {
  return (
    <InputGroup>
      <InputLeftElement>
        <Icon as={BsSearch} color="#24a2f0" />
      </InputLeftElement>
      <Input
        backgroundColor="ffffff"
        border="2px solid #f6f6f6"
        cursor="text"
        fontFamily="Montserrat"
        fontWeight="normal"
        placeholder="Search"
      />
    </InputGroup>
  );
};

export default DashboardSearch;
