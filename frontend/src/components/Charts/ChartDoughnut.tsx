import { Card, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

type ChartDoughnutProps = {
  icon?: React.ElementType;
  title: string;
  dataValue: number;
  onClick: () => void;
  min: number;
  avg: number;
  max: number;
};

export const ChartDoughnut = ({
  icon: IconComponent,
  title,
  dataValue,
  onClick,
  min,
  avg,
  max,
}: ChartDoughnutProps) => {
  const adjustValueToRange = (value: number) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  };
  const adjustedDataValue = adjustValueToRange(dataValue);
  const percentage = ((adjustedDataValue - min) / (max - min)) * 100;

  const getBackgroundColor = (value: number) => {
    if (value >= max) {
      return "#24a2f0"; // High
    } else if (value >= avg && value < max) {
      return "#f0d124"; // Average
    } else {
      return "#eb2a2a"; // Low
    }
  };

  const getTextValue = (value: number) => {
    if (value >= max) {
      return "High";
    } else if (value >= avg && value < max) {
      return "Avg";
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
        position="relative"
        borderRadius="50%"
        padding="2"
        boxShadow="lg"
        zIndex="2"
      >
        <Center
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          flexDir="column"
          alignItems="center"
        >
          <Icon
            as={IconComponent}
            _hover={{ transform: "scale(1.1)" }}
            cursor="pointer"
            color="#24a2f0"
            boxSize={12}
            onClick={onClick}
          />
          <Text
            color="#7c7c7c"
            fontFamily="Montserrat"
            fontWeight="700"
            fontSize="md"
            textAlign="center"
          >
            {title}
          </Text>
        </Center>
        <Doughnut data={data} options={options} height={200} width={200} />
      </Card>
      <Card
        pl="16"
        pr="16"
        py="8"
        left="-10%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          color="#202c56"
          fontFamily="Roboto"
          fontWeight="700"
          fontSize="48"
        >
          {textValue}
        </Text>
        <Text
          color="#727272"
          fontFamily="Montserrat"
          fontWeight="600"
          fontSize="sm"
        >
          Previous Result
        </Text>
      </Card>
    </Flex>
  );
};
