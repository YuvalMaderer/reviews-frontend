import { Star } from "lucide-react";

interface StarRatingProps {
  stars: number;
}

function StarRating({ stars }: StarRatingProps) {
  const fullStars = Math.floor(stars);
  const halfStar = stars % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <Star key={index} className="text-yellow-500" fill="currentColor" />
        ))}
      {halfStar && (
        <Star
          className="text-yellow-500"
          fill="currentColor"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star key={index} className="text-gray-300" fill="none" />
        ))}
    </div>
  );
}

export default StarRating;
