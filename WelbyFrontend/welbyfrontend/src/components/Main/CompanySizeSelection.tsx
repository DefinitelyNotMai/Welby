import { Select } from '@chakra-ui/react';

type SelectCompanySizeProps = {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectCompanySize = ({ value, onChange }: SelectCompanySizeProps) => {
    return (
        <Select
            placeholder="Choose your Company Size"
            bg="#ffffff"
            fontFamily="Montserrat"
            fontWeight="500"
            color="#000000"
            mb="5"
            onChange={onChange}
            value={value}
        >
            <option value="1-5">1 - 5</option>
            <option value="6-10">6 - 10</option>
            <option value="11-15">11 - 15</option>
            <option value="16-20">16 - 20</option>
            <option value="21-30">21 - 30</option>
            <option value="31-40">31 - 40</option>
            <option value="41-50">41 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="more than 100">more than 100</option>
        </Select>
    );
};

export default SelectCompanySize;

