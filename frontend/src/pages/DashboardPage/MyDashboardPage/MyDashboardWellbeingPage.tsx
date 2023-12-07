import { Button, Flex, Grid } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Section } from "../../../components/DataDisplay/Section";
import { ChartBar } from "../../../components/Charts/ChartBar";
import { PredictionChart } from "../../../components/Charts/PredictionChart";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { getDateDaysAgo, getDateToday } from "../../../api/getDates";

export const MyDashboardWellbeingPage = () => {
  document.title = "Well-Being | Welby";

  const userContext = useContext(UserContext);
  const [modal, setModal] = useState<string>("");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleDownload = () => {
    const excelDownloadUrl = "https://localhost:44373/api/DownloadExcel";
    axios({
      method: "GET",
      url: excelDownloadUrl, // Replace with your API endpoint
      params: {
        EmployeeId: 0,
        CompanyId: userContext.companyId,
        DateTo: getDateToday(),
        DateFrom: getDateDaysAgo(29),
        Active: true,
      },
      responseType: 'blob', // Set the response type to 'blob' to handle binary data (e.g., files)
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Specify the expected file format
      },
    })
      .then(response => {
        // Handle the file response here
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'EmployeesDailyCheckIns.xlsx'); // Set the file name
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        alert("Error downloading file");
        // Handle errors
        console.error('Error downloading file:', error);
      });
    

    
  };

  return (
    <Grid templateRows="1fr 1fr" gap={4} width="full" marginBottom={4}>
      <Section
        title="Well-Being Journey Details"
        headerComponents={[
          <Button
            key={1}
            marginRight={16}
            onClick={() => setModal("daily-checkin")}
          >
            Do Daily Check-In
          </Button>,
        ]}
      >
        <Flex flexDirection="column" gap={8}>
          <ChartBar />
        </Flex>
      </Section>
      {userContext.role === "Company Admin" || userContext.role === "Leader" ? (
        <Section
          title="The Pillars of your Ability to Thrive"
          headerComponents={[
            <Button key={1} marginRight={16} onClick={handleDownload}>
              Download Scores as Excel Spreadsheet
            </Button>,
          ]}
        >
          <PredictionChart />
        </Section>
      ) : (
        <></>
      )}
      {/*modal === "daily-checkin" && (
        <DailyCheckin
          isOpen={modal === "daily-checkin"}
          onClose={() => setModal("")}
        />
      )*/}
    </Grid>
  );
};
