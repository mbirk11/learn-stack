import client from "./client";

export interface FeaturedCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  category: {
    id: number;
    name: string;
    icon: string;
  };
  topic: {
    id: number;
    name: string;
    categoryId: number;
  };
  instructor?: {
    id: number;
    name: string;
    avatar: string;
  };
}
type Review = {
  userId: number;
  rating: number;
};
export interface ContinueLearningCourse {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: string | null;

  course: {
    id: number;
    title: string;
    description: string;
    image: string;
    basePrice: number;
    durationWeeks: number;
    isFeatured: boolean;
    avgRating: number;
    reviewCount: number;

    category: {
      id: number;
      name: string;
      icon: string;
    };

    topic: {
      id: number;
      name: string;
      categoryId: number;
    };

    instructor: {
      id: number;
      name: string;
      avatar: string;
    };
  };

  schedule: {
    weeklySchedule: {
      id: number;
      label: string;
      days: string[];
    };

    timeSlot: {
      id: number;
      label: string;
      startTime: string;
      endTime: string;
    };

    sessionType: {
      id: number;
      courseScheduleId: number;
      name: string;
      priceModifier: number;
      availableSeats: number;
      location: string;
    };

    location: string;
  };
}

export interface CourseDetails {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  category: {
    id: number;
    name: string;
    icon: string;
  };
  topic: {
    id: number;
    name: string;
    categoryId: number;
  };
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
  reviews: Review[];
  hours: number;
}

export async function getFeaturedCourses(): Promise<FeaturedCourse[]> {
  const response = await client.get("/courses/featured");
  return response.data.data;
}

export async function getContinueLearningCourses(): Promise<
  ContinueLearningCourse[]
> {
  const response = await client.get("/courses/in-progress");
  return response.data.data;
}

export async function getCourseDetails(
  id: string | number,
): Promise<CourseDetails> {
  const response = await client.get(`/courses/${id}`);
  return response.data.data;
}
