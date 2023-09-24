import { Flex, Grid } from "@chakra-ui/react";
import Section from "../../../components/Dashboard/Section";
import Card from '../../../components/Dashboard/Card';
import { BsPerson } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import ChartDoughnut from "../../../components/Dashboard/ChartDoughnut";
import { GiHummingbird, GiMeshNetwork } from "react-icons/gi";
import { CiDumbbell } from "react-icons/ci";

const Overview = () => {
    return (
        <Grid templateRows="1fr 1ft" gap="4" my="4">
            <Section title="Overall Well-being at Work">
                {/*<Card icon={BsPerson} dataValue={80} title="Autonomy" />*/}
                {/*<Card icon={TbTargetArrow} dataValue={70} title="Focus At Work" />*/}
                {/*<Card icon={FaRegThumbsUp} dataValue={55} title="Positive Emotion" />*/}
                {/*<Card icon={FaRegThumbsDown} dataValue={25} title="Negative Emotion" />*/}
                <Grid templateColumns="1fr 1fr" gap="4">
                    <Card
                        icon={BsPerson}
                        dataValue={80}
                        title="Autonomy" />
                    <Card
                        icon={TbTargetArrow}
                        dataValue={70}
                        title="Focus At Work"
                    />
                    <Card
                        icon={FaRegThumbsUp}
                        dataValue={55}
                        title="Positive Emotion"
                    />
                    <Card
                        icon={FaRegThumbsDown}
                        dataValue={25}
                        title="Negative Emotion"
                    />
                </Grid>
            </Section>
            <Section title="Overall Pillars to Thrive at Work">
                <Grid templateColumns="1fr 1fr" gap="4">
                    <ChartDoughnut
                        dataValue={75}
                        icon={GiHummingbird}
                        title="Autonomy"
                    />
                    <ChartDoughnut
                        dataValue={45}
                        icon={CiDumbbell}
                        title="Competence"
                    />
                    <ChartDoughnut
                        dataValue={50}
                        icon={GiMeshNetwork}
                        title="Connection"
                    />
                </Grid>
            </Section>
        </Grid>
    );
}

export default Overview;