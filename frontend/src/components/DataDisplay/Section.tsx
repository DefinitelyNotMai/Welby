import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Flex,
} from "@chakra-ui/react";

type SectionProps = CardProps & {
  children: React.ReactNode;
  headerComponents?: React.ReactNode[];
  title: string;
};

export const Section = ({
  borderRadius = "1rem 0 0 1rem",
  children,
  headerComponents,
  title,
  ...props
}: SectionProps) => {
  return (
    <Card borderRadius={borderRadius} variant="section" {...props}>
      <CardHeader
        display="flex"
        alignItems="center"
        padding={4}
        justifyContent="space-between"
      >
        {title}
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
