import { CardHeader } from '@chakra-ui/react';

type ProfileCardHeaderProps = {
    children: string;
};

const ProfileCardHeader = ({ children }: ProfileCardHeaderProps) => {
    return (
        <CardHeader fontFamily="Montserrat" fontWeight="600" fontSize="2xl">
            {children}
        </CardHeader>
    );
};

export default ProfileCardHeader;
