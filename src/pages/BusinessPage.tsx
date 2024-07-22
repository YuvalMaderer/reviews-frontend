import { useState, useEffect } from "react";
import { getBusinesses } from "../services/business.service";
import { Business } from "../types";
import BusinessDialog from "../components/general-components/BusinessDialog";
import StarRating from "../components/general-components/StarRanking";
import { dummyReviews } from "../dummyData";
import SearchForm from "../components/general-components/Search";
import Pagination from "../components/general-components/Pagination";
import { useSearchParams } from "react-router-dom";

function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 10;

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const response = await getBusinesses(currentPage);
        setBusinesses((prevBusinesses) => [
          ...prevBusinesses,
          ...response.data.business,
        ]);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    }

    fetchBusinesses();
  }, [currentPage]);

  useEffect(() => {
    const searchTerm = searchParams.get("name") || "";
    const category = searchParams.get("category") || "";
    setFilteredBusinesses(
      businesses.filter((business) => {
        const matchesQuery = business.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory = category
          ? business.category === category
          : true;
        return matchesQuery && matchesCategory;
      })
    );
  }, [searchParams, businesses]);

  useEffect(() => {
    if (
      filteredBusinesses.length < 10 &&
      businesses.length >= currentPage * businessesPerPage
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [filteredBusinesses, businesses]);

  function handleBusinessClick(business: Business) {
    setSelectedBusiness(business);
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
    setSelectedBusiness(null);
  }

  const categories = Array.from(
    new Set(businesses.map((business) => business.category))
  );

  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = filteredBusinesses.slice(
    indexOfFirstBusiness,
    indexOfLastBusiness
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Business Page</h1>
      <SearchForm categories={categories} />
      <div className="flex flex-col gap-8 p-8">
        {currentBusinesses.map((business) => (
          <div
            key={business._id}
            className="p-4 border rounded-lg shadow cursor-pointer"
            onClick={() => handleBusinessClick(business)}
          >
            <h2 className="text-xl font-semibold">{business.name}</h2>
            <p className="mt-2">{business.description}</p>
            <div className="mt-2">
              <StarRating stars={business.stars} readOnly />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        businessesPerPage={businessesPerPage}
        totalBusinesses={filteredBusinesses.length}
        paginate={paginate}
        currentPage={currentPage}
      />
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
