import { Input } from "@chakra-ui/react";

type DateTimePickerProps = {
    bg?: string;
    border?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
};

const DateTimePicker = ({
    bg = "#ffffff",
    border,
    placeholder,
    onChange,
    value
}: DateTimePickerProps) => {
    return (
        <>
            <Input
                bg={bg}
                border={border}
                placeholder={placeholder}
                onChange={onChange}
                type="date"
                value={value}
            />
        </>
    );
}

export default DateTimePicker;