import { Flex, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// icons
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { CiDumbbell } from 'react-icons/ci';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { GiHummingbird, GiMeshNetwork } from 'react-icons/gi';
import { TbTargetArrow } from 'react-icons/tb';

// components
import CustomButton from '../../../components/Button';
import ChartDoughnut from '../../../components/Dashboard/ChartDoughnut';
import Card from '../../../components/Dashboard/Card';
import Section from '../../../components/Dashboard/Section';

type Wellbeing = {
    Autonomy: number;
};

const Overview = () => {
    document.title = 'Overview | Welby';

    const [autonomyData, setAutonomyData] = useState(0);
    const [focusAtWorkData, setFocusAtWorkData] = useState(0);
    const [positiveEmotionData, setPositiveEmotionData] = useState(0);
    const [negativeEmotionData, setNegativeEmotionData] = useState(0);
    const [autonomyPillarData, setAutonomyPillarData] = useState(0);
    const [competencePillarData, setCompetencePillarData] = useState(0);
    const [connectionPillarData, setConnectionPillarData] = useState(0);

    useEffect(() => {
        // Fetch data from the database and store the values in variables.

        //const autonomyValue = data.autonomy;
        //const focusAtWorkValue = data.focusAtWork;
        //const positiveEmotionValue = data.positiveEmotion;
        //const negativeEmotionValue = data.negativeEmotion;
        //const autonomyPillarValue = data.autonomyPillar;
        //const competencePillarValue = data.competencePillar;
        //const connectionPillarValue = data.connectionPillar;

        //setAutonomyData(autonomyValue);
        //setFocusAtWorkData(focusAtWorkValue);
        //setPositiveEmotionData(positiveEmotionValue);
        //setNegativeEmotionData(negativeEmotionValue);
        //setAutonomyPillarData(autonomyPilalrValue);
        //setCompetencePillarData(competencePillarValue);
        //setConnectionPillarData(connectionPillarValue);
    }, []);

    return (
        <>
            <Section
                mb="4"
                title="How is your well-being at work?"
                headerComponents={[<CustomButton color="#ffffff">Do Daily Check-in</CustomButton>, <Icon as={AiOutlineQuestionCircle} boxSize="8" color="#24a2f0" mr="32" />]}
            >
                <Flex flexDirection="row" justifyContent="space-between">
                    {/*<Card icon={BsPerson} dataValue={80} title="Autonomy" />*/}
                    {/*<Card icon={TbTargetArrow} dataValue={70} title="Focus At Work" />*/}
                    {/*<Card icon={FaRegThumbsUp} dataValue={55} title="Positive Emotion" />*/}
                    {/*<Card icon={FaRegThumbsDown} dataValue={25} title="Negative Emotion" />*/}
                    <Card icon={BsPerson} dataValue={autonomyData} title="Autonomy" />
                    <Card icon={TbTargetArrow} dataValue={focusAtWorkData} title="Focus At Work" />
                    <Card icon={FaRegThumbsUp} dataValue={positiveEmotionData} title="Positive Emotion" />
                    <Card icon={FaRegThumbsDown} dataValue={negativeEmotionData} title="Negative Emotion" />
                </Flex>
            </Section>
            <Section
                mb="4"
                title="How are the pillars of your ability to thrive at this work?"
                headerComponents={[<CustomButton color="#ffffff">Take Quarterly Assessment</CustomButton>, <Icon as={AiOutlineQuestionCircle} boxSize="8" color="#24a2f0" mr="32" />]}
            >
                <Flex flexDirection="row" justifyContent="space-between">
                    {/*<ChartDoughnut dataValue={75} icon={GiHummingbird} title="Autonomy" />*/}
                    {/*<ChartDoughnut dataValue={45} icon={CiDumbbell} title="Competence" />*/}
                    {/*<ChartDoughnut dataValue={50} icon={GiMeshNetwork} title="Connection" />*/}
                    <ChartDoughnut dataValue={autonomyPillarData} icon={GiHummingbird} title="Autonomy" />
                    <ChartDoughnut dataValue={competencePillarData} icon={CiDumbbell} title="Competence" />
                    <ChartDoughnut dataValue={connectionPillarData} icon={GiMeshNetwork} title="Connection" />
                </Flex>
            </Section>
        </>
    );
};

export default Overview;
