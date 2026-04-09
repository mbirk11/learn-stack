import { useEffect, useState } from "react";
import Modal from "../defaultModal";
import StepOne from "../../forms/signup/stepOne";
import StepTwo from "../../forms/signup/stepTwo";
import StepThree from "../../forms/signup/stepTree";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToLogin?: () => void;
}

export default function SignupModal({
  isOpen,
  onClose,
  onGoToLogin,
}: SignupModalProps) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
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
        <StepOne onNext={() => setStep(2)} onGoToLogin={onGoToLogin} />
      )}

      {step === 2 && (
        <StepTwo onNext={() => setStep(3)} onGoToLogin={onGoToLogin} />
      )}

      {step === 3 && <StepThree onSubmit={onClose} onGoToLogin={onGoToLogin} />}
    </Modal>
  );
}
