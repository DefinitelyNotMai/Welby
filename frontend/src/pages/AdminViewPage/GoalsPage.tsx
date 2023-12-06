// lib
import {
  Button,
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

// local
import Pagination from "../../components/Disclosure/Pagination";
import { GOAL_DATA, Goal } from "../../data/goal";
import { GoalDelete } from "../../components/Modal/AdminView/GoalModal";

export const GoalsPage = () => {
  document.title = "Goals | Welby";

  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalData, setGoalData] = useState<Goal>(GOAL_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 10;
  const toast = useToast();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const goalUrl = "https://localhost:44373/api/GetGoals";
    const fetchAndSetGoals = async () => {
      try {
        const goal = await axios.get(goalUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          params: {
            GoalId: 0,
            CompanyId: 0,
            Title: "",
            Description: "",
            Active: false,
          },
        });

        // Custom sorting function based on LastChanged_Date and original order
        const sortedGoals = goal.data.sort((a, b) => {
          const dateComparison =
            new Date(b.LastChanged_Date) - new Date(a.LastChanged_Date);
          return dateComparison !== 0
            ? dateComparison
            : goals.indexOf(a) - goals.indexOf(b);
        });

        const goals = sortedGoals.map((c: Goal) => {
          return {
            ...c,
          };
        });

        setGoals(goals);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAndSetGoals();
  }, [goalData]);

  const updateGoalFields = (fields: Partial<Goal>) => {
    setGoalData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // pagination start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startNumber = startIndex + 1;
  const displayedGoals = goals.slice(startIndex, endIndex);
  const totalPages = Math.ceil(goals.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleRowClick = (goal: Goal) => {
    if (currentMode) {
      setGoalData(goal);
      console.log(goal);
      setIsFormOpen(true);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setCurrentMode("");
  };

  const handleDeleteGoal = () => {
    const goal = {
      GoalId: goalData.GoalId,
      Encoded_By: 24287,
    };

    const deleteGoalUrl = "https://localhost:44373/api/RemoveGoal";

    axios
      .patch(deleteGoalUrl, goal, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "SUCCESS",
          description: `Goal with GoalId: ${goalData.GoalId} has been deleted.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setGoalData(GOAL_DATA);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateGoal = () => {
    const goal = {
      GoalId: goalData.GoalId,
      CompanyId: goalData.CompanyId,
      Title: goalData.Title,
      Description: goalData.Description,
      DurationTo: goalData.DurationTo,
      Active: true,
      Encoded_By: 24287,
    };

    const updateGoalUrl = "https://localhost:44373/api/UpdateGoal";

    axios
      .patch(updateGoalUrl, goal, config)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Goal updated.",
          description: `Goal with GoalId: ${goalData.GoalId} has been updated.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFormOpen(false);
        setCurrentMode("");
        setGoalData(GOAL_DATA);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex flexDirection="column" marginLeft={4} marginTop={4}>
      <Flex flexDirection="row" gap={4} marginBottom={4} marginRight={4}>
        <Button
          borderColor={currentMode === "Add" ? "#44a348" : "#ebebeb"}
          variant="masterCrud"
          onClick={() => {
            if (currentMode === "Add") {
              setCurrentMode("");
            } else {
              setCurrentMode("Add");
              setIsFormOpen(true);
            }
          }}
          width="15%"
        >
          Add
        </Button>
        <Button
          borderColor={currentMode === "Update" ? "#24a2f0" : "#ebebeb"}
          variant="masterCrud"
          onClick={() => {
            if (currentMode === "Update") {
              setCurrentMode("");
            } else {
              setCurrentMode("Update");
            }
          }}
          width="15%"
        >
          Update
        </Button>
        <Spacer />
        <Button
          borderColor={currentMode === "Delete" ? "#d95555" : "#ebebeb"}
          variant="masterCrud"
          onClick={() => {
            if (currentMode === "Delete") {
              setCurrentMode("");
            } else {
              setCurrentMode("Delete");
            }
          }}
          width="15%"
        >
          Delete
        </Button>
      </Flex>

      <TableContainer
        backgroundColor="#ffffff"
        borderColor={
          currentMode === "Add"
            ? "#44a348"
            : currentMode === "Update"
              ? "#24a2f0"
              : currentMode === "Delete"
                ? "#d95555"
                : "#ebebeb"
        }
        borderRadius="1rem 0 0 1rem"
        borderWidth="2px"
      >
        <Table>
          <Thead>
            <Tr borderBottom="1px solid #ebebeb">
              <Th>No.</Th>
              <Th>Active</Th>
              <Th>Goal Id</Th>
              <Th>Company Id</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Duration From</Th>
              <Th>Duration To</Th>
              <Th>Last Changed</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedGoals.map((goal, index) => (
              <Tr
                key={index}
                borderBottom="1px solid #ebebeb"
                onClick={() => handleRowClick(goal)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">{goal.Active === false ? "0" : "1"}</Td>
                <Td whiteSpace="normal">{goal.GoalId}</Td>
                <Td whiteSpace="normal">{goal.CompanyId}</Td>
                <Td whiteSpace="normal">{goal.Title}</Td>
                <Td whiteSpace="normal">{goal.Description}</Td>
                <Td whiteSpace="normal">{goal.DurationFrom}</Td>
                <Td whiteSpace="normal">{goal.DurationTo}</Td>
                <Td whiteSpace="normal">{goal.LastChanged_Date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="center" marginTop={4} marginX={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </Flex>

      {isFormOpen && (
        <>
          {currentMode === "Add" && (
            <GoalAdd
              handleCancel={handleClose}
              handleAddUpdate={handleDeleteGoal}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateGoalFields}
              {...goalData}
            />
          )}
          {currentMode === "Update" && (
            <GoalUpdate
              handleCancel={handleClose}
              handleAddUpdate={handleUpdateGoal}
              isOpen={isFormOpen}
              onClose={handleClose}
              updateFields={updateGoalFields}
              {...goalData}
            />
          )}
          {currentMode === "Delete" && (
            <GoalDelete
              handleCancel={handleClose}
              handleDelete={handleDeleteGoal}
              isOpen={isFormOpen}
              onClose={handleClose}
              {...goalData}
            />
          )}
        </>
      )}
    </Flex>
  );
};
