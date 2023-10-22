import { Box, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import CustomText from "../CustomText";

type DashboardSectionProps = {
  borderRadius?: string;
  children: ReactNode;
  headerComponents?: ReactNode[];
  marginBottom?: number;
  minHeight?: string;
  title: string;
};

const DashboardSection = ({
  borderRadius = "1rem 0 0 1rem",
  children,
  headerComponents,
  marginBottom,
  minHeight,
  title,
}: DashboardSectionProps) => {
  return (
    <Card
      boxShadow="md"
      backgroundColor="#ffffff"
      borderRadius={borderRadius}
      marginBottom={marginBottom}
      minHeight={minHeight}
    >
      <CardHeader
        alignItems="center"
        borderBottom="2px solid #ebebeb"
        display="flex"
        fontSize="2xl"
        justifyContent="space-between"
      >
        <CustomText color="#2e2e2e" fontWeight="bold">
          {title}
        </CustomText>
        <Flex alignItems="center">
          {headerComponents &&
            headerComponents.map((component, index) => (
              <Box key={index} marginLeft={index !== 0 ? 2 : 0}>
                {component}
              </Box>
            ))}
        </Flex>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default DashboardSection;
