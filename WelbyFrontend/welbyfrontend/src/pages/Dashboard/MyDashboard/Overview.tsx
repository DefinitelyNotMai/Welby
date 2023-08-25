import { Flex } from "@chakra-ui/react";
import Card from "../../../components/Dashboard/Card";

const Overview = () => {
    return (
        <>
            <Card mb="4" title="How is your well-being at work?">
                <Flex flexDirection="row" justifyContent="space-between">
                    <Card>Autonomy</Card>
                    <Card>Focus At Work</Card>
                    <Card>Positive Emotion</Card>
                    <Card>Negative Emotion</Card>
                </Flex>
            </Card>
            <Card mb="4" title="How are the pillars of your ability to thrive at this work?">
                <Flex flexDirection="row" justifyContent="space-between">
                    <Card>High</Card>
                    <Card>Low</Card>
                    <Card>Avg</Card>
                </Flex>
            </Card>
            <Card mb="4" title="How are you progressing with your goals?">Placeholder Text</Card>
            <Card mb="4" title="Recent Feedbacks and Feedforwards you received">Placeholder Text</Card>
        </>
    );
};

export default Overview;