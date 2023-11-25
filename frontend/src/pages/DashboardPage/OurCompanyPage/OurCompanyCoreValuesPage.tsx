// lib
import { Button, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { Section } from "../../../components/DataDisplay/Section";
import { UserContext } from "../../../context/UserContext";
import { fetchData } from "../../../api/fetchData";
import { VALUE_DATA, Value } from "../../../data/value";

export const OurCompanyCoreValuesPage = () => {
  document.title = "Company Core Values | Welby";

  const [values, setValues] = useState<Value[]>([]);
  const [selectedValue, setSelectedValue] = useState<Value>(VALUE_DATA);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const valuesUrl = "https://localhost:44373/api/GetValueByCompany";

        const data = await fetchData(valuesUrl, {
          CompanyId: userContext.companyId,
        });
        setValues(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchValues();
  }, [userContext.companyId]);

  return (
    <Grid gap={4} templateColumns="1.25fr 2fr" width="full">
      <Section borderRadius="1rem 1rem 0 0" title="Core Values">
        {values.map((value) => (
          <Button
            backgroundColor={
              selectedValue.ValueId === value.ValueId ? "#24a2f0" : "#cccccc"
            }
            key={value.ValueId}
            onClick={() => {
              if (selectedValue.ValueId === value.ValueId) {
                setSelectedValue(VALUE_DATA);
              } else {
                setSelectedValue(value);
              }
            }}
            variant="list"
          >
            {value.Title}
          </Button>
        ))}
      </Section>
      <Section
        borderRadius="1rem 0 0 0"
        title={selectedValue.Title || "Value Name"}
      >
        {selectedValue.Description}
      </Section>
    </Grid>
  );
};
