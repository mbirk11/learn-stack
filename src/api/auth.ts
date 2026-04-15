import client from "./client";

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string;
  mobileNumber: string;
  age: number;
  profileComplete: boolean;
}

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

export interface AuthResponse {
  data: {
    user: User;
    token: string;
  };
}

export interface CurrentUserResponse {
  data: User;
}

// LOGIN
export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await client.post<AuthResponse>("/login", data);
  return response.data;
};

// REGISTER
export const registerUser = async (
  data: RegisterPayload,
): Promise<AuthResponse> => {
  const formData = new FormData();

  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const response = await client.post<AuthResponse>("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// CURRENT USER
export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const response = await client.get<CurrentUserResponse>("/me");
  return response.data;
};

// LOGOUT
export const logoutUser = async (): Promise<void> => {
  await client.post("/logout");
};
