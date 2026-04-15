import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
  FiMonitor,
  FiClock,
} from "react-icons/fi";
import { type Enrollment, type SessionType } from "../../api/enrollment";
import Button from "../../components/ui/button";
import RatingStars from "../../components/ui/ratingStars";
import SelectableCard from "../../components/ui/selectableCard";
import "./index.css";
import WarningCard from "../../components/ui/warningCard";
import {
  capitalize,
  getSessionTypeIcon,
  getTimeSlotIcon,
  getTimeSlotSubtitle,
  getTimeSlotTitle,
  normalizeWeeklyScheduleLabel,
} from "../../utils/courseFormatters";

type CourseDetailsSidebarProps = {
  enrollment: Enrollment | null;
  weeklySchedules: Array<{ id: number; label: string }>;
  timeSlots: Array<{
    id: number;
    label: string;
    startTime?: string;
    endTime?: string;
  }>;
  sessionTypes: SessionType[];
  selectedWeeklyScheduleId: number | null;
  selectedTimeSlotId: number | null;
  selectedSessionTypeId: number | null;
  selectedSessionType: SessionType | null;
  totalPrice: number;
  basePrice: number;
  rating: number;
  onSelectWeeklySchedule: (id: number) => void;
  onSelectTimeSlot: (id: number) => void;
  onSelectSessionType: (id: number | null) => void;
  onEnroll: () => void;
  onComplete: () => void;
  onRetake: () => void;
  isEnrolling: boolean;
  isCompleting: boolean;
  isRetaking: boolean;
  hasUserRated: boolean;
  isAuthenticated: boolean;
  onGoToLogin: () => void;
  isProfileComplete: boolean;
  onCompleteProfile: () => void;
  onSubmitRating: (value: number) => void;
};

type StepKey = 1 | 2 | 3;

export default function CourseDetailsSidebar({
  enrollment,
  weeklySchedules,
  timeSlots,
  sessionTypes,
  selectedWeeklyScheduleId,
  selectedTimeSlotId,
  selectedSessionTypeId,
  selectedSessionType,
  totalPrice,
  basePrice,
  rating,
  onSelectWeeklySchedule,
  onSelectTimeSlot,
  onSelectSessionType,
  onSubmitRating,
  onEnroll,
  onComplete,
  onRetake,
  isEnrolling,
  isCompleting,
  isRetaking,
  hasUserRated,
  isAuthenticated,
  onGoToLogin,
  isProfileComplete,
  onCompleteProfile,
}: CourseDetailsSidebarProps) {
  const [openStep, setOpenStep] = useState<StepKey>(1);
  const [showRating, setShowRating] = useState(true);

  useEffect(() => {
    if (selectedWeeklyScheduleId) {
      setOpenStep(2);
    }
  }, [selectedWeeklyScheduleId]);

  useEffect(() => {
    if (selectedTimeSlotId) {
      setOpenStep(3);
    }
  }, [selectedTimeSlotId]);

  const handleToggleStep = (step: StepKey, disabled?: boolean) => {
    if (disabled) return;
    setOpenStep(step);
  };

  if (enrollment) {
    const isCompleted = enrollment.progress === 100;
    const sessionTypeName = capitalize(enrollment.schedule.sessionType.name);

    return (
      <div className="sidebar-card sidebar-card--enrolled">
        <div
          className={`status-badge ${isCompleted ? "completed" : "enrolled"}`}
        >
          {isCompleted ? "Completed" : "Enrolled"}
        </div>

        <div className="enrollment-info-list">
          <SidebarInfoItem
            icon={<FiCalendar />}
            text={normalizeWeeklyScheduleLabel(
              enrollment.schedule.weeklySchedule.label,
            )}
          />
          <SidebarInfoItem
            icon={<FiClock />}
            text={enrollment.schedule.timeSlot.label}
          />
          <SidebarInfoItem icon={<FiMonitor />} text={sessionTypeName} />
          {enrollment.schedule.location ? (
            <SidebarInfoItem
              icon={<FiMapPin />}
              text={enrollment.schedule.location}
            />
          ) : null}
        </div>

        <div className="progress-label">{enrollment.progress}% Complete</div>

        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${enrollment.progress}%` }}
          />
        </div>

        {isCompleted ? (
          <div className="rating-box">
            <div className="sidebar-action">
              <Button
                onClick={onRetake}
                btnType="primary"
                width="100%"
                height="50px"
                disabled={isRetaking}
              >
                {isRetaking ? "Retaking..." : "Retake Course"}
              </Button>
            </div>

            {showRating && (
              <div className="rating-card">
                <button
                  type="button"
                  className="rating-card__close"
                  onClick={() => setShowRating(false)}
                  aria-label="Close rating card"
                >
                  ×
                </button>

                {hasUserRated ? (
                  <>
                    <p className="rating-card__title">Your rating</p>

                    <RatingStars
                      value={rating}
                      isRated={hasUserRated}
                      onChange={onSubmitRating}
                    />

                    <p className="rating-card__already">
                      You've already rated this course
                    </p>
                  </>
                ) : (
                  <>
                    <p className="rating-card__title">Rate your experience</p>

                    <RatingStars
                      value={rating}
                      onChange={onSubmitRating}
                      isRated={hasUserRated}
                    />

                    <p className="rating-card__hint">
                      Select a star rating and submit your review
                    </p>

                    <Button
                      onClick={() => {
                        onSubmitRating;
                      }}
                      btnType="primary"
                      width="100%"
                      height="44px"
                      disabled={!hasUserRated}
                    >
                      Submit Rating
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={onComplete}
            btnType="primary"
            width="100%"
            height="50px"
            disabled={isCompleting}
          >
            {isCompleting ? "Completing..." : "Complete Course"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="sidebar-card">
      <SidebarStep
        step={1}
        title="Weekly Schedule"
        isOpen={openStep === 1}
        onToggle={() => handleToggleStep(1)}
      >
        <div className="selection-grid selection-grid--weeks">
          {weeklySchedules.map((item) => (
            <SelectableCard
              key={item.id}
              title={normalizeWeeklyScheduleLabel(item.label)}
              selected={selectedWeeklyScheduleId === item.id}
              onClick={() => onSelectWeeklySchedule(item.id)}
              width="23%"
              height="91px"
            />
          ))}
        </div>
      </SidebarStep>

      <SidebarStep
        step={2}
        title="Time Slot"
        isOpen={openStep === 2}
        disabled={!selectedWeeklyScheduleId}
        onToggle={() => handleToggleStep(2, !selectedWeeklyScheduleId)}
      >
        {!selectedWeeklyScheduleId ? (
          <p className="helper-text">Choose a weekly schedule first.</p>
        ) : timeSlots.length === 0 ? (
          <p className="helper-text">No time slots available.</p>
        ) : (
          <div className="selection-grid selection-grid--times">
            {timeSlots.map((item) => (
              <SelectableCard
                key={item.id}
                title={getTimeSlotTitle(item.label)}
                subtitle={getTimeSlotSubtitle(item)}
                icon={getTimeSlotIcon(item.label)}
                selected={selectedTimeSlotId === item.id}
                onClick={() => onSelectTimeSlot(item.id)}
                width="32%"
                height="61px"
              />
            ))}
          </div>
        )}
      </SidebarStep>

      <SidebarStep
        step={3}
        title="Session Type"
        isOpen={openStep === 3}
        disabled={!selectedTimeSlotId}
        onToggle={() => handleToggleStep(3, !selectedTimeSlotId)}
      >
        {!selectedTimeSlotId ? (
          <p className="helper-text">Choose a time slot first.</p>
        ) : sessionTypes.length === 0 ? (
          <p className="helper-text">No session types available.</p>
        ) : (
          <div className="selection-grid selection-grid--sessions">
            {sessionTypes.map((item) => {
              const availableSeats = Number(item.availableSeats);
              const isDisabled = availableSeats === 0;
              const isLowSeats = availableSeats > 0 && availableSeats < 5;

              return (
                <div key={item.id} className="session-wrapper">
                  <SelectableCard
                    title={capitalize(item.name)}
                    subtitle={item.location || "Location not specified"}
                    icon={getSessionTypeIcon(item.name)}
                    selected={selectedSessionTypeId === item.id}
                    disabled={isDisabled}
                    onClick={() => onSelectSessionType(item.id)}
                    width="171px"
                    height="131px"
                    extra={
                      <div className="session-card-extra">
                        <span className="session-card-price">
                          {Number(item.priceModifier) === 0
                            ? "Included"
                            : `+$${Number(item.priceModifier).toFixed(2)}`}
                        </span>
                      </div>
                    }
                  />

                  <span
                    className={`session-card-seats outside ${
                      isDisabled ? "danger" : isLowSeats ? "warning" : "success"
                    }`}
                  >
                    {isDisabled
                      ? "No Seats Available"
                      : isLowSeats
                        ? `Only ${availableSeats} Seats Remaining`
                        : `${availableSeats} Seats Available`}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </SidebarStep>

      <div className="price-summary">
        <div className="price-summary__total">
          <span>Total Price</span>
          <strong>${totalPrice.toFixed(2)}</strong>
        </div>

        <div className="price-row">
          <span>Base Price</span>
          <span>${basePrice.toFixed(2)}</span>
        </div>

        <div className="price-row">
          <span>Session Type</span>
          <span>
            {selectedSessionType
              ? Number(selectedSessionType.priceModifier) === 0
                ? "Included"
                : `+$${Number(selectedSessionType.priceModifier).toFixed(2)}`
              : "-"}
          </span>
        </div>

        <div className="sidebar-action">
          <Button
            onClick={onEnroll}
            btnType={
              isAuthenticated && isProfileComplete ? "primary" : "desabled"
            }
            width="100%"
            height="50px"
            disabled={
              !isAuthenticated ||
              isEnrolling ||
              !selectedWeeklyScheduleId ||
              !selectedTimeSlotId ||
              !selectedSessionType ||
              Number(selectedSessionType.availableSeats) === 0
            }
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </Button>
        </div>
      </div>
      {!isAuthenticated ? (
        <WarningCard
          title="Log in to continue"
          description="You need to sign in before enrolling in this course."
          btnText={`Sign In ->`}
          onClick={onGoToLogin}
        />
      ) : !isProfileComplete ? (
        <WarningCard
          title="Complete Your Profile"
          description="You need to fill in your profile details before enrolling in this course."
          btnText={`Complete ->`}
          onClick={onCompleteProfile}
        />
      ) : null}
    </div>
  );
}

function SidebarStep({
  step,
  title,
  isOpen,
  disabled = false,
  onToggle,
  children,
}: {
  step: number;
  title: string;
  isOpen: boolean;
  disabled?: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`sidebar-step ${disabled ? "disabled" : ""}`}>
      <button
        type="button"
        className={`sidebar-step__header ${isOpen ? "open" : ""}`}
        onClick={onToggle}
        disabled={disabled}
      >
        <span className="sidebar-step__title">
          <span className="sidebar-step__number">{step}</span>
          <span>{title}</span>
        </span>

        <span className="sidebar-step__arrow">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </button>

      {isOpen ? <div className="sidebar-step__content">{children}</div> : null}
    </div>
  );
}

function SidebarInfoItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="sidebar-info-item">
      <span className="sidebar-info-icon">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
