import { useEffect, useRef, useState } from "react";
import { Business, Review } from "src/types";
import StarRating from "./StarRanking";
import { Button } from "../ui/button";
import BussinessReview from "./BussinessReview";
import { getReviews } from "@/services/review.service";
import ReviewForm from "./ReviewCreationForm";
import { useAuth } from "@/providers/user.context";
import Login from "./Login";

interface BusinessDialogProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
  onUpdateBusiness: (updatedBusiness: Business) => void;
}

function BusinessDialog({
  business,
  isOpen,
  onClose,
  onUpdateBusiness,
}: BusinessDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { loggedInUser } = useAuth();
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentBusiness, setCurrentBusiness] = useState<Business>(business);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await getReviews(business._id);
        const reviews: Review[] = response.data.reviews;
        setReviews(reviews);
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
    if (!loggedInUser) {
      setIsLoginOpen(true);
    } else {
      setIsAddingReview(true);
    }
  }

  function handleReviewCreated(newReview: Review) {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    updateBusinessStars(updatedReviews);
    setIsAddingReview(false);
  }

  function handleCancelReview() {
    setIsAddingReview(false);
  }

  function updateBusinessStars(updatedReviews: Review[]) {
    const totalStars = updatedReviews.reduce(
      (acc, review) => acc + review.stars,
      0
    );
    const averageStars = totalStars / updatedReviews.length;
    const updatedBusiness = { ...currentBusiness, stars: averageStars };
    setCurrentBusiness(updatedBusiness);
    onUpdateBusiness(updatedBusiness);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={dialogRef}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto max-h-[90vh]"
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{currentBusiness.name}</h2>
        <p>{currentBusiness.description}</p>
        <div className="mt-2">
          <StarRating stars={currentBusiness.stars} readOnly />
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Reviews</h3>
            <Button className="mt-4" onClick={handleAddReview}>
              Add Review
            </Button>
          </div>
          {isAddingReview && (
            <div className="mt-4">
              <ReviewForm
                businessId={currentBusiness._id}
                onReviewCreated={handleReviewCreated}
                onCancel={handleCancelReview}
              />
            </div>
          )}
          {reviews.map((review) => (
            <BussinessReview key={review._id} review={review} />
          ))}
        </div>

        <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </div>
    </div>
  );
}

export default BusinessDialog;
