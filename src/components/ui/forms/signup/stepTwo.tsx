import { IoEyeOutline } from "react-icons/io5";
import { LuEyeClosed } from "react-icons/lu";
import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormPasswordInput from "../../formInputs/Formpassword";
import StepProgress from "../../formInputs/StepProgress";
import "../../formInputs/index.css";
import type { SignupFormData } from "../../modal/signupModal";
import "../index.css";

interface StepTwoProps {
  data: SignupFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onGoToLogin?: () => void;
  error?: string;
}

export default function StepTwo({
  data,
  onChange,
  onNext,
  onGoToLogin,
  error,
}: StepTwoProps) {
  return (
    <div className="default-form">
      <StepProgress currentStep={2} />

      <FormPasswordInput
        label="Password*"
        name="password"
        value={data.password}
        onChange={onChange}
        placeholder="Password"
        showIcon={<IoEyeOutline className="form-input-icon" />}
      />

      <FormPasswordInput
        label="Confirm Password*"
        name="password_confirmation"
        value={data.password_confirmation}
        onChange={onChange}
        placeholder="Confirm Password"
        showIcon={<LuEyeClosed className="form-input-icon" />}
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
