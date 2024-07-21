import { Review as ReviewType } from "src/types";
import StarRating from "./StarRanking";

interface ReviewProps {
  review: ReviewType;
}

function Review({ review }: ReviewProps) {
  return (
    <div className="p-4 border rounded-lg shadow mb-4">
      <p>
        <strong>User:</strong> {review.user}
      </p>
      <p>{review.content}</p>
      <div className="mt-2">
        <StarRating stars={review.stars} readOnly />
      </div>
      <p>Likes: {review.likes.length}</p>
    </div>
  );
}

export default Review;
