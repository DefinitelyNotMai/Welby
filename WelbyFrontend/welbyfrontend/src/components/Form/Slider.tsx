import { Box, Slider, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";

type CustomSliderProps = {
    arrowThumb?: boolean;
    defaultValue: number;
    onChange: (value: number) => void;
    max?: number;
};

const CustomSlider = ({ arrowThumb = true, defaultValue, max = 100, onChange }: CustomSliderProps) => {
    return (
        <Slider
            defaultValue={defaultValue}
            max={max}
            step={1}
            onChange={(value) => onChange(value)}
        >
            <SliderTrack bg='#ebebeb'>
                <Box position='relative' right={10} />
            </SliderTrack>
            <Tooltip
                hasArrow
                bg={arrowThumb ? "#24a2f0" : "#ffffff"}
                color={arrowThumb ? "#ffffff" : "#24a2f0" }
                placement='top'
                isOpen={true}
                label={defaultValue}
            >
                <SliderThumb
                    bg={arrowThumb ? "transparent" : "#ffffff"}
                    w="5"
                    borderTop={arrowThumb ? "25px solid #252525" : "none"}
                    borderLeft={arrowThumb ? "15px solid transparent" : "none"}
                    borderRight={arrowThumb ? "15px solid transparent" : "none"}
                    boxShadow="none"
                />
            </Tooltip>
        </Slider>
    );
};

export default CustomSlider;