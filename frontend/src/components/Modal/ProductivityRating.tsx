import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

type ProductivityRatingProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ProductivityRating = ({
  isOpen,
  onClose,
}: ProductivityRatingProps) => {
  const [productivity, setProductivity] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const userContext = useContext(UserContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogout();
  };

  // NOTE: add the api calls for adding productivity to db here.
  const handleLogout = () => {
    const dailyCheckInId = localStorage.getItem("dailyCheckInId");
    const updateProductivityUrl = "https://localhost:44373/api/UpdateProductivity";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const productivityUpdate = {
      "DailyCheckInId": dailyCheckInId,
      "Productivity": productivity,
      "Completion": "Completed"
    }

    axios.patch(updateProductivityUrl, productivityUpdate, config)
      .then((response)=> {
        console.log(response)
      }).catch((error)=> {console.log(error)});


    const trybool = true;
    

    if (trybool) {
      toast({
        title: "SUCCESS",
        description: "Submitted productivity rating.",
        status: "success",
        position: "top",
        isClosable: true,
        duration: 5000,
      });
      userContext.setCompanyId("");
      localStorage.clear();
      navigate("/");
    } else {
      toast({
        title: "ERROR",
        description: "Productivity rating not submitted, try again.",
        status: "error",
        position: "top",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent backgroundColor="#ffffff" minWidth="35%">
        <ModalHeader color="#000000" fontSize="1.25rem">
          Productivity
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody display="flex" flexDirection="column" gap={8}>
            <Flex justifyContent="center">
              <Heading color="#000000" fontSize="1rem">
                How much of your work did you finish today?
              </Heading>
            </Flex>
            <Slider
              defaultValue={0}
              max={100}
              min={0}
              step={1}
              onChange={(e) => setProductivity(e)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                backgroundColor="#24a2f0"
                color="#ffffff"
                hasArrow
                placement="top"
                isOpen={showTooltip}
                label={`${productivity}%`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </ModalBody>
          <ModalFooter>
            <Flex flex={1} justifyContent="space-between">
              <Button backgroundColor="#bcbcbc" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Flex>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};
