import client from "./client";

export type WeeklySchedule = {
  id: number;
  label: string;
  days: string[];
};

export type TimeSlot = {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
};

export type SessionType = {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: number;
  availableSeats: number;
  location?: string;
};

export type Enrollment = {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt?: string | null;
  course: {
    id: number;
    title: string;
    description?: string;
    image: string;
    basePrice?: number;
    durationWeeks?: number;
    isFeatured?: boolean;
    avgRating: number;
    reviewCount?: number;
    category?: {
      id: number;
      name: string;
      icon?: string;
    };
    topic?: {
      id: number;
      name: string;
      categoryId?: number;
    };
    instructor: {
      id?: number;
      name: string;
      avatar?: string;
    };
  };
  schedule: {
    weeklySchedule: WeeklySchedule;
    timeSlot: TimeSlot;
    sessionType: SessionType;
    location?: string;
  };
};

export async function getEnrollments(): Promise<Enrollment[]> {
  const response = await client.get("/enrollments");
  return response.data.data;
}

export async function enrollCourse(payload: {
  courseId: number;
  courseScheduleId: number;
  force: boolean;
}) {
  const response = await client.post("/enrollments", payload);
  return response.data;
}

export async function completeEnrollment(enrollmentId: number) {
  const response = await client.patch(`/enrollments/${enrollmentId}/complete`);
  return response.data;
}

export async function deleteEnrollment(enrollmentId: number) {
  const response = await client.delete(`/enrollments/${enrollmentId}`);
  return response.data;
}
