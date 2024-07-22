import { Review as ReviewType } from "src/types";
import StarRating from "./StarRanking";
import { ThumbsUp } from "lucide-react";
import { useAuth } from "@/providers/user.context";

interface ReviewProps {
  review: ReviewType;
}

function Review({ review }: ReviewProps) {
  const { loggedInUser } = useAuth();

  async function toggleLike(reviewId: string): Promise<void> {}

  return (
    <div className="p-4 border rounded-lg shadow mb-4 flex flex-col gap-2">
      <div className=" flex justify-between items-center">
        <p>
          <strong>{review.userFullName}</strong>
        </p>
        <div className=" flex items-center gap-2">
          <div>{review.likes.length}</div>
          <div>
            <ThumbsUp />
          </div>
        </div>
      </div>

      <p>{review.content}</p>
      <div className="mt-2">
        <StarRating stars={review.stars} readOnly />
      </div>
      <p>Likes: {review.likes.length}</p>
    </div>
  );
}

export default Review;
