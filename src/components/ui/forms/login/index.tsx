import { useState } from "react";
import axios from "axios";
import FormInput from "../../formInputs/FormInput";
import Button from "../../button";
import FormDivider from "../../formInputs/FormDivider";
import FormPasswordInput from "../../formInputs/Formpassword";
import { loginUser } from "../../../../api/auth";
import "../index.css";
import { useAuth } from "../../../../context/AuthContext";

interface LoginFormProps {
  onGoToSignup?: () => void;
  onSuccess?: () => void;
}

function LoginForm({ onGoToSignup, onSuccess }: LoginFormProps) {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData);
      const token = data?.data?.token;

      if (!token) {
        setError("Token not found");
        return;
      }

      await login(token);
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="default-form">
      <FormInput
        label="Email*"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
      />

      <FormPasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter password"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button width="360px" height="47px" type="submit">
        {loading ? "Loading..." : "Log In"}
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
    </form>
  );
}

export default LoginForm;
