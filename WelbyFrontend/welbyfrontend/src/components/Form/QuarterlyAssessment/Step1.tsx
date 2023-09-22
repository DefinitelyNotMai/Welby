import AnswerSelect from './AnswerSelect';
import QuestionItem from './QuestionItem';

type Step1Data = {
    SocialMutualism: number[];
};

type Step1Props = Step1Data & {
    updateFields: (fields: Partial<Step1Data>) => void;
};

const Step1 = ({ SocialMutualism, updateFields }: Step1Props) => {
    const questions = [
        '1. I have been able to learn interesting new skills on my job.',
        '2. Most days I feel a sense of accomplishment from working.',
        '3. I put effort into doing my work because it gives me a sense of accomplishment.',
        '4. I put effort into doing my work for the prospect of growth in my career.',
        '5. I put effort into doing my work because I have fun doing my job.',
        '6. I happily give my best efforts to perform well in my job.',
        '7. I happily give my best efforts to perform well in this organization.',
    ];

    const handleQuestionItemClick = (index: number, value: number) => {
        const updatedSocialMutualism = [...SocialMutualism];
        updatedSocialMutualism[index] = value;
        updateFields({ SocialMutualism: updatedSocialMutualism });
    };

    return (
        <>
            {SocialMutualism.map((value, index) => (
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

export default Step1;
