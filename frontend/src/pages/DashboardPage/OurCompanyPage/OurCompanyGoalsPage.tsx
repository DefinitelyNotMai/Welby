// lib
import { Button, Flex, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { Section } from "../../../components/DataDisplay/Section";
import { UserContext } from "../../../context/UserContext";
import { fetchData } from "../../../api/fetchData";
import { GOAL_DATA, Goal } from "../../../data/goal";

export const OurCompanyGoalsPage = () => {
  document.title = "Company Goals | Welby";

  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal>(GOAL_DATA);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsUrl = "https://localhost:44373/api/GetGoals";

        const data = await fetchData(goalsUrl, {
          GoalId: 0,
          CompanyId: userContext.companyId,
          Title: "",
          Description: "",
          Active: true,
        });
        setGoals(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchGoals();
  }, [userContext.companyId]);

  return (
    <Grid gap={4} templateColumns="1.25fr 2fr" width="full">
      <Section borderRadius="1rem 1rem 0 0" title="Company Goals">
        <Flex flexDirection="column" gap={4}>
          {goals.map((goal) => (
            <Button
              backgroundColor={
                selectedGoal.GoalId === goal.GoalId ? "#24a2f0" : "#cccccc"
              }
              key={goal.GoalId}
              onClick={() => {
                if (selectedGoal.GoalId === goal.GoalId) {
                  setSelectedGoal(GOAL_DATA);
                } else {
                  setSelectedGoal(goal);
                }
              }}
              variant="list"
            >
              {goal.Title}
            </Button>
          ))}
        </Flex>
      </Section>
      <Section
        borderRadius="1rem 0 0 0"
        title={selectedGoal.Title || "Goal Title"}
      >
        {selectedGoal.Description}
      </Section>
    </Grid>
  );
};
