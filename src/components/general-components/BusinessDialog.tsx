import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Business, Review } from "src/types";

interface BusinessDialogProps {
  business: Business | null;
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
  if (!business) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogTitle>{business.name}</DialogTitle>
        <DialogDescription>{business.description}</DialogDescription>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Reviews</h2>
          {reviews.map((review) => (
            <div key={review._id} className="p-4 border rounded-lg shadow mb-4">
              <p>{review.content}</p>
              <p>Likes: {review.likes.length}</p>
            </div>
          ))}
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}

export default BusinessDialog;
