import { Box, Flex, Heading } from "@chakra-ui/react";
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
    const randomNumber = Math.floor(Math.random() * 100) + 1;

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
        max: 7,
        stepSize: 1,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        min: 1,
        max: 100,
        stepSize: 5,
      },
      scaleLabel: {
        display: true,
        labelString: "Day",
        fontColor: "#000000",
      },
    },
  },
};

const labels = Array.from({ length: 7 }, (_, i) => i + 1);

const data = {
  labels: labels,

  datasets: [
    {
      label: "Employee A - Actual",
      data: generateRandomNumbers(7),
      backgroundColor: "rgba(36, 162, 240, 0.5)",
      borderColor: "#1f77b4",
      pointRadius: 5,
      tension: 0,
    },
    {
      label: "Employee A - Predicted",
      data: generateRandomNumbers(7),
      backgroundColor: "#ff7f0e",
      pointRadius: 5,
      tension: 0,
      borderDash: [5, 5],
    },
    {
      label: "Employee B - Actual",
      data: generateRandomNumbers(7),
      backgroundColor: "rgba(36, 162, 240, 0.5)",
      borderColor: "#2ca02c",
      pointRadius: 5,
      tension: 0,
    },
    {
      label: "Employee B - Predicted",
      data: generateRandomNumbers(7),
      backgroundColor: "#d62728",
      pointRadius: 5,
      tension: 0,
      borderDash: [5, 5],
    },
    {
      label: "Employee C - Actual",
      data: generateRandomNumbers(7),
      backgroundColor: "rgba(36, 162, 240, 0.5)",
      borderColor: "#94678d",
      pointRadius: 5,
      tension: 0,
    },
    {
      label: "Employee C - Predicted",
      data: generateRandomNumbers(7),
      backgroundColor: "#8c564b",
      pointRadius: 5,
      tension: 0,
      borderDash: [5, 5],
    },
    {
      label: "Employee D - Actual",
      data: generateRandomNumbers(7),
      backgroundColor: "rgba(36, 162, 240, 0.5)",
      borderColor: "#e377c2",
      pointRadius: 5,
      tension: 0,
    },
    {
      label: "Employee D - Predicted",
      data: generateRandomNumbers(7),
      backgroundColor: "#7f7f7f",
      pointRadius: 5,
      tension: 0,
      borderDash: [5, 5],
    },
    {
      label: "Employee E - Actual",
      data: generateRandomNumbers(7),
      backgroundColor: "rgba(36, 162, 240, 0.5)",
      borderColor: "#bcbc22",
      pointRadius: 5,
      tension: 0,
    },
    {
      label: "Employee E - Predicted",
      data: generateRandomNumbers(7),
      backgroundColor: "#17becf",
      pointRadius: 5,
      tension: 0,
      borderDash: [5, 5],
    },
  ],
};

export const PredictionChart = () => {
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
      <Line options={options} data={data} />
    </Flex>
  );
};
