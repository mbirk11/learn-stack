import { useEffect, useState } from "react";
import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormInput from "../../formInputs/FormInput";
import StepProgress from "../../formInputs/StepProgress";
import UploadBox from "../../formInputs/UploadBox";
import "../../formInputs/index.css";
import type { SignupFormData } from "../../modal/signupModal";
import "../index.css";

interface StepThreeProps {
  data: SignupFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (file: File | null) => void;
  onSubmit?: () => void;
  onGoToLogin?: () => void;
  error?: string;
  loading?: boolean;
}

export default function StepThree({
  data,
  onChange,
  onAvatarChange,
  onSubmit,
  onGoToLogin,
  error,
  loading,
}: StepThreeProps) {
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
    preview?: string;
  } | null>(null);

  useEffect(() => {
    if (!data.avatar) {
      setUploadedFile(null);
      return;
    }

    const preview = URL.createObjectURL(data.avatar);

    setUploadedFile({
      name: data.avatar.name,
      size: data.avatar.size,
      preview,
    });

    return () => URL.revokeObjectURL(preview);
  }, [data.avatar]);

  const handleFileChange = (file: File | null) => {
    onAvatarChange(file);
  };

  return (
    <div className="default-form">
      <StepProgress currentStep={3} />

      <FormInput
        label="Username*"
        name="username"
        value={data.username}
        onChange={onChange}
        placeholder="Username"
      />

      <UploadBox
        label="Upload Avatar"
        file={uploadedFile}
        onChange={handleFileChange}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button width="360px" height="47px" onClick={onSubmit}>
        {loading ? "Signing Up..." : "Sign Up"}
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
