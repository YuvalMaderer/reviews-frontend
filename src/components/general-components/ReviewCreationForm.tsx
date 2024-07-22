import { useState } from "react";
import { Review } from "src/types";
import StarRating from "./StarRanking";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createReview } from "@/services/review.service";

interface ReviewFormProps {
  businessId: string;
  onReviewCreated: (review: Review) => void;
  onCancel: () => void;
}

function ReviewForm({
  businessId,
  onReviewCreated,
  onCancel,
}: ReviewFormProps) {
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!content || stars === 0) {
      setError("Please provide content and a star rating.");
      return;
    }

    try {
      const newReview: Partial<Review> = {
        content,
        business: businessId,
        user: "user-id-placeholder", // Replace with actual user ID from your authentication context
        stars: stars,
        likes: [],
        createdAt: new Date(),
      };

      const response = await createReview(businessId);
      onReviewCreated(response.data);
      setContent("");
      setStars(0);
    } catch (error) {
      setError("Error creating review. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">New Review</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Textarea
        className="mb-2"
        placeholder="Write your review here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mb-2">
        <StarRating stars={stars} onChange={setStars} />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Post</Button>
      </div>
    </div>
  );
}

export default ReviewForm;
