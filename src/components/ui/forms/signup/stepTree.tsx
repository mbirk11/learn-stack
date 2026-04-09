import { useState } from "react";
import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormInput from "../../formInputs/FormInput";
import StepProgress from "../../formInputs/StepProgress";
import UploadBox from "../../formInputs/UploadBox";
import "../../formInputs/index.css";

interface StepThreeProps {
  onSubmit?: () => void;
  onGoToLogin?: () => void;
}

export default function StepThree({ onSubmit, onGoToLogin }: StepThreeProps) {
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
    preview?: string;
  } | null>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setUploadedFile(null);
      return;
    }

    setUploadedFile({
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <StepProgress currentStep={3} />

      <FormInput label="Username*" placeholder="Username" />

      <UploadBox
        label="Upload Avatar"
        file={uploadedFile}
        onChange={handleFileChange}
      />

      <Button width="360px" height="47px" onClick={onSubmit}>
        Sign Up
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
