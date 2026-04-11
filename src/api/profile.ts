import client from "./client";

export interface UpdateProfilePayload {
  full_name: string;
  mobile_number: string;
  age: number;
  avatar: File | null;
}
export const updateProfile = async (data: UpdateProfilePayload) => {
  const cleanMobile = data.mobile_number.replace(/\s/g, "").replace("+995", "");

  const formData = new FormData();
  formData.append("full_name", data.full_name);
  formData.append("mobile_number", cleanMobile);
  formData.append("age", String(data.age));

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  const response = await client.put("/profile", formData);
  return response.data;
};
