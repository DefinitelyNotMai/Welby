import {
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";

type Interests = {
  InterestId: number;
  Name: string;
};

type InterestCheckboxProps = {
  value: number[];
  onChange?: (event: number[]) => void;
};

export const InterestCheckbox = ({
  value,
  onChange,
}: InterestCheckboxProps) => {
  const [interests, setInterests] = useState<Interests[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const interestsUrl = "https://localhost:44373/api/GetInterests";
        const data = await fetchData(interestsUrl, {
          InterestId: 0,
          Name: "",
          Active: true,
        });
        setInterests(data);
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };
    fetchInterests();
  }, []);

  return (
    <CheckboxGroup
      colorScheme="blue"
      value={value}
      onChange={(values) => onChange?.(values.map(Number))}
    >
      <Grid
        backgroundColor="white"
        borderRadius="xl"
        gap={[2, 4]}
        marginX={[0, 32]}
        padding={[4, 8]}
        textAlign="left"
        templateColumns={["1fr 1fr"]}
      >
        {interests.map((interest) => (
          <GridItem key={interest.InterestId}>
            <Checkbox size="lg" value={interest.InterestId}>
              <Text color="#000000" fontWeight="normal">
                {interest.Name}
              </Text>
            </Checkbox>
          </GridItem>
        ))}
      </Grid>
    </CheckboxGroup>
  );
};
