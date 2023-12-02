import { Box, Flex } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useContext, useEffect } from "react";
import { getDateDaysAgo, getDateToday } from "../../api/getDates";
import { DailyCheckIn } from "../../data/dailyCheckIn";
import { fetchData } from "../../api/fetchData";
import { UserContext } from "../../context/UserContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

const generateRandomNumbers = (count: number) => {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      align: "start",
      position: "right",
      labels: {
        usePointStyle: true, // Use point style (square) for legend items
        fillStyle: "Color",
        pointStyle: "rectRounded",
        font: {
          family: "Montserrat",
          size: 14,
          weight: "500",
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: false,
      ticks: {
        min: 1,
        max: 30,
        stepSize: 1,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        min: 1,
        max: 5,
        stepSize: 1,
      },
    },
  },
};

type EmployeeData = {
  EAW: number[],
  FAW: number[],
  PE: number[],
  NE: number[]
}

const labels = Array.from({ length: 10 }, (_, i) => i + 1);
var empDataset: EmployeeData = {EAW: [], FAW: [], PE: [], NE:[]} //I know this wont work but eh

const data = {
  labels: labels,

  datasets: [
    {
      label: "Energy At Work",
      data: empDataset.EAW,
      backgroundColor: "rgba(36, 162, 240, 0.5)",
      borderColor: "#24a2f0",
      fill: true,
      pointRadius: 5,
      tension: 0.2,
    },
    {
      label: "Focus at Work",
      data: empDataset.FAW,
      backgroundColor: "#f0d124",
      borderColor: "#f0d124",
      pointRadius: 5,
      tension: 0.2,
    },
    {
      label: "Positive Emotions",
      data: empDataset.PE,
      backgroundColor: "#78e1e8",
      borderColor: "#78e1e8",
      pointRadius: 5,
      tension: 0.2,
    },
    {
      label: "Negative Emotions",
      data: empDataset.NE,
      backgroundColor: "#34313a",
      borderColor: "#34313a",
      pointRadius: 5,
      tension: 0.2,
    },
  ],
};

export const ChartBar = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    const getEmployeeDailyCheckin = async () => {
      const getDailyCheckinUrl =
        "https://localhost:44373/api/GetAllDailyCheckIn";
      try {
        const getEmployeeDailyCheckins = await fetchData(
          getDailyCheckinUrl,
          {
            EmployeeId: localStorage.getItem("userId"), //from array
            CompanyId: userContext.companyId,
            DateTo: getDateToday(),
            DateFrom: getDateDaysAgo(9),
            Active: true,
          },);
          if (getEmployeeDailyCheckins) {
            for(let i = 0; i < getEmployeeDailyCheckins.length; i++) {
              empDataset.EAW.push(getEmployeeDailyCheckins[i].EnergyAtWork_int)
              empDataset.FAW.push(getEmployeeDailyCheckins[i].FocusAtWork_int)
              empDataset.PE.push(getEmployeeDailyCheckins[i].PositiveEmotions_int)
              empDataset.NE.push(getEmployeeDailyCheckins[i].NegativeEmotions_int)
            }
            console.log(empDataset)
          }

      } catch (err) {
        console.log(err);
      }
    };
    getEmployeeDailyCheckin();
  }, [userContext.companyId]);


  return (
    <Flex flexDirection="row" flex={1} padding={8}>
      <Line options={options} data={data} />
    </Flex>
  );
};
