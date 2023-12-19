import { Flex, Heading } from "@chakra-ui/react";
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

import { get7DaysAgo, getDateToday } from "../../api/getDates";
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

type EmployeeDailyCheckin = {
  EmployeeId: number;
  EmployeeName: string;
  DailyCheckins: DailyCheckIn[];
};

type ChartData = {
  labels: number[];
  datasets: ChartDataset[];
};

type ChartDataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor?: string;
  pointRadius: number;
  tension: number;
  borderDash?: number[];
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      align: "start" as const,
      position: "right" as const,
      labels: {
        usePointStyle: true, // Use point style (square) for legend items
        color: "#000000",
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
        max: 15,
        stepSize: 1,
      },
      title: {
        color: "#000000",
        display: true,
        padding: 20,
        text: "Day",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        min: 1,
        max: 100,
        stepSize: 5,
      },
      title: {
        color: "#000000",
        display: true,
        padding: 20,
        text: "Scores",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  },
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let background = "#";
  let border = "#";
  for (let i = 0; i < 6; i++) {
    background += letters[Math.floor(Math.random() * 16)];
    border += letters[Math.floor(Math.random() * 16)];
  }
  return { background, border };
};

const labels = Array.from({ length: 15 }, (_, i) => i + 1);
export const PredictionChart = () => {
  const userContext = useContext(UserContext);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const getCompanyDailyCheckin = async () => {
      const employeesDailyCheckin: EmployeeDailyCheckin[] = [];
      const employeesId: number[] = [];
      const getEmployeesUrl = "https://localhost:44373/api/GetEmployees";
      const getDailyCheckinUrl =
        "https://localhost:44373/api/GetAllDailyCheckIn";

      try {
        const getEmployeesWithDailyCheckin = await fetchData(getEmployeesUrl, {
          CompanyId: userContext.companyId,
          Email: "",
          EmployeeId: 0,
          Phone_Number: "",
          CompanyRole: "",
          Active: true,
        });

        if (getEmployeesWithDailyCheckin) {
          getEmployeesWithDailyCheckin.forEach(
            (employee: { EmployeeId: number }) => {
              employeesId.push(employee.EmployeeId);
            },
          );
        }

        if (employeesId.length !== 0) {
          for (let i = 0; i < employeesId.length; i++) {
            try {
              const getEmployeeDailyCheckins = await fetchData(
                getDailyCheckinUrl,
                {
                  EmployeeId: employeesId[i],
                  CompanyId: userContext.companyId,
                  DateTo: getDateToday(),
                  DateFrom: get7DaysAgo(),
                  Active: true,
                },
              );

              if (getEmployeeDailyCheckins) {
                const employee: EmployeeDailyCheckin = {
                  EmployeeId: employeesId[i],
                  EmployeeName: getEmployeeDailyCheckins[0].EmployeeName,
                  DailyCheckins: getEmployeeDailyCheckins,
                };
                employeesDailyCheckin.push(employee);
              }
            } catch (error) {
              console.error("Error fetching data", error);
            }
          }

          const datasets: ChartDataset[] = employeesDailyCheckin.flatMap(
            (employee) => {
              const { background: actualBackground, border: actualBorder } =
                getRandomColor();
              const {
                background: predictedBackground,
                border: predictedBorder,
              } = getRandomColor();

              return [
                {
                  label: `${employee.EmployeeName} - Actual`,
                  data: employee.DailyCheckins.map(
                    (checkin) => checkin.Productivity,
                  ),
                  backgroundColor: actualBackground,
                  borderColor: actualBorder,
                  pointRadius: 5,
                  tension: 0,
                },
                {
                  label: `${employee.EmployeeName} - Predicted`,
                  data: employee.DailyCheckins.map(
                    (checkin) => checkin.Prediction,
                  ),
                  backgroundColor: predictedBackground,
                  borderColor: predictedBorder,
                  pointRadius: 5,
                  tension: 0,
                  borderDash: [5, 5],
                },
              ];
            },
          );

          setChartData({
            labels: labels,
            datasets: datasets,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCompanyDailyCheckin();
  }, [userContext.companyId]);

  return (
    <Flex
      flexDirection="column"
      flex={1}
      gap={4}
      padding={8}
      textAlign="center"
    >
      <Heading color="#000000" fontSize="1.5rem">
        Actual vs Predicted Scores for Employees Over a Month
      </Heading>
      {chartData && <Line options={options} data={chartData} />}
    </Flex>
  );
};
