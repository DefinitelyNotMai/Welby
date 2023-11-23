// lib
import { Button, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { GOAL_DATA } from "../../../data/initMaster";
import { Goal } from "../../../data/typesMaster";
import { Section } from "../../../components/DataDisplay/Section";
import { UserContext } from "../../../context/UserContext";
import { fetchData } from "../../../api/fetchData";

export const OurCompanyGoalsPage = () => {
  document.title = "Company Goals | Welby";

  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal>(GOAL_DATA);

  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsUrl = "https://localhost:44373/api/GetGoalByCompany";

        const data = await fetchData(goalsUrl, {
          CompanyId: userContext.companyId,
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
      </Section>
      <Section borderRadius="1rem 0 0 0" title="Goal Description">
        {selectedGoal.Description}
      </Section>
    </Grid>
  );
};
