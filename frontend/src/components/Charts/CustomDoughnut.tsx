import { Box, Card, Center, Flex, Icon } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CustomText from "../CustomText";

ChartJS.register(ArcElement);

type CustomDoughnutProps = {
  icon?: React.ElementType;
  title: string;
  dataValue: number;
};

const CustomDoughnut = ({
  icon: IconComponent,
  title,
  dataValue,
}: CustomDoughnutProps) => {
  const percentage = (dataValue / 100) * 100;

  const getBackgroundColor = (value: number) => {
    if (value >= 70) {
      return "#24a2f0";
    } else if (value >= 50 && value < 70) {
      return "#f0d124";
    } else {
      return "#eb2a2a";
    }
  };

  const getTextValue = (value: number) => {
    if (value >= 70) {
      return "High";
    } else if (value >= 50 && value < 70) {
      return "Avg.";
    } else {
      return "Low";
    }
  };

  const data = {
    labels: [],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [getBackgroundColor(dataValue), "#bcbcbc"],
        borderWidth: 0,
        rotation: 180,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const textValue = getTextValue(dataValue);

  return (
    <Flex alignItems="center">
      <Card
        borderRadius="50%"
        boxShadow="lg"
        padding={2}
        position="relative"
        margin={8}
        zIndex={2}
      >
        <Center
          alignItems="center"
          flexDir="column"
          left="50%"
          position="absolute"
          top="50%"
          transform="translate(-50%, -50%)"
        >
          <Icon as={IconComponent} color="#24a2f0" fontSize="sm" boxSize={12} />
          <Box fontSize="sm">
            <CustomText color="#7c7c7c" fontWeight="bold">
              {title}
            </CustomText>
          </Box>
        </Center>
        <Doughnut data={data} options={options} height={180} width={180} />
      </Card>
      <Card
        paddingLeft={16}
        paddingRight={16}
        paddingY={8}
        left="-18%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box fontSize="4xl">
          <CustomText color="#202c56" fontFamily="Roboto" fontWeight="bold">
            {textValue}
          </CustomText>
        </Box>
        <Box fontWeight="medium">
          <CustomText color="#727272">Previous Result</CustomText>
        </Box>
      </Card>
    </Flex>
  );
};

export default CustomDoughnut;
