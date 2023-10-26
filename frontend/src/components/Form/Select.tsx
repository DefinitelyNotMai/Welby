import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface SelectProps extends ChakraSelectProps {
  fetchUrl: string;
  mapOptions: (data: any) => Option[];
  placeholder: string;
}

interface SelectChildProps {
  id: string;
  name: string;
  onChange: (selectedValue: ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string; label: string }[]; // Add this line
  value: string;
}

interface Option {
  id: string;
  label: string;
}

const Select = ({
  fetchUrl,
  mapOptions,
  placeholder,
  ...props
}: SelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);

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
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [fetchUrl, mapOptions]);

  return (
    <ChakraSelect
      backgroundColor="white"
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      _placeholder={{ color: "input.placeholder" }}
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
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Company Size..."
      _placeholder={{ color: "input.placeholder" }}
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

interface Country {
  CountryId: string;
  Name: string;
}

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

interface Gender {
  GenderId: string;
  Gender: string;
}

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

interface IndustryType {
  IndustryTypeId: string;
  Industry_Name: string;
}

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

interface Strength {
  StrengthId: string;
  Strength: string;
  Category: string;
  Description: string;
}

const SelectStrength = ({
  id,
  name,
  onChange,
  value,
  ...props
}: SelectChildProps) => {
  const [options, setOptions] = useState<Strength[]>([]);

  useEffect(() => {
    const fetchStrengths = async () => {
      const strengthsUrl = "https://localhost:44373/api/GetStrength";
      try {
        const response = await axios.get(strengthsUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: { Active: 1 },
        });

        const data = response.data;
        setOptions(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchStrengths();
  }, []);

  return (
    // <Select
    //   fetchUrl="https://localhost:44373/api/GetStrength"
    //   id={id}
    //   mapOptions={(data) =>
    //     data.map((strength: Strength) => ({
    //       id: strength.StrengthId,
    //       label: strength.Strength,
    //     }))
    //   }
    //   name={name}
    //   onChange={onChange}
    //   placeholder="Choose here..."
    //   value={value}
    // />
    <ChakraSelect
      backgroundColor="white"
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Choose here..."
      _placeholder={{ color: "input.placeholder" }}
      value={value}
      {...props}
    >
      {options.map((option) => (
        <Tooltip key={option.StrengthId} label={option.Description}>
          <option key={option.StrengthId} value={option.StrengthId}>
            {option.Strength}
          </option>
        </Tooltip>
      ))}
    </ChakraSelect>
  );
};

interface Role {
  SecurityGroupId: string;
  SecurityGroupName: string;
}

const SelectRole = ({
  id,
  name,
  onChange,
  value,
  ...props
}: SelectChildProps) => {
  const [options, setOptions] = useState<Role[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const adminUserName = "Venancio";
      const adminUserPassword = "Jones";

      const header = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      };

      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", adminUserName);
      formData.append("password", adminUserPassword);

      try {
        const tokenUrl = "http://localhost:58258/token";
        const tokenResponse = await fetch(tokenUrl, {
          method: "POST",
          headers: header,
          body: formData,
        }).then((response) => {
          return response.json();
        });

        if (tokenResponse != null) {
          const token = tokenResponse.access_token;
          const securityGroupUrl =
            "http://localhost:58258/api/GetSystemSecurityGroup";

          const param = {
            Active: true,
          };

          axios
            .get(securityGroupUrl, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              params: param,
            })
            .then((response) => {
              const result = response.data.slice(1);
              setOptions(result);
            });
        }
      } catch (error) {
        console.error("An error occured: ", error);
      }
    };
    fetchData();
  });

  return (
    <ChakraSelect
      backgroundColor="white"
      color="input.text"
      fontFamily="Montserrat"
      fontSize={["sm", "md"]}
      fontWeight="medium"
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Role..."
      _placeholder={{ color: "input.placeholder" }}
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
