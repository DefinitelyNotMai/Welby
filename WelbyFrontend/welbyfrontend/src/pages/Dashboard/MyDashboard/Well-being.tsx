import { Flex } from "@chakra-ui/react";
import Card from "../../../components/Dashboard/Card";

const Wellbeing = () => {
    return (
        <>
            <Card mb="4" title="Well-being Journey Details">Progression Chart</Card>
            <Card mb="4" title="The Pillars of Your Ability to Thrive">
                <Flex flexDirection="column">
                    <Flex flexDirection="row" justifyContent="space-between" mb="4">
                        <Card>Autonomy</Card>
                        <Card>Competence</Card>
                        <Card>Relatedness</Card>
                    </Flex>
                    <Flex flexDirection="row" justifyContent="space-between">
                        <Card>Engagement</Card>
                        <Card>Commitment</Card>
                        <Card>Motivation</Card>
                    </Flex>
                </Flex>
            </Card>
        </>
    );
};

export default Wellbeing;
