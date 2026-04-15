import client from "./client";

export interface CategoryItem {
  id: number;
  name: string;
  icon: string;
}

export interface TopicItem {
  id: number;
  name: string;
}

export interface InstructorItem {
  id: number;
  name: string;
  avatar: string;
}

interface CategoriesResponse {
  data: CategoryItem[];
}

interface TopicsResponse {
  data: TopicItem[];
}

interface InstructorsResponse {
  data: InstructorItem[];
}

export async function getCategories(): Promise<CategoryItem[]> {
  const response = await client.get<CategoriesResponse>("/categories");
  return response.data.data;
}

export async function getTopics(categoryIds?: number[]): Promise<TopicItem[]> {
  const response = await client.get<TopicsResponse>("/topics", {
    params: categoryIds?.length ? { categories: categoryIds } : undefined,
  });

  return response.data.data;
}

export async function getInstructors(): Promise<InstructorItem[]> {
  const response = await client.get<InstructorsResponse>("/instructors");
  return response.data.data;
}
