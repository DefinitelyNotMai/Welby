import { Card, CardBody, CardHeader, Stack, StackDivider } from "@chakra-ui/react";
import { ReactNode } from 'react';

type ProfileCardProps = {
    children: ReactNode;
};

const ProfileCard = ({ children }: ProfileCardProps) => {
    return (
        <Card
            boxShadow="lg"
            bg="#ffffff"
            borderColor="#ebebeb"
            borderWidth="1px"
            borderRadius="lg"
            my="5rem"
            mx="30rem"
        >
            { children }
        </Card>
    );
};

export default ProfileCard;