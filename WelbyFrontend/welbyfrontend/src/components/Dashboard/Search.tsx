import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

const DashboardSearch = () => {
    return (
        <InputGroup>
            <InputLeftElement>
                <Icon as={BsSearch} color="#24a2f0" />
            </InputLeftElement>
            <Input
                bg="ffffff"
                cursor="text"
                border="2px solid #f6f6f6"
                fontFamily="Montserrat"
                fontWeight="400"
                placeholder="Search"
            />
        </InputGroup>
    );
};

export default DashboardSearch;