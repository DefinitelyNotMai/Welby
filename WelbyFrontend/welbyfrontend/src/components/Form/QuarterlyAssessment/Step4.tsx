import AnswerSelect from './AnswerSelect';
import QuestionItem from './QuestionItem';

type Step4Data = {
    PositiveWorkRelationships: number[];
};

type Step4Props = Step4Data & {
    updateFields: (fields: Partial<Step4Data>) => void;
};

const Step4 = ({ PositiveWorkRelationships, updateFields }: Step4Props) => {
    const questions = [
        '1.	I really like the people I work with.',
        '2.	I get along with people at work.',
        '3.	I consider the people I work with to be my friends.',
        '4.	People at work care about me.',
        '5.	People at work are pretty friendly towards me.',
    ];

    const handleQuestionItemClick = (index: number, value: number) => {
        const updatedPositiveWorkRelationships = [...PositiveWorkRelationships];
        updatedPositiveWorkRelationships[index] = value;
        updateFields({
            PositiveWorkRelationships: updatedPositiveWorkRelationships,
        });
    };

    return (
        <>
            {PositiveWorkRelationships.map((value, index) => (
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

export default Step4;
