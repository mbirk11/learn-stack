import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../defaultModal";
import StepOne from "../../forms/signup/stepOne";
import StepTwo from "../../forms/signup/stepTwo";
import StepThree from "../../forms/signup/stepTree";
import { registerUser } from "../../../../api/auth";
import { useAuth } from "../../../../context/AuthContext";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToLogin?: () => void;
}

export interface SignupFormData {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  avatar: File | null;
}

export default function SignupModal({
  isOpen,
  onClose,
  onGoToLogin,
}: SignupModalProps) {
  const { login } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
    avatar: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({
        email: "",
        password: "",
        password_confirmation: "",
        username: "",
        avatar: null,
      });
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleAvatarChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    setError("");
  };

  const handleStepOneNext = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleStepTwoNext = () => {
    if (!formData.password || !formData.password_confirmation) {
      setError("Both password fields are required");
      return;
    }

    if (formData.password.length < 3) {
      setError("Password must contain at least 3 characters");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    if (formData.username.trim().length < 3) {
      setError("Username must contain at least 3 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await registerUser(formData);
      const token = response.data?.token;

      if (!token) {
        throw new Error("Token not found");
      }

      await login(token);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Registration failed");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Account"
      subtitle="Join and start learning today"
      showBackButton={step > 1}
      onBack={handleBack}
    >
      {step === 1 && (
        <StepOne
          data={formData}
          onChange={handleChange}
          onNext={handleStepOneNext}
          onGoToLogin={onGoToLogin}
          error={error}
        />
      )}

      {step === 2 && (
        <StepTwo
          data={formData}
          onChange={handleChange}
          onNext={handleStepTwoNext}
          onGoToLogin={onGoToLogin}
          error={error}
        />
      )}

      {step === 3 && (
        <StepThree
          data={formData}
          onChange={handleChange}
          onAvatarChange={handleAvatarChange}
          onSubmit={handleSubmit}
          onGoToLogin={onGoToLogin}
          error={error}
          loading={loading}
        />
      )}
    </Modal>
  );
}
