import { Flex } from "@chakra-ui/react";
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
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { fetchData } from "../../api/fetchData";
import { getDateDaysAgo, getDateToday } from "../../api/getDates";

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

type EmployeeData = {
  EAW: number[];
  FAW: number[];
  PE: number[];
  NE: number[];
};

export const ChartBar = () => {
  const userContext = useContext(UserContext);
  const [empDataset, setEmpDataset] = useState<EmployeeData>({
    EAW: [],
    FAW: [],
    PE: [],
    NE: [],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        align: "start" as const,
        position: "right" as const,
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

  useEffect(() => {
    const getEmployeeDailyCheckin = async () => {
      const getDailyCheckinUrl =
        "https://localhost:44373/api/GetAllDailyCheckIn";
      try {
        const getEmployeeDailyCheckins = await fetchData(getDailyCheckinUrl, {
          EmployeeId: localStorage.getItem("userId") || 0,
          CompanyId: userContext.companyId,
          DateTo: getDateToday(),
          DateFrom: getDateDaysAgo(9),
          Active: true,
        });
        if (getEmployeeDailyCheckins) {
          const newEmpDataset: EmployeeData = {
            EAW: [],
            FAW: [],
            PE: [],
            NE: [],
          };

          for (let i = 0; i < getEmployeeDailyCheckins.length; i++) {
            newEmpDataset.EAW.push(
              getEmployeeDailyCheckins[i].EnergyAtWork_int,
            );
            newEmpDataset.FAW.push(getEmployeeDailyCheckins[i].FocusAtWork_int);
            newEmpDataset.PE.push(
              getEmployeeDailyCheckins[i].PositiveEmotions_int,
            );
            newEmpDataset.NE.push(
              getEmployeeDailyCheckins[i].NegativeEmotions_int,
            );
          }
          console.log(newEmpDataset);
          setEmpDataset(newEmpDataset);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getEmployeeDailyCheckin();
  }, [userContext.companyId]);

  const data = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),

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

  return (
    <Flex flexDirection="row" flex={1} padding={8}>
      <Line options={options} data={data} />
    </Flex>
  );
};
