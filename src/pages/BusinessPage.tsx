import { useEffect, useState } from "react";
import { getBusinesses } from "../services/business.service";
import BusinessList from "../components/general-components/BusinessList";
import { Business, Review } from "../types";
import BusinessDetail from "../components/general-components/BusinessDialog";
import { AxiosResponse, AxiosError } from "axios";
import BusinessDialog from "../components/general-components/BusinessDialog";

const dummyBusinesses: Business[] = [
  {
    _id: "1",
    name: "Business One",
    description: "This is the description for Business One.",
    stars: 5,
  },
  {
    _id: "2",
    name: "Business Two",
    description: "This is the description for Business Two.",
    stars: 4.7,
  },
  {
    _id: "3",
    name: "Business Three",
    description: "This is the description for Business Three.",
    stars: 2,
  },
];
const dummyReviews: Review[] = [
  {
    _id: "1",
    content: "Great business!",
    business: "1",
    user: "1",
    likes: [{ userId: "1" }, { userId: "2" }],
  },
  {
    _id: "2",
    content: "Excellent service.",
    business: "1",
    user: "2",
    likes: [{ userId: "3" }],
  },
  {
    _id: "3",
    content: "Will visit again.",
    business: "2",
    user: "1",
    likes: [],
  },
];
function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>(dummyBusinesses);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  function handleBusinessClick(business: Business) {
    setSelectedBusiness(business);
    // Here you can fetch reviews for the selected business if backend is available
    // For now, we use dummy reviews
    setReviews(dummyReviews);
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
    setSelectedBusiness(null);
    setReviews([]);
  }

  useEffect(function () {
    // Simulate fetching businesses
    setBusinesses(dummyBusinesses);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Business Page</h1>
      <BusinessList
        businesses={businesses}
        onBusinessClick={handleBusinessClick}
      />
      <BusinessDialog
        business={selectedBusiness}
        reviews={reviews}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}

export default BusinessPage;
