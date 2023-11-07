import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import fetchAccessToken from "../../api/tokenService";
import {
  Country,
  Gender,
  IndustryType,
  Strength,
} from "../../data/typesMaster";
import { SystemSecurityGroup } from "../../data/typesOWS";

type Option = {
  id: string;
  label: string;
};

type SelectProps = ChakraSelectProps & {
  additionalHeaders?: Record<string, string>;
  fetchUrl: string;
  mapOptions: (data: any) => Option[];
  placeholder: string;
  sliceData?: number;
};

type SelectChildProps = {
  id: string;
  name: string;
  onChange: (selectedValue: ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string; label: string }[]; // Add this line
  value: string;
};

const Select = ({
  fetchUrl,
  mapOptions,
  placeholder,
  ...props
}: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchDataAndSetOptions = async () => {
      try {
        const data = await fetchData(fetchUrl, { Active: "1" });
        setOptions(mapOptions(data));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      // try {
      //   const response = await axios.get(fetchUrl, {
      //     method: "GET",
      //     headers: { "Content-Type": "application/json" },
      //     params: { Active: 1 },
      //   });

      //   const data = response.data;
      //   setOptions(mapOptions(data));
      // } catch (error) {
      //   console.error("Error fetching data: ", error);
      // }
    };
    fetchDataAndSetOptions();
  }, [fetchUrl, mapOptions]);

  return (
    <ChakraSelect
      backgroundColor="#ffffff"
      color="#757575"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      _placeholder={{ color: "#bcbcbc" }}
      placeholder={placeholder}
      {...props}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  );
};

const SelectCompanySize = ({
  id,
  name,
  onChange,
  value,
  ...props
}: SelectChildProps) => {
  const companySizeOptions = [
    { id: "1 - 5", label: "1 - 5" },
    { id: "6 - 10", label: "6 - 10" },
    { id: "11 - 15", label: "11 - 15" },
    { id: "16 - 20", label: "16 - 20" },
    { id: "21 - 30", label: "21 - 30" },
    { id: "31 - 40", label: "31 - 40" },
    { id: "41 - 50", label: "41 - 50" },
    { id: "51 - 100", label: "51 - 100" },
    { id: "more than 100", label: "more than 100" },
  ];

  return (
    <ChakraSelect
      backgroundColor="white"
      color="#757575"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Company Size..."
      _placeholder={{ color: "#bcbcbc" }}
      {...props}
      value={value}
    >
      {companySizeOptions.map((companySize) => (
        <option key={companySize.id} value={companySize.label}>
          {companySize.label}
        </option>
      ))}
    </ChakraSelect>
  );
};

const SelectCountry = ({ id, name, onChange, value }: SelectChildProps) => {
  return (
    <Select
      fetchUrl="https://localhost:44373/api/GetAllCountry"
      id={id}
      mapOptions={(data) =>
        data.map((country: Country) => ({
          id: country.CountryId,
          label: country.Name,
        }))
      }
      name={name}
      onChange={onChange}
      placeholder="Select Country..."
      value={value}
    />
  );
};

const SelectGender = ({ id, name, onChange, value }: SelectChildProps) => {
  return (
    <Select
      fetchUrl="https://localhost:44373/api/GetGender"
      id={id}
      mapOptions={(data) =>
        data.map((gender: Gender) => ({
          id: gender.GenderId,
          label: gender.Gender,
        }))
      }
      name={name}
      onChange={onChange}
      placeholder="Select Gender..."
      value={value}
    />
  );
};

const SelectIndustryType = ({
  id,
  name,
  onChange,
  value,
}: SelectChildProps) => {
  return (
    <Select
      fetchUrl="https://localhost:44373/api/GetIndustryTypes"
      id={id}
      mapOptions={(data) =>
        data.map((industryType: IndustryType) => ({
          id: industryType.IndustryTypeId,
          label: industryType.Industry_Name,
        }))
      }
      name={name}
      onChange={onChange}
      placeholder="Select Industry Type..."
      value={value}
    />
  );
};

const SelectStrength = ({ id, name, onChange, value }: SelectChildProps) => {
  return (
    <Select
      fetchUrl="https://localhost:44373/api/GetStrength"
      id={id}
      mapOptions={(data) =>
        data.map((strength: Strength) => ({
          id: strength.StrengthId,
          label: strength.Strength,
        }))
      }
      name={name}
      onChange={onChange}
      placeholder="Choose here..."
      value={value}
    />
  );
};

const SelectRole = ({
  id,
  name,
  onChange,
  value,
  ...props
}: SelectChildProps) => {
  const [options, setOptions] = useState<SystemSecurityGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await fetchAccessToken();
        const securityGroupUrl =
          "http://localhost:58258/api/GetSystemSecurityGroup";

        const response = await fetch(`${securityGroupUrl}?Active=true`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const result = data.slice(2); // slice first 2 options
        setOptions(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  });

  return (
    <ChakraSelect
      backgroundColor="white"
      color="#757575"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Role..."
      _placeholder={{ color: "#bcbcbc" }}
      value={value}
      {...props}
    >
      {options.map((option) => (
        <option key={option.SecurityGroupId} value={option.SecurityGroupId}>
          {option.SecurityGroupName}
        </option>
      ))}
    </ChakraSelect>
  );
};

export {
  SelectCompanySize,
  SelectCountry,
  SelectGender,
  SelectIndustryType,
  SelectRole,
  SelectStrength,
};
