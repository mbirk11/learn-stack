import "./index.css";

interface StepProgressProps {
  totalSteps?: number;
  currentStep: number;
}

export default function StepProgress({
  totalSteps = 3,
  currentStep,
}: StepProgressProps) {
  return (
    <div className="step-progress">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;

        return (
          <span
            key={stepNumber}
            className={`step-progress-item ${
              stepNumber <= currentStep ? "active" : ""
            }`}
          />
        );
      })}
    </div>
  );
}
