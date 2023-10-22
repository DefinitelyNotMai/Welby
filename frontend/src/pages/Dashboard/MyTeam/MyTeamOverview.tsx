import { Grid } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { CiDumbbell } from "react-icons/ci";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { GiHummingbird, GiMeshNetwork } from "react-icons/gi";
import { LuHeartHandshake } from "react-icons/lu";
import { MdPersonOutline } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import CustomDoughnut from "../../../components/Charts/CustomDoughnut";
import DashboardSection from "../../../components/Dashboard/DashboardSection";
import WellBeingCard from "../../../components/Dashboard/WellBeingCard";

const MyTeamOverview = () => {
  return (
    <Grid templateRows="1fr 1ft" gap={4} width="full">
      <DashboardSection title="Overall Well-being at Work">
        <Grid templateColumns="1fr 1fr" gap={4}>
          <WellBeingCard icon={BsPerson} dataValue={80} title="Autonomy" />
          <WellBeingCard
            icon={TbTargetArrow}
            dataValue={70}
            title="Focus At Work"
          />
          <WellBeingCard
            icon={FaRegThumbsUp}
            dataValue={55}
            title="Positive Emotion"
          />
          <WellBeingCard
            icon={FaRegThumbsDown}
            dataValue={25}
            title="Negative Emotion"
          />
        </Grid>
      </DashboardSection>
      <DashboardSection
        borderRadius="1rem 0 0 0"
        title="Overall Pillars to Thrive at Work"
      >
        <Grid templateColumns="1fr 1fr" gap={4}>
          <CustomDoughnut
            dataValue={27}
            icon={GiHummingbird}
            title="Autonomy"
          />
          <CustomDoughnut dataValue={64} icon={CiDumbbell} title="Competence" />
          <CustomDoughnut
            dataValue={42}
            icon={GiMeshNetwork}
            title="Relatedness"
          />
          <CustomDoughnut
            dataValue={89}
            icon={LuHeartHandshake}
            title="Engagement"
          />
          <CustomDoughnut
            dataValue={18}
            icon={FaRegThumbsUp}
            title="Commitment"
          />
          <CustomDoughnut
            dataValue={76}
            icon={MdPersonOutline}
            title="Motivation"
          />
        </Grid>
      </DashboardSection>
    </Grid>
  );
};

export default MyTeamOverview;
