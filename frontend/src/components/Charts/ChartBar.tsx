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
      position: "bottom" as const,
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

const labels = Array.from({ length: 30 }, (_, i) => i + 1);

const data = {
  labels: labels,

  datasets: [
    {
      label: "Energy At Work",
      data: generateRandomNumbers(30),
      backgroundColor: "rgba(36, 162, 240, 0.5)",
      borderColor: "#24a2f0",
      fill: true,
      pointRadius: 5,
      tension: 0.2,
    },
    {
      label: "Focus at Work",
      data: generateRandomNumbers(30),
      backgroundColor: "#f0d124",
      borderColor: "#f0d124",
      pointRadius: 5,
      tension: 0.2,
    },
    {
      label: "Positive Emotions",
      data: generateRandomNumbers(30),
      backgroundColor: "#78e1e8",
      borderColor: "#78e1e8",
      pointRadius: 5,
      tension: 0.2,
    },
    {
      label: "Negative Emotions",
      data: generateRandomNumbers(30),
      backgroundColor: "#34313a",
      borderColor: "#34313a",
      pointRadius: 5,
      tension: 0.2,
    },
  ],
};

export const ChartBar = () => {
  return (
    <Flex flexDirection="row" flex={1} padding={8}>
      <Line options={options} data={data} />
    </Flex>
  );
};
