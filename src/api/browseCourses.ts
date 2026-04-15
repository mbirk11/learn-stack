import client from "./client";

export interface CourseListItem {
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
}

export interface CoursesMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface CoursesResponse {
  data: CourseListItem[];
  meta: CoursesMeta;
}

export interface GetCoursesParams {
  search?: string;
  categories?: number[];
  topics?: number[];
  instructors?: number[];
  sort?: "newest" | "oldest";
  page?: number;
}

export async function getCourses(
  params: GetCoursesParams = {},
): Promise<CoursesResponse> {
  const response = await client.get("/courses", {
    params: {
      search: params.search,
      categories: params.categories,
      topics: params.topics,
      instructors: params.instructors,
      sort: params.sort ?? "newest",
      page: params.page ?? 1,
    },
  });

  return response.data;
}
