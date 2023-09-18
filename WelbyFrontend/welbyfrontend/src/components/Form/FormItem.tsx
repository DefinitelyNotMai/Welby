import { FormControl, FormLabel } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormItemProps = {
    children: ReactNode;
    color?: string;
    label?: string;
    isRequired?: boolean;
    w?: string;
};

const FormItem = ({ children, color = '#ffffff', label, isRequired, w }: FormItemProps) => {
    return (
        <FormControl isRequired={isRequired}>
            {label && (
                <FormLabel color={color} fontFamily="Montserrat" fontWeight="500">
                    {label}
                </FormLabel>
            )}
            {children}
        </FormControl>
    );
};

export default FormItem;
