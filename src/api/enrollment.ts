import client from "./client";

export type Enrollment = {
  id: number;
  progress: number;

  course: {
    id: number;
    title: string;
    image: string;
    avgRating: number;
    instructor: {
      name: string;
    };
  };

  schedule: {
    weeklySchedule: { label: string };
    timeSlot: { label: string };
    sessionType: { name: string };
    location: string;
  };
};

export async function getEnrollments(): Promise<Enrollment[]> {
  const response = await client.get("/enrollments");
  return response.data.data;
}
