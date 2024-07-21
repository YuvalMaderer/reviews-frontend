import api from "./api.service";
import { Review } from "../types";

export function getReviews(businessId: string) {
  return api.get<Review[]>(`/review?business=${businessId}`);
}

export function createReview(review: Review) {
  return api.post<Review>("/review", review);
}

export function updateReview(reviewId: string, review: Partial<Review>) {
  return api.put<Review>(`/review/${reviewId}`, review);
}

export function deleteReview(reviewId: string) {
  return api.delete(`/review/${reviewId}`);
}

export function likeReview(reviewId: string, userId: string) {
  return api.post(`/review/${reviewId}/like`, { userId });
}
