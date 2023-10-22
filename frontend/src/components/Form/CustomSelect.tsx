import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import CustomText from "../CustomText";

type OptionType = {
  id: string;
  label: string;
};

type CustomSelectProps = {
  fetchUrl: string;
  mapOptions: (data: any) => OptionType[];
  onClick: (selectedValue: string) => void;
  placeholder: string;
  value: string;
};

type CustomSelectChildProps = {
  onClick: (selectedValue: string) => void;
  value: string;
};

const CustomSelect = ({
  fetchUrl,
  mapOptions,
  onClick,
  placeholder,
  value,
}: CustomSelectProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(fetchUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: { Active: 1 },
        });

        const data = response.data;
        setOptions(mapOptions(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchUrl, mapOptions]);

  const selectedOption = options.find((option) => option.id === value);

  return (
    <Menu>
      <MenuButton
        as={Button}
        backgroundColor="#ffffff"
        color="#24a2f0"
        fontSize={["xs", "sm"]}
        rightIcon={<BsChevronDown />}
        width="full"
        textAlign="left"
      >
        <CustomText
          color={selectedOption ? "#757575" : "#b7b7b7"}
          fontWeight="medium"
        >
          {selectedOption ? selectedOption.label : placeholder}
        </CustomText>
      </MenuButton>
      <MenuList height={64} overflowY="auto">
        {options.map((option) => (
          <MenuItem
            color="#757575"
            fontFamily="Montserrat"
            fontSize={["xs", "sm"]}
            fontWeight="medium"
            key={option.id}
            onClick={() => onClick(option.id)}
            value={option.id}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

// SelectCompanySize
type SelectCompanySizeProps = {
  onClick: (selectedValue: string) => void;
  value: string;
};

const SelectCompanySize = ({ onClick, value }: SelectCompanySizeProps) => {
  const companySizeOptions = [
    { id: "1-5", label: "1 - 5" },
    { id: "6-10", label: "6 - 10" },
    { id: "11-15", label: "11 - 15" },
    { id: "16-20", label: "16 - 20" },
    { id: "21-30", label: "21 - 30" },
    { id: "31-40", label: "31 - 40" },
    { id: "41-50", label: "41 - 50" },
    { id: "51-100", label: "51 - 100" },
    { id: "more than 100", label: "more than 100" },
  ];

  const selectedOption = companySizeOptions.find(
    (option) => option.id === value,
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        backgroundColor="#ffffff"
        color="#24a2f0"
        fontSize={["xs", "sm"]}
        rightIcon={<BsChevronDown />}
        textAlign="left"
        width="full"
      >
        <CustomText
          color={selectedOption ? "#757575" : "#b7b7b7"}
          fontWeight="medium"
        >
          {selectedOption ? selectedOption.label : "Select Company Size"}
        </CustomText>
      </MenuButton>
      <MenuList height={64} overflowY="auto">
        {companySizeOptions.map((option) => (
          <MenuItem
            color="#757575"
            fontFamily="Montserrat"
            fontSize={["xs", "sm"]}
            fontWeight="medium"
            key={option.id}
            onClick={() => onClick(option.id)}
            value={option.id}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

// SelectCountry
type Country = {
  CountryId: string;
  Name: string;
};

const SelectCountry = ({ onClick, value }: CustomSelectChildProps) => {
  return (
    <CustomSelect
      fetchUrl="https://localhost:44373/api/GetAllCountry"
      mapOptions={(data) =>
        data.map((country: Country) => ({
          id: country.CountryId,
          label: country.Name,
        }))
      }
      onClick={onClick}
      placeholder="Select Country"
      value={value}
    />
  );
};

// SelectGender
type Gender = {
  GenderId: string;
  Gender: string;
};

const SelectGender = ({ onClick, value }: CustomSelectChildProps) => {
  return (
    <CustomSelect
      fetchUrl="https://localhost:44373/api/GetGender"
      mapOptions={(data) =>
        data.map((gender: Gender) => ({
          id: gender.GenderId,
          label: gender.Gender,
        }))
      }
      placeholder="Select Gender"
      onClick={onClick}
      value={value}
    />
  );
};

// SelectIndustryType
type IndustryType = {
  IndustryTypeId: string;
  Industry_Name: string;
};

const SelectIndustryType = ({ onClick, value }: CustomSelectChildProps) => {
  return (
    <CustomSelect
      fetchUrl="https://localhost:44373/api/GetIndustryTypes"
      mapOptions={(data) =>
        data.map((industryType: IndustryType) => ({
          id: industryType.IndustryTypeId,
          label: industryType.Industry_Name,
        }))
      }
      onClick={onClick}
      placeholder="Select Industry Type"
      value={value}
    />
  );
};

export { SelectCompanySize, SelectCountry, SelectGender, SelectIndustryType };
