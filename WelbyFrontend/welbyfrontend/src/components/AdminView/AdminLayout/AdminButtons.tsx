import * as chakra from '@chakra-ui/react';
import { TbFilePlus, TbFilePencil, TbTrash } from 'react-icons/tb';

type NewButtonProp = {
    children: string;
    iconComponent: React.ElementType;
    iconColor: string;
}

export function NewButton({  children, iconComponent, iconColor }: NewButtonProp) {
    return (
        <chakra.Flex flexDirection="row" alignItems="center" border='1px solid #EBEBEB'>
            <chakra.Icon as={iconComponent} mx="3" color={iconColor } />
            <chakra.Text color="black" >{children}</chakra.Text>
        </chakra.Flex>
    
    );
}

export function AddButton() {
    return (
        //<chakra.Stack direction='row' spacing={4}> for both add and update button

        //</chakra.Stack>
        <>
            <NewButton
                iconComponent={TbFilePlus}
                iconColor={"#44A348"}
            > Add
            </NewButton>

        </>
    );
}

export function UpdateButton() {
    return (
        <>
            <NewButton
                iconComponent={TbFilePencil}
                iconColor={"#24A2F0"}
            > Update
            </NewButton>

        </>
    );
}

export function DeleteButton() {
    return (
        <>
            <NewButton
                iconComponent={TbTrash}
                iconColor={"#D95555"}
            > Update
            </NewButton>

        </>
    );
}