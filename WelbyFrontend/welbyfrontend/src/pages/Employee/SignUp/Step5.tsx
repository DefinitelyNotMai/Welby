import { Box, Checkbox, Flex, Heading, Text, Textarea } from "@chakra-ui/react";

type Step5Data = {
    Other_Notes: string;
}

type Step5Props = Step5Data & {
    updateFields: (fields: Partial<Step5Data>) => void
}

const Step5 = ({ Other_Notes, updateFields }: Step5Props) => {
        //    <Box color="#ffffff" mb="5" fontFamily="Montserrat">
        //        <Text fontWeight="700" pb="5">Reminders:</Text>
        //        <Text fontWeight="700">Don't forget to join in our other collaboration platforms!</Text>
        //        <Flex flexDirection="column">
        //            <Checkbox value="discord">Discord</Checkbox>
        //            <Checkbox value="asana">Asana</Checkbox>
        //            <Checkbox value="clickup">ClickUp</Checkbox>
        //        </Flex>
        //    </Box>
    return (
        <>
            <Flex
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                color="#ffffff"
                fontFamily="Montserrat"
                mb="10"
            >
                <Heading fontFamily="Montserrat" fontWeight="700" mb="5">Anything else you want your colleagues to take note of?</Heading>
            </Flex>
            <Box mb="5" fontFamily="Montserrat" fontWeight="500">
                <Text color="#ffffff">Other things I want to share for my team to know me more:</Text>
                <Textarea bg="#ffffff" border="none" placeholder="Type here..." h="15vh" value={Other_Notes}
                    onChange={e => updateFields({ Other_Notes: e.target.value })}
                    />
            </Box>
        </>
    );
};

export default Step5;
