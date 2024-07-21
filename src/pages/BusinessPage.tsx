import React, { useState } from "react";
import { dummyBusinesses, dummyReviews } from "../dummyData";
import { Business } from "../types";
import BusinessDialog from "../components/general-components/BusinessDialog";
import StarRating from "../components/general-components/StarRanking";

function BusinessPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleBusinessClick(business: Business) {
    setSelectedBusiness(business);
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
    setSelectedBusiness(null);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Business Page</h1>
      <div className="flex gap-8">
        {dummyBusinesses.map((business) => (
          <div
            key={business._id}
            className="p-4 border rounded-lg shadow cursor-pointer"
            onClick={() => handleBusinessClick(business)}
          >
            <h2 className="text-xl font-semibold">{business.name}</h2>
            <p className="mt-2">{business.description}</p>
            <div className="mt-2">
              <StarRating stars={business.stars} />
            </div>
          </div>
        ))}
      </div>
      {selectedBusiness && (
        <BusinessDialog
          business={selectedBusiness}
          reviews={dummyReviews.filter(
            (review) => review.business === selectedBusiness._id
          )}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}

export default BusinessPage;
