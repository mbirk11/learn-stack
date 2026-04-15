import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  completeEnrollment,
  deleteEnrollment,
  enrollCourse,
} from "../api/enrollment";
import { submitCourseReview } from "../api/reviews";

interface UseCourseDetailMutationsProps {
  courseId: number;
  onEnrollSuccess: () => void;
  onCompleteSuccess: () => void;
  onRetakeSuccess: () => void;
  onReviewSuccess?: () => void;
}

export function useCourseDetailMutations({
  courseId,
  onEnrollSuccess,
  onCompleteSuccess,
  onRetakeSuccess,
  onReviewSuccess,
}: UseCourseDetailMutationsProps) {
  const queryClient = useQueryClient();

  const enrollMutation = useMutation({
    mutationFn: enrollCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      await queryClient.invalidateQueries({
        queryKey: ["course-details", courseId],
      });
      onEnrollSuccess();
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeEnrollment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      await queryClient.invalidateQueries({
        queryKey: ["course-details", courseId],
      });
      onCompleteSuccess();
    },
  });

  const retakeMutation = useMutation({
    mutationFn: deleteEnrollment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      await queryClient.invalidateQueries({
        queryKey: ["course-details", courseId],
      });
      onRetakeSuccess();
    },
  });

  const reviewMutation = useMutation({
    mutationFn: (nextRating: number) =>
      submitCourseReview(courseId, { rating: nextRating }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["course-details", courseId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["enrollments"],
      });
      onReviewSuccess?.();
    },
  });

  return {
    enrollMutation,
    completeMutation,
    retakeMutation,
    reviewMutation,
  };
}
