import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormInput from "../../formInputs/FormInput";
import StepProgress from "../../formInputs/StepProgress";
import "../../formInputs/index.css";

interface StepOneProps {
  onNext: () => void;
  onGoToLogin?: () => void;
}

export default function StepOne({ onNext, onGoToLogin }: StepOneProps) {
  return (
    <div className="flex flex-col gap-6 ">
      <StepProgress currentStep={1} />

      <FormInput label="Email*" placeholder="you@example.com" />

      <Button width="360px" height="47px" onClick={onNext}>
        Next
      </Button>

      <FormDivider text="or" />

      <p className="auth-switch-text">
        Already have an account?
        <button
          type="button"
          className="auth-switch-button"
          onClick={onGoToLogin}
        >
          Log In
        </button>
      </p>
    </div>
  );
}
