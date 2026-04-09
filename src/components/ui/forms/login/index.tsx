import FormInput from "../../formInputs/FormInput";
import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormPasswordInput from "../../formInputs/Formpassword";
interface LoginFormProps {
  onGoToSignup?: () => void;
}
function LoginForm({ onGoToSignup }: LoginFormProps) {
  return (
    <div className="flex flex-col gap-6 ">
      <FormInput label="Email*" placeholder="you@example.com" />
      <FormPasswordInput label="Password" />

      <Button width="360px" height="47px">
        Log In
      </Button>

      <FormDivider text="or" />

      <p className="auth-switch-text">
        Don't have an account?
        <button
          type="button"
          className="auth-switch-button"
          onClick={onGoToSignup}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
