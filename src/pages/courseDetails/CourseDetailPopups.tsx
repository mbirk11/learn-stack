import Popup from "../../components/ui/popup";
import RatingStars from "../../components/ui/ratingStars";
import ProfileIncomplate from "../../assets/icons/profile-incomplate.svg?react";
import WarningIcon from "../../assets/icons/warning-icons.svg?react";
import CheckIcon from "../../assets/icons/enrolled.svg?react";
import CelebrationIcon from "../../assets/icons/success-icon.svg?react";

type ConflictingEnrollment = {
  course: {
    title: string;
  };
  schedule: {
    weeklySchedule: {
      label: string;
    };
    timeSlot: {
      label: string;
    };
  };
} | null;

interface CourseDetailPopupsProps {
  courseTitle: string;
  isProfilePopupOpen: boolean;
  isConflictPopupOpen: boolean;
  isEnrollSuccessPopupOpen: boolean;
  isCompletedPopupOpen: boolean;
  conflictingEnrollment: ConflictingEnrollment;

  rating: number;
  setRating: (value: number) => void;

  onCloseProfilePopup: () => void;
  onCompleteProfile: () => void;
  onCloseConflictPopup: () => void;
  onContinueAnyway: () => void;
  onCloseEnrollSuccessPopup: () => void;
  onCloseCompletedPopup: () => void;
  hasUserRated: boolean;
  onSubmitRating: (value: number) => void;
}

export default function CourseDetailPopups({
  courseTitle,
  isProfilePopupOpen,
  isConflictPopupOpen,
  isEnrollSuccessPopupOpen,
  isCompletedPopupOpen,
  conflictingEnrollment,
  rating,
  setRating,
  onSubmitRating,
  onCloseProfilePopup,
  onCompleteProfile,
  onCloseConflictPopup,
  onContinueAnyway,
  onCloseEnrollSuccessPopup,
  onCloseCompletedPopup,
  hasUserRated,
}: CourseDetailPopupsProps) {
  return (
    <>
      <Popup
        isOpen={isProfilePopupOpen}
        onClose={onCloseProfilePopup}
        title="Complete your profile to continue"
        description={
          <>
            You need to complete your <strong>profile</strong> before enrolling
            in this course.
          </>
        }
        icon={
          <div className="popup-icon popup-icon--profile">
            <ProfileIncomplate />
          </div>
        }
        actions={[
          {
            label: "Complete Profile",
            onClick: onCompleteProfile,
            variant: "secondary",
          },
          {
            label: "Cancel",
            onClick: onCloseProfilePopup,
            variant: "primary",
          },
        ]}
      />

      <Popup
        isOpen={isConflictPopupOpen}
        onClose={onCloseConflictPopup}
        title="Enrollment Conflict"
        description={
          conflictingEnrollment ? (
            <>
              You are already enrolled in{" "}
              <strong>“{conflictingEnrollment.course.title}”</strong> with the
              same schedule:
              <br />
              <strong>
                {conflictingEnrollment.schedule.weeklySchedule.label}
              </strong>{" "}
              at{" "}
              <strong>{conflictingEnrollment.schedule.timeSlot.label}</strong>
            </>
          ) : null
        }
        icon={
          <div className="popup-icon popup-icon--warning">
            <WarningIcon />
          </div>
        }
        actions={[
          {
            label: "Continue Anyway",
            onClick: onContinueAnyway,
            variant: "secondary",
          },
          {
            label: "Cancel",
            onClick: onCloseConflictPopup,
            variant: "primary",
          },
        ]}
      />

      <Popup
        isOpen={isEnrollSuccessPopupOpen}
        onClose={onCloseEnrollSuccessPopup}
        title="Enrollment Confirmed!"
        description={
          <>
            You've successfully enrolled to the <strong>“{courseTitle}”</strong>{" "}
            course!
          </>
        }
        icon={
          <div className="popup-icon popup-icon--success">
            <CheckIcon />
          </div>
        }
        actions={[
          {
            label: "Done",
            onClick: onCloseEnrollSuccessPopup,
            variant: "primary",
          },
        ]}
      />

      <Popup
        isOpen={isCompletedPopupOpen}
        onClose={onCloseCompletedPopup}
        title="Congratulations!"
        description={
          <>
            You've completed <strong>“{courseTitle}”</strong> course!
          </>
        }
        icon={
          <div className="popup-icon popup-icon--complete">
            <CelebrationIcon />
          </div>
        }
        actions={[
          {
            label: "Done",
            onClick: onCloseCompletedPopup,
            variant: "primary",
          },
        ]}
      >
        <p className="popup-rating-label">Rate your experience</p>
        <RatingStars value={rating} onChange={onSubmitRating} />
      </Popup>
    </>
  );
}
