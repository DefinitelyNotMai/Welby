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
import { useEffect } from "react";


import { getDateToday, getDateDaysAgo } from "../../api/getDates";
import { fetchData } from "../../api/fetchData";
import { DailyCheckIn } from "../../data/dailyCheckIn";

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


export const ChartPreview = ({ ...companyData }) => {
  useEffect(() => {
    // NOTE: add fetch calls here
    // if you need values from the selected company, use companyData
    // (ex.: companyData.CompanyId)
    const getCompanyDailyCheckin = async () => {
      const employeesDailyCheckin: EmployeeDailyCheckin[] = [];
      const employeesId: number[] = [];
      const getEmployeesUrl = "https://localhost:44373/api/GetEmployees";
      const getDailyCheckinUrl =
        "https://localhost:44373/api/GetAllDailyCheckIn";

      try {
        const getEmployeesWithDailyCheckin = await fetchData(getEmployeesUrl, {
          CompanyId: companyData.companyId,
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

        if (employeesId.length != 0) {
          for (let i = 0; i < employeesId.length; i++) {
            try {
              const getEmployeeDailyCheckins = await fetchData(
                getDailyCheckinUrl,
                {
                  EmployeeId: employeesId[i],
                  CompanyId: companyData.companyId,
                  DateTo: getDateToday(),
                  DateFrom: getDateDaysAgo(29),
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
        }

      } catch (e) {
        console.log(e)
      }

    }


  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        align: "center" as const,
        position: "top" as const,
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

  const data = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),

    datasets: [
      {
        label: "Energy At Work",
        // NOTE: put here the array of values (average of Energy at Work) in each day
        // data: <arrayName>
        data: [0, 0, 0, 0],
        backgroundColor: "rgba(36, 162, 240, 0.5)",
        borderColor: "#24a2f0",
        fill: true,
        pointRadius: 5,
        tension: 0.2,
      },
      {
        label: "Focus at Work",
        data: [0, 0, 0, 0],
        backgroundColor: "#f0d124",
        borderColor: "#f0d124",
        pointRadius: 5,
        tension: 0.2,
      },
      {
        label: "Positive Emotions",
        data: [0, 0, 0, 0],
        backgroundColor: "#78e1e8",
        borderColor: "#78e1e8",
        pointRadius: 5,
        tension: 0.2,
      },
      {
        label: "Negative Emotions",
        data: [0, 0, 0, 0],
        backgroundColor: "#34313a",
        borderColor: "#34313a",
        pointRadius: 5,
        tension: 0.2,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
