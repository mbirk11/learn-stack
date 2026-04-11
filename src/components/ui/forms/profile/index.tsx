import { useEffect, useState } from "react";
import axios from "axios";
import {
  IoCheckmark,
  IoChevronDownOutline,
  IoPencilOutline,
} from "react-icons/io5";
import FormInput from "../../formInputs/FormInput";
import FormSelect from "../../formInputs/FormSelect";
import UploadBox from "../../formInputs/UploadBox";
import Button from "../../button";
import { updateProfile } from "../../../../api/profile";
import { useAuth } from "../../../../context/AuthContext";
import "./index.css";
import DefaultProfile from "../../../../assets/icons/defaulte_profile.svg";

export default function UserProfile() {
  const { user, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    age: 29,
    avatar: null as File | null,
  });

  const [filePreview, setFilePreview] = useState<{
    name: string;
    size: number;
    preview?: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    setFormData({
      full_name: user.fullName || user.username || "",
      email: user.email || "",
      mobile_number: user.mobileNumber || "",
      age: user.age || 29,
      avatar: null,
    });

    setFilePreview(
      user.avatar
        ? {
            name: "current-avatar",
            size: 0,
            preview: user.avatar,
          }
        : null,
    );
  }, [user]);

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

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        avatar: null,
      }));

      setFilePreview(
        user?.avatar
          ? {
              name: "current-avatar",
              size: 0,
              preview: user.avatar,
            }
          : null,
      );
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Avatar must be jpg, png or webp.");
      return;
    }

    if (file.size > maxSize) {
      setError("Avatar must be smaller than 2MB.");
      return;
    }

    setError("");

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    const preview = URL.createObjectURL(file);

    setFilePreview({
      name: file.name,
      size: file.size,
      preview,
    });
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

  return (
    <div className="profile-form flex flex-col gap-6">
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          <img
            src={filePreview?.preview || DefaultProfile}
            alt="Profile"
            className="profile-avatar"
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

      <UploadBox
        label="Upload Avatar"
        file={filePreview}
        onChange={handleFileChange}
      />

      {error ? <p className="text-red-500 text-sm">{error}</p> : null}

      <Button width="360px" height="47px" onClick={handleSubmit}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
}
