import client from "./client";

export interface SubmitReviewPayload {
  rating: number;
}

export const submitCourseReview = async (
  courseId: number,
  data: SubmitReviewPayload,
) => {
  const response = await client.post(`/courses/${courseId}/reviews`, data);

  return response.data;
};
