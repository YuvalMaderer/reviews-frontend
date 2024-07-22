import { useEffect, useRef, useState } from "react";
import { Business, Review } from "src/types";
import StarRating from "./StarRanking";
import { Button } from "../ui/button";
import BussinessReview from "./BussinessReview";
import { getReviews } from "@/services/review.service";
import ReviewForm from "./ReviewCreationForm";

interface BusinessDialogProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
}

function BusinessDialog({ business, isOpen, onClose }: BusinessDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await getReviews(business._id);
        console.log(response);

        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen, business._id]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  function handleAddReview() {
    setIsAddingReview(true);
  }

  function handleReviewCreated(newReview: Review) {
    setReviews([...reviews, newReview]);
    setIsAddingReview(false);
  }

  function handleCancelReview() {
    setIsAddingReview(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={dialogRef}
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto max-h-screen"
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{business.name}</h2>
        <p>{business.description}</p>
        <div className="mt-2">
          <StarRating stars={business.stars} readOnly />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Reviews</h3>
          {reviews.map((review) => (
            <BussinessReview key={review._id} review={review} />
          ))}
        </div>
        {!isAddingReview ? (
          <Button className="mt-4" onClick={handleAddReview}>
            Add Review
          </Button>
        ) : (
          <ReviewForm
            businessId={business._id}
            onReviewCreated={handleReviewCreated}
            onCancel={handleCancelReview}
          />
        )}
      </div>
    </div>
  );
}

export default BusinessDialog;
