import { Card, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

type ChartDoughnutProps = {
  avg: number;
  dataValue: number;
  icon: React.ElementType;
  min: number;
  max: number;
  onClick: () => void;
  title: string;
};

export const ChartDoughnut = ({
  avg,
  dataValue,
  icon: IconComponent,
  min,
  max,
  onClick,
  title,
}: ChartDoughnutProps) => {
  const determineRange = (value: number) => {
    if (value <= max && value > avg) {
      return { color: "#24a2f0", label: "High" };
    } else if (value <= avg && value > min) {
      return { color: "#f0d124", label: "Avg" };
    } else if (value <= min) {
      return { color: "#eb2a2a", label: "Low" };
    } else {
      return {};
    }
  };

  const { color, label } = determineRange(dataValue);

  const data = {
    labels: [],
    datasets: [
      {
        data: [dataValue, max - dataValue],
        backgroundColor: [color, "#bcbcbc"],
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
          {label}
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
