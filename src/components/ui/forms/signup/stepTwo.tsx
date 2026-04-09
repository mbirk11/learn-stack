import { IoEyeOutline } from "react-icons/io5";
import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormPasswordInput from "../../formInputs/Formpassword";
import StepProgress from "../../formInputs/StepProgress";
import "../../formInputs/index.css";
import { LuEyeClosed } from "react-icons/lu";

interface StepTwoProps {
  onNext: () => void;
  onGoToLogin?: () => void;
}

export default function StepTwo({ onNext, onGoToLogin }: StepTwoProps) {
  return (
    <div className="flex flex-col gap-6">
      <StepProgress currentStep={2} />

      <FormPasswordInput
        label="Password*"
        placeholder="Password"
        showIcon={<IoEyeOutline className="form-input-icon" />}
      />

      <FormPasswordInput
        label="Confirm Password*"
        placeholder="Confirm Password"
        showIcon={<LuEyeClosed className="form-input-icon" />}
      />

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
