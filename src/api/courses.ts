import type { AnyUseBaseQueryOptions } from "@tanstack/react-query";
import client from "./client";

export interface FeaturedCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  avgRating: number;
  instructor?: { name: string };
}

export interface ContinueLearningCourse {
  id: number;
  title: string;
  image: string;
  avgRating: number;
  progress: number;
  instructor?: { name: string };
}

export async function getFeaturedCourses() {
  const response = await client.get("/courses/featured");
  return response.data.data;
}

export async function getContinueLearningCourses() {
  const response = await client.get("/courses/continue-learning");
  return response.data.data;
}
export async function getCourseDetails(
  id: string | number,
): Promise<Record<string, AnyUseBaseQueryOptions>> {
  const response = await client.get(`/courses/${id}`);
  return response.data.data;
}
