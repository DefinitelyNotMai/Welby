import { Checkbox, CheckboxGroup, Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Text from "../Typography/Text";

interface Interests {
  InterestId: number;
  Name: string;
}

type InterestCheckboxProps = {
  value: string[];
  onChange?: (event: string[]) => void;
};

const InterestCheckbox = ({ value, onChange }: InterestCheckboxProps) => {
  const [interests, setInterests] = useState<Interests[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const interestsUrl = "https://localhost:44373/api/GetAllInterest";

        axios
          .get(interestsUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            params: { Active: 1 },
          })
          .then((response) => {
            const interest = response.data;
            setInterests(interest);
          });
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, []);

  return (
    <CheckboxGroup colorScheme="blue" value={value} onChange={onChange}>
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
            <Checkbox size="lg" value={String(interest.InterestId)}>
              <Text fontWeight="normal" variant="black">
                {interest.Name}
              </Text>
            </Checkbox>
          </GridItem>
        ))}
      </Grid>
    </CheckboxGroup>
  );
};

export default InterestCheckbox;
