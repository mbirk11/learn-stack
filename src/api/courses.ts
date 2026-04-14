import client from "./client";

export interface FeaturedCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  avgRating: number;
  instructor?: {
    name: string;
  };
}
type Review = {
  userId: number;
  rating: number;
};
export interface ContinueLearningCourse {
  id: number;
  title: string;
  image: string;
  avgRating: number;
  progress: number;
  instructor?: {
    name: string;
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
}

export async function getFeaturedCourses(): Promise<FeaturedCourse[]> {
  const response = await client.get("/courses/featured");
  return response.data.data;
}

export async function getContinueLearningCourses(): Promise<
  ContinueLearningCourse[]
> {
  const response = await client.get("/courses/continue-learning");
  return response.data.data;
}

export async function getCourseDetails(
  id: string | number,
): Promise<CourseDetails> {
  const response = await client.get(`/courses/${id}`);
  return response.data.data;
}
