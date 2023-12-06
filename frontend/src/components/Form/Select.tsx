// lib
import { ChangeEvent, useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";

// local
import { Country } from "../../data/country";
import { Gender } from "../../data/gender";
import { IndustryType } from "../../data/industryType";
import { Strength } from "../../data/strength";
import { fetchData } from "../../api/fetchData";
import { Company } from "../../data/company";

type CustomSelectProps = {
  id: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: number | string;
};

export const SelectCompanySize = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
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
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Company Size..."
      value={value}
    >
      {companySizeOptions.map((companySize) => (
        <option key={companySize.id} value={companySize.id}>
          {companySize.label}
        </option>
      ))}
    </Select>
  );
};

export const SelectCompany = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const companiesUrl = "https://localhost:44373/api/GetCompanies";
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await fetchData(companiesUrl, { Active: "1" });
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Company..."
      value={value}
    >
      {companies.map((company) => (
        <option key={company.CompanyId} value={company.CompanyId}>
          {company.Name}
        </option>
      ))}
    </Select>
  );
};

export const SelectCountry = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
  const [countries, setCountries] = useState<Country[]>([]);

  const countriesUrl = "https://localhost:44373/api/GetCountries";
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await fetchData(countriesUrl, {
          CountryId: 0,
          Name: "",
          Active: true,
        });
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Country..."
      value={value}
    >
      {countries.map((country) => (
        <option key={country.CountryId} value={country.CountryId}>
          {country.Name}
        </option>
      ))}
    </Select>
  );
};

export const SelectGender = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
  const [genders, setGenders] = useState<Gender[]>([]);

  const gendersUrl = "https://localhost:44373/api/GetGender";
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const data = await fetchData(gendersUrl, { Active: "1" });
        setGenders(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchGenders();
  }, []);

  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Gender..."
      value={value}
    >
      {genders.map((gender) => (
        <option key={gender.GenderId} value={gender.GenderId}>
          {gender.Gender}
        </option>
      ))}
    </Select>
  );
};

export const SelectIndustryType = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
  const [industryTypes, setIndustryTypes] = useState<IndustryType[]>([]);

  const industryTypesUrl = "https://localhost:44373/api/GetIndustryTypes";
  useEffect(() => {
    const fetchIndustryTypes = async () => {
      try {
        const data = await fetchData(industryTypesUrl, {
          IndustryTypeId: 0,
          Industry_Name: "",
          Active: true,
        });
        setIndustryTypes(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchIndustryTypes();
  }, []);

  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Industry Type..."
      value={value}
    >
      {industryTypes.map((industryType) => (
        <option
          key={industryType.IndustryTypeId}
          value={industryType.IndustryTypeId}
        >
          {industryType.Industry_Name}
        </option>
      ))}
    </Select>
  );
};

export const SelectStrength = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
  const [strengths, setStrengths] = useState<Strength[]>([]);

  const strengthsUrl = "https://localhost:44373/api/GetStrengths";
  useEffect(() => {
    const fetchStrengths = async () => {
      try {
        const data = await fetchData(strengthsUrl, {
          StrengthId: 0,
          Strength: "",
          Category: "",
          Description: "",
          Active: true,
        });
        setStrengths(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchStrengths();
  }, []);

  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Choose here..."
      value={value}
    >
      {strengths.map((strength) => (
        <option key={strength.StrengthId} value={strength.StrengthId}>
          {strength.Strength}
        </option>
      ))}
    </Select>
  );
};

export const SelectStrengthCategory = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
  const strengthCategoryOptions = [
    { id: "Being", label: "Being" },
    { id: "Communicating", label: "Communicating" },
    { id: "Motivating", label: "Motivating" },
    { id: "Relating", label: "Relating" },
    { id: "Thinking", label: "Thinking" },
  ];

  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Category..."
      value={value}
    >
      {strengthCategoryOptions.map((strengthCategory) => (
        <option key={strengthCategory.id} value={strengthCategory.id}>
          {strengthCategory.label}
        </option>
      ))}
    </Select>
  );
};

export const SelectRole = ({
  id,
  name,
  onChange,
  value,
}: CustomSelectProps) => {
  const companyRoleOptions = [
    { id: "Company Admin", label: "Company Admin" },
    { id: "Leader", label: "Leader" },
    { id: "Member", label: "Member" },
  ];

  return (
    <Select
      id={id}
      name={name}
      onChange={onChange}
      placeholder="Select Role..."
      value={value}
    >
      {companyRoleOptions.map((companyRole) => (
        <option key={companyRole.id} value={companyRole.id}>
          {companyRole.label}
        </option>
      ))}
    </Select>
  );
};
