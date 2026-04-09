import {
  IoCheckmark,
  IoChevronDownOutline,
  IoPencilOutline,
} from "react-icons/io5";
import FormInput from "../../formInputs/FormInput";
import FormSelect from "../../formInputs/FormSelect";
import UploadBox from "../../formInputs/UploadBox";
import Button from "../../button";
import "./index.css";

export default function UserProfile() {
  return (
    <div className="profile-form">
      <div className="profile-header">
        <div className="profile-avatar-wrapper">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
            alt="Profile"
            className="profile-avatar"
          />
          <span className="profile-status-dot" />
        </div>

        <div className="profile-user-info">
          <h3 className="profile-username">Username</h3>
          <p className="profile-status-text">Profile is Complete</p>
        </div>
      </div>

      <FormInput
        label="Full Name"
        placeholder="Username"
        variant="filled"
        rightIcon={<IoPencilOutline className="form-input-icon" />}
      />

      <FormInput
        label="Email"
        placeholder="Email@gmail.com"
        variant="filled"
        rightIcon={<IoCheckmark className="form-input-icon" />}
      />

      <div className="profile-row">
        <div className="profile-row-main">
          <FormInput
            label="Mobile Number"
            placeholder="+995 599209820"
            variant="filled"
            rightIcon={<IoCheckmark className="form-input-icon" />}
          />
        </div>

        <div className="profile-row-side">
          <FormSelect
            label="Age"
            variant="filled"
            rightIcon={<IoChevronDownOutline className="form-input-icon" />}
            options={[
              { label: "29", value: 29 },
              { label: "30", value: 30 },
              { label: "31", value: 31 },
            ]}
            defaultValue={29}
          />
        </div>
      </div>

      <UploadBox label="Upload Avatar" />

      <Button width="360px" height="47px">
        Update Profile
      </Button>
    </div>
  );
}
