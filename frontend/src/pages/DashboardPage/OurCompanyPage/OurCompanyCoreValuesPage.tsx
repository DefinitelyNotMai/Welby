// lib
import { Button, Flex, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import {
  AddValue,
  DeleteValue,
  EditValue,
} from "../../../components/Modal/Dashboard/DashboardValueModal";
import { BsPencilSquare } from "react-icons/bs";
import { Section } from "../../../components/DataDisplay/Section";
import { TbFilePlus, TbTrash } from "react-icons/tb";
import { UserContext } from "../../../context/UserContext";
import { VALUE_DATA, Value } from "../../../data/value";
import { fetchData } from "../../../api/fetchData";

export const OurCompanyCoreValuesPage = () => {
  document.title = "Company Core Values | Welby";

  const [values, setValues] = useState<Value[]>([]);
  const [selectedValue, setSelectedValue] = useState<Value>(VALUE_DATA);
  const [valueData, setValueData] = useState<Value>(VALUE_DATA);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(true);

  const userContext = useContext(UserContext);

  const updateValueFields = (fields: Partial<Value>) => {
    setValueData((prev) => {
      return { ...prev, ...fields };
    });
  };

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const valuesUrl = "https://localhost:44373/api/GetValues";

        const data = await fetchData(valuesUrl, {
          ValueId: 0,
          CompanyId: userContext.companyId,
          Title: "",
          Description: "",
          Active: true,
        });
        setValues(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    if (fetched) {
      setFetched(false);
      fetchValues();
    }
  }, [fetched, userContext.companyId]);

  const handleClose = () => {
    setFetched(true);
    setValueData(VALUE_DATA);
    setSelectedValue(VALUE_DATA);
    setIsModalOpen(false);
    setMode("");
  };

  return (
    <Grid gap={4} templateColumns="1.25fr 2fr" width="full">
      <Section
        borderRadius="1rem 1rem 0 0"
        title="Core Values"
        headerComponents={
          values.length < 5 && userContext.role === "Company Admin"
            ? [
                <Button
                  key={1}
                  leftIcon={<TbFilePlus style={{ color: "#24a2f0" }} />}
                  onClick={() => {
                    setIsModalOpen(true);
                    setMode("add");
                  }}
                  variant="section-secondary"
                >
                  Add
                </Button>,
              ]
            : [<></>]
        }
      >
        <Flex flexDirection="column" gap={4}>
          {values.map((value) => (
            <Button
              backgroundColor={
                selectedValue.ValueId === value.ValueId ? "#24a2f0" : "#cccccc"
              }
              key={value.ValueId}
              onClick={() => {
                if (selectedValue.ValueId === value.ValueId) {
                  setValueData(VALUE_DATA);
                  setSelectedValue(VALUE_DATA);
                } else {
                  setValueData(value);
                  setSelectedValue(value);
                }
              }}
              variant="list"
            >
              {value.Title}
            </Button>
          ))}
        </Flex>
      </Section>
      <Section
        borderRadius="1rem 0 0 0"
        title={selectedValue.Title || "⠀"}
        headerComponents={
          selectedValue !== VALUE_DATA && userContext.role === "Company Admin"
            ? [
                <Button
                  key={1}
                  leftIcon={<BsPencilSquare style={{ color: "#24a2f0 " }} />}
                  onClick={() => {
                    setIsModalOpen(true);
                    setMode("edit");
                  }}
                  variant="section-secondary"
                >
                  Edit
                </Button>,
                <Button
                  key={2}
                  leftIcon={<TbTrash style={{ color: "#d95555" }} />}
                  onClick={() => {
                    setIsModalOpen(true);
                    setMode("delete");
                  }}
                  variant="section-secondary"
                >
                  Delete
                </Button>,
              ]
            : [<></>]
        }
      >
        {selectedValue.Description}
      </Section>
      <AddValue
        isOpen={isModalOpen && mode === "add"}
        onClose={handleClose}
        updateFields={updateValueFields}
        valueData={valueData}
      />
      <EditValue
        isOpen={isModalOpen && mode === "edit"}
        onClose={handleClose}
        updateFields={updateValueFields}
        valueData={valueData}
      />
      <DeleteValue
        isOpen={isModalOpen && mode === "delete"}
        onClose={handleClose}
        valueData={valueData}
      />
    </Grid>
  );
};
