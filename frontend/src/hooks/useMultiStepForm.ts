// lib
import { ReactElement, useState } from "react";

export const useMultiStepForm = (steps: ReactElement[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const nextStep = () => {
    setCurrentStepIndex((i: number) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const prevStep = () => {
    setCurrentStepIndex((i: number) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (i: number) => {
    setCurrentStepIndex(i);
  };

  return {
    currentStepIndex,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    nextStep,
    prevStep,
    setCurrentStepIndex,
    step: steps[currentStepIndex],
    steps,
  };
};
