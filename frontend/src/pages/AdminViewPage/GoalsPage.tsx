// lib
import axios from "axios";
import {
  Button,
  Flex,
  Icon,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// local
import Pagination from "../../components/Disclosure/Pagination";
import { GOAL_DATA, Goal } from "../../data/goal";
import {
  GoalAdd,
  GoalDelete,
  GoalUpdate,
} from "../../components/Modal/AdminView/GoalModal";
import { TbFilePencil, TbFilePlus, TbTrash } from "react-icons/tb";

export const GoalsPage = () => {
  document.title = "Goals | Welby";

  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalData, setGoalData] = useState<Goal>(GOAL_DATA);
  const [currentMode, setCurrentMode] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetchData, setFetchData] = useState<boolean>(true);

  const itemsPerPage = 10;

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
        const data = goal.data;
        const goals = data.map((g: Goal) => {
          return g;
        });
        setGoals(goals);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (fetchData) {
      fetchAndSetGoals();
      setFetchData(false);
    }
  }, [fetchData]);

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
    setFetchData(true);
    setIsFormOpen(false);
    setCurrentMode("");
    setGoalData(GOAL_DATA);
  };

  return (
    <Flex flexDirection="column" marginLeft={4} marginTop={4}>
      <Flex flexDirection="row" gap={4} marginBottom={4} marginRight={4}>
        <Button
          borderColor={currentMode === "Add" ? "#44a348" : "#ebebeb"}
          leftIcon={<Icon as={TbFilePlus} boxSize={6} color="#44a348" />}
          onClick={() => {
            if (currentMode === "Add") {
              setCurrentMode("");
            } else {
              setCurrentMode("Add");
              setIsFormOpen(true);
            }
          }}
          variant="masterCrud"
          width="15%"
        >
          Add
        </Button>
        <Button
          borderColor={currentMode === "Update" ? "#24a2f0" : "#ebebeb"}
          leftIcon={<Icon as={TbFilePencil} boxSize={6} color="#24a2f0" />}
          onClick={() => {
            if (currentMode === "Update") {
              setCurrentMode("");
            } else {
              setCurrentMode("Update");
            }
          }}
          variant="masterCrud"
          width="15%"
        >
          Update
        </Button>
        <Spacer />
        <Button
          borderColor={currentMode === "Delete" ? "#d95555" : "#ebebeb"}
          leftIcon={<Icon as={TbTrash} boxSize={6} color="#d95555" />}
          onClick={() => {
            if (currentMode === "Delete") {
              setCurrentMode("");
            } else {
              setCurrentMode("Delete");
            }
          }}
          variant="masterCrud"
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
                _hover={{ backgroundColor: currentMode !== "" && "#ebebeb" }}
                backgroundColor={index % 2 === 0 ? "#f5f5f5" : "#ffffff"}
                borderBottom={index % 2 === 0 ? "#ffffff" : "#f5f5f5"}
                cursor={currentMode !== "" ? "pointer" : "default"}
                onClick={() => handleRowClick(goal)}
              >
                <Td whiteSpace="normal">{startNumber + index}</Td>
                <Td whiteSpace="normal">{goal.Active === false ? "0" : "1"}</Td>
                <Td whiteSpace="normal">{goal.GoalId}</Td>
                <Td whiteSpace="normal">{goal.CompanyId}</Td>
                <Td whiteSpace="normal" minWidth="250px">
                  {goal.Title}
                </Td>
                <Td whiteSpace="normal" minWidth="500px">
                  {goal.Description}
                </Td>
                <Td whiteSpace="normal">{goal.DurationFrom}</Td>
                <Td whiteSpace="normal">{goal.DurationTo}</Td>
                <Td whiteSpace="normal">{goal.LastChanged_Date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="center" margin={4}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </Flex>

      {currentMode === "Add" && (
        <GoalAdd
          onClose={handleClose}
          isOpen={isFormOpen}
          updateFields={updateGoalFields}
          {...goalData}
        />
      )}
      {currentMode === "Update" && (
        <GoalUpdate
          onClose={handleClose}
          isOpen={isFormOpen}
          updateFields={updateGoalFields}
          {...goalData}
        />
      )}
      {currentMode === "Delete" && (
        <GoalDelete
          onClose={handleClose}
          isOpen={isFormOpen}
          updateFields={updateGoalFields}
          {...goalData}
        />
      )}
    </Flex>
  );
};
