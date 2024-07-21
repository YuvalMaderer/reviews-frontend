import React, { useEffect, useRef } from "react";
import { Business, Review } from "src/types";
import StarRating from "./StarRanking";

interface BusinessDialogProps {
  business: Business;
  reviews: Review[];
  isOpen: boolean;
  onClose: () => void;
}

function BusinessDialog({
  business,
  reviews,
  isOpen,
  onClose,
}: BusinessDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={dialogRef}
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative"
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{business.name}</h2>
        <p>{business.description}</p>
        <div className="mt-2">
          <StarRating stars={business.stars} />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Reviews</h3>
          {reviews.map((review) => (
            <div key={review._id} className="p-4 border rounded-lg shadow mb-4">
              <p>User: {review.user}</p>
              <p>{review.content}</p>
              <p>Likes: {review.likes.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessDialog;
