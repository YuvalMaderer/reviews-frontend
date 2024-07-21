import { useEffect, useState } from "react";
import { Business, Review } from "src/types";
import {
  getReviews,
  createReview,
  likeReview,
} from "src/services/review.service";
import { AxiosResponse, AxiosError } from "axios";

interface BusinessDetailProps {
  business: Business;
}

function BusinessDetail(props: BusinessDetailProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewContent, setNewReviewContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    function () {
      fetchReviews();
    },
    [props.business._id]
  );

  function fetchReviews() {
    getReviews(props.business._id)
      .then(function (response: AxiosResponse<Review[]>) {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(function (error: AxiosError) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }

  function handleCreateReview() {
    const newReview: Review = {
      _id: "",
      content: newReviewContent,
      business: props.business._id,
      user: "", // Should be set to the logged-in user ID
      likes: [],
    };

    createReview(newReview)
      .then(function (response: AxiosResponse<Review>) {
        setReviews([...reviews, response.data]);
        setNewReviewContent("");
      })
      .catch(function (error: AxiosError) {
        console.error("Error creating review:", error);
      });
  }

  function handleLikeReview(reviewId: string) {
    const userId = ""; // Should be set to the logged-in user ID
    likeReview(reviewId, userId)
      .then(function () {
        fetchReviews();
      })
      .catch(function (error: AxiosError) {
        console.error("Error liking review:", error);
      });
  }

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{props.business.name}</h1>
      <p className="mb-4">{props.business.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews.map(function (review) {
          return (
            <div key={review._id} className="p-4 border rounded-lg shadow mb-4">
              <p>{review.content}</p>
              <button onClick={() => handleLikeReview(review._id)}>
                Like ({review.likes.length})
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-xl font-semibold">Add a Review</h2>
        <textarea
          value={newReviewContent}
          onChange={(e) => setNewReviewContent(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleCreateReview}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default BusinessDetail;
