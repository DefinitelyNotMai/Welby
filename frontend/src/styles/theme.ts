// lib
import { extendTheme } from "@chakra-ui/react";

// local
import { buttonStyle as Button } from "./component/form/buttonStyle";
import { cardStyle as Card } from "./component/data-display/cardStyle";
import { headingStyle as Heading } from "./component/typography/headingStyle";
import { inputStyle as Input } from "./component/form/inputStyle";
import { linkStyle as Link } from "./component/typography/linkStyle";
import { modalStyle as Modal } from "./component/overlay/modalStyle";
import { selectStyle as Select } from "./component/form/selectStyle";
import { sliderStyle as Slider } from "./component/form/sliderStyle";
import { tabStyle as Tab } from "./component/disclosure/tabStyle";
import { textStyle as Text } from "./component/typography/textStyle";
import { textareaStyle as Textarea } from "./component/form/textareaStyle";

export const overrides = extendTheme({
  fonts: {
    body: "Montserrat",
    heading: "Montserrat",
  },
  components: {
    Button,
    Card,
    Heading,
    Input,
    Link,
    Modal,
    Select,
    Slider,
    Tab,
    Text,
    Textarea,
  },
});
