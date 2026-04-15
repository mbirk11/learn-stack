import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  IoCheckmark,
  IoChevronDownOutline,
  IoCloudUploadOutline,
  IoPencilOutline,
} from "react-icons/io5";
import FormInput from "../../formInputs/FormInput";
import FormSelect from "../../formInputs/FormSelect";
import Button from "../../button";
import { updateProfile } from "../../../../api/profile";
import { useAuth } from "../../../../context/AuthContext";
import "./index.css";
import DefaultProfile from "../../../../assets/icons/defaulte_profile.svg";

interface FilePreview {
  name: string;
  size: number;
  preview?: string;
}

export default function UserProfile() {
  const { user, refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    age: 29,
    avatar: null as File | null,
  });

  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const cleanupPreviewUrl = (preview?: string) => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
  };

  useEffect(() => {
    if (!user) return;

    setFormData({
      full_name: user.fullName || user.username || "",
      email: user.email || "",
      mobile_number: user.mobileNumber || "",
      age: user.age || 29,
      avatar: null,
    });

    setFilePreview((prev) => {
      cleanupPreviewUrl(prev?.preview);

      if (!user.avatar) return null;

      return {
        name: "current-avatar",
        size: 0,
        preview: user.avatar,
      };
    });
  }, [user]);

  useEffect(() => {
    return () => {
      cleanupPreviewUrl(filePreview?.preview);
    };
  }, [filePreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      age: Number(e.target.value),
    }));

    setError("");
  };

  const validateFile = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Avatar must be jpg, png or webp.";
    }

    if (file.size > maxSize) {
      return "Avatar must be smaller than 2MB.";
    }

    return null;
  };

  const applyFile = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        avatar: null,
      }));

      setFilePreview((prev) => {
        cleanupPreviewUrl(prev?.preview);

        if (!user?.avatar) return null;

        return {
          name: "current-avatar",
          size: 0,
          preview: user.avatar,
        };
      });

      setError("");
      return;
    }

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    const preview = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    setFilePreview((prev) => {
      cleanupPreviewUrl(prev?.preview);

      return {
        name: file.name,
        size: file.size,
        preview,
      };
    });

    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    applyFile(file);

    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0] || null;
    applyFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!formData.full_name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!formData.mobile_number.trim()) {
      setError("Mobile number is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await updateProfile({
        full_name: formData.full_name.trim(),
        mobile_number: formData.mobile_number.trim(),
        age: formData.age,
        avatar: formData.avatar,
      });

      await refreshUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Update failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const formattedFileSize = filePreview?.size
    ? `${(filePreview.size / 1024 / 1024).toFixed(2)} MB`
    : "";

  return (
    <div className="profile-form flex flex-col gap-6">
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          <img
            src={filePreview?.preview || DefaultProfile}
            alt="Profile"
            className="profile-avatar clickable"
            onClick={() => {
              if (filePreview?.preview) {
                setIsPreviewOpen(true);
              }
            }}
          />
          <span
            className={`profile-status-dot ${
              user?.profileComplete ? "complete" : "incomplete"
            }`}
          />
        </div>

        <div className="profile-user-info">
          <h3 className="profile-username">
            {formData.full_name || user?.username || "Username"}
          </h3>
          <p
            className={`profile-status-text ${
              user?.profileComplete ? "complete" : "incomplete"
            }`}
          >
            {user?.profileComplete
              ? "Profile is Complete"
              : "Profile is Incomplete"}
          </p>
        </div>
      </div>

      <FormInput
        label="Full Name"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        placeholder="Full name"
        variant="filled"
        rightIcon={<IoPencilOutline className="form-input-icon" />}
      />

      <FormInput
        label="Email"
        name="email"
        value={formData.email}
        readOnly
        variant="filled"
        rightIcon={<IoCheckmark className="form-input-icon" />}
      />

      <div className="profile-row">
        <div className="profile-row-main">
          <FormInput
            label="Mobile Number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            placeholder="+995 599209820"
            variant="filled"
            rightIcon={<IoCheckmark className="form-input-icon" />}
          />
        </div>

        <div className="profile-row-side">
          <FormSelect
            label="Age"
            variant="filled"
            value={formData.age}
            onChange={handleAgeChange}
            rightIcon={<IoChevronDownOutline className="form-input-icon" />}
            options={Array.from({ length: 141 }, (_, i) => {
              const age = i + 10;
              return { label: String(age), value: age };
            })}
          />
        </div>
      </div>

      <div className="profile-upload-section">
        <label className="profile-upload-label">Upload Avatar</label>

        <div
          className={`profile-upload-box ${isDragActive ? "drag-active" : ""}`}
          onClick={openFilePicker}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openFilePicker();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            hidden
          />

          {formData.avatar && filePreview?.preview ? (
            <div className="profile-upload-selected">
              <img
                src={filePreview.preview}
                alt="Avatar preview"
                className="profile-upload-selected-image"
              />
              <p className="profile-upload-selected-text">{filePreview.name}</p>

              <button
                type="button"
                className="profile-upload-selected-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  applyFile(null);
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="profile-upload-icon">
                <IoCloudUploadOutline size={26} />
              </div>

              <div className="profile-upload-texts">
                <p className="profile-upload-title">
                  Drag and drop or <span>Upload file</span>
                </p>
                <p className="profile-upload-subtitle">JPG, PNG or WebP</p>
              </div>
            </>
          )}
        </div>
      </div>
      {isPreviewOpen && (
        <div
          className="avatar-preview-overlay"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="avatar-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="avatar-preview-close"
              onClick={() => setIsPreviewOpen(false)}
            >
              ✕
            </button>

            <img
              src={filePreview?.preview || DefaultProfile}
              alt="Preview"
              className="avatar-preview-image"
            />
          </div>
        </div>
      )}

      {error ? <p className="text-red-500 text-sm">{error}</p> : null}

      <Button width="360px" height="47px" onClick={handleSubmit}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
}
