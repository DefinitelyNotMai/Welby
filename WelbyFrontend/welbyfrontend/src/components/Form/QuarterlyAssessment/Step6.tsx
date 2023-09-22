import AnswerSelect from './AnswerSelect';
import QuestionItem from './QuestionItem';

type Step6Data = {
    OrganizationalCommitment: number[];
};

type Step6Props = Step6Data & {
    updateFields: (fields: Partial<Step6Data>) => void;
};

const Step6 = ({ OrganizationalCommitment, updateFields }: Step6Props) => {
    const questions = [
        '1.	I am willing to go beyond what is expected of me to contribute to the success of this organization.',
        '2.	I genuinely care about the future of this organization.',
        '3.	I put effort into doing my work so that I can leave a legacy in my organization.',
        '4.	I put effort into doing my work to show my care and loyalty for this organization.',
    ];

    const handleQuestionItemClick = (index: number, value: number) => {
        const updatedOrganizationalCommitment = [...OrganizationalCommitment];
        updatedOrganizationalCommitment[index] = value;
        updateFields({ OrganizationalCommitment: updatedOrganizationalCommitment });
    };

    return (
        <>
            {OrganizationalCommitment.map((value, index) => (
                <QuestionItem key={index} question={questions[index]} mb="4">
                    <AnswerSelect
                        value={value}
                        onClick={(newValue) => handleQuestionItemClick(index, newValue)}
                    />
                </QuestionItem>
            ))}
        </>
    );
};

export default Step6;
