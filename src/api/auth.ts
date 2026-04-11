import client from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar: File | null;
}

// LOGIN
export const loginUser = async (data: LoginPayload) => {
  const response = await client.post("/login", data);
  return response.data;
};

// REGISTER
export const registerUser = async (data: RegisterPayload) => {
  const formData = new FormData();

  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const response = await client.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ✅ CURRENT USER
export const getCurrentUser = async () => {
  const response = await client.get("/me");
  return response.data;
};

// ✅ LOGOUT
export const logoutUser = async () => {
  const response = await client.post("/logout");
  return response.data;
};
