import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormInput from "../../formInputs/FormInput";
import StepProgress from "../../formInputs/StepProgress";
import "../../formInputs/index.css";
import type { SignupFormData } from "../../modal/signupModal";
import "../index.css";

interface StepOneProps {
  data: SignupFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onGoToLogin?: () => void;
  error?: string;
}

export default function StepOne({
  data,
  onChange,
  onNext,
  onGoToLogin,
  error,
}: StepOneProps) {
  return (
    <div className="default-form">
      <StepProgress currentStep={1} />

      <FormInput
        label="Email*"
        name="email"
        type="email"
        value={data.email}
        onChange={onChange}
        placeholder="you@example.com"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

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
