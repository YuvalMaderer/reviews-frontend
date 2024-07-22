import api from "./api.service";
import { Review } from "../types";

export function getReviews(businessId: string) {
  return api.get<Review[]>(`/review/${businessId}`);
}

export function createReview(businessId: string) {
  return api.post<Review>(`/review/${businessId}`);
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
