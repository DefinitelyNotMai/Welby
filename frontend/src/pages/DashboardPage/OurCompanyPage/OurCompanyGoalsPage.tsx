// lib
import { Button, Flex, Grid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

// local
import { Section } from "../../../components/DataDisplay/Section";
import { UserContext } from "../../../context/UserContext";
import { fetchData } from "../../../api/fetchData";
import { GOAL_DATA, Goal } from "../../../data/goal";
import { BsPencilSquare } from "react-icons/bs";
import { TbFilePlus, TbTrash } from "react-icons/tb";
import {
  AddGoal,
  DeleteGoal,
  EditGoal,
} from "../../../components/Modal/Dashboard/DashboardGoalModal";

export const OurCompanyGoalsPage = () => {
  document.title = "Company Goals | Welby";

  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal>(GOAL_DATA);
  const [goalData, setGoalData] = useState<Goal>(GOAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(true);

  const userContext = useContext(UserContext);

  const updateGoalFields = (fields: Partial<Goal>) => {
    setGoalData((prev) => {
      return { ...prev, ...fields };
    });
  };

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

    if (fetched) {
      setFetched(false);
      fetchGoals();
    }
  }, [fetched, userContext.companyId]);

  const handleClose = () => {
    setFetched(true);
    setGoalData(GOAL_DATA);
    setSelectedGoal(GOAL_DATA);
    setIsModalOpen(false);
    setMode("");
  };

  return (
    <Grid gap={4} templateColumns="1.25fr 2fr" width="full">
      <Section
        borderRadius="1rem 1rem 0 0"
        title="Company Goals"
        headerComponents={
          goals.length < 5 && userContext.role === "Company Admin"
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
          {goals.map((goal) => (
            <Button
              backgroundColor={
                selectedGoal.GoalId === goal.GoalId ? "#24a2f0" : "#cccccc"
              }
              key={goal.GoalId}
              onClick={() => {
                if (selectedGoal.GoalId === goal.GoalId) {
                  setGoalData(GOAL_DATA);
                  setSelectedGoal(GOAL_DATA);
                } else {
                  setGoalData(goal);
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
        title={selectedGoal.Title || "⠀"}
        headerComponents={
          selectedGoal !== GOAL_DATA && userContext.role === "Company Admin"
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
        {selectedGoal.Description}
      </Section>
      <AddGoal
        isOpen={isModalOpen && mode === "add"}
        onClose={handleClose}
        updateFields={updateGoalFields}
        goalData={goalData}
      />
      <EditGoal
        isOpen={isModalOpen && mode === "edit"}
        onClose={handleClose}
        updateFields={updateGoalFields}
        goalData={goalData}
      />
      <DeleteGoal
        isOpen={isModalOpen && mode === "delete"}
        onClose={handleClose}
        goalData={goalData}
      />
    </Grid>
  );
};
