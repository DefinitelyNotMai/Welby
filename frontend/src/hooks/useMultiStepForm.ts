import { ReactElement, useState } from "react";

const useMultiStepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const prevStep = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (i: number) => {
    setCurrentStepIndex(i);
  };

  return {
    currentStepIndex,
    setCurrentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    nextStep,
    prevStep,
  };
};

export default useMultiStepForm;
