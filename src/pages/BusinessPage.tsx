import { useState, useEffect } from "react";
import { getBusinesses } from "../services/business.service";
import { Business } from "../types";
import BusinessDialog from "../components/general-components/BusinessDialog";
import StarRating from "../components/general-components/StarRanking";
import SearchForm from "../components/general-components/Search";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/general-components/Pagination";

function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBusinesses, setTotalBusinesses] = useState(0);
  const businessesPerPage = 10;

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setIsLoading(true);
        const name = searchParams.get("name") || "";
        const category = searchParams.get("category") || "";
        const response = await getBusinesses(currentPage, name, category);
        setBusinesses(response.data.business);
        setTotalBusinesses(response.data.totalBusinesses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setIsLoading(false);
      }
    }

    fetchBusinesses();
  }, [searchParams, currentPage]);

  function handleBusinessClick(business: Business) {
    setSelectedBusiness(business);
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
    setSelectedBusiness(null);
  }

  function handleUpdateBusiness(updatedBusiness: Business) {
    setBusinesses((prevBusinesses) =>
      prevBusinesses.map((b) =>
        b._id === updatedBusiness._id ? updatedBusiness : b
      )
    );
  }

  const categories = Array.from(
    new Set(businesses.map((business) => business.category))
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="m-16">
      <h1 className="text-3xl font-bold my-4 text-center">Business Page</h1>
      <SearchForm categories={categories} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-8 p-8">
          {businesses.map((business) => (
            <div
              key={business._id}
              className="p-6 border rounded-lg shadow cursor-pointer flex flex-col gap-2"
              onClick={() => handleBusinessClick(business)}
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{business.name}</h2>
                <div>
                  <StarRating stars={business.stars} readOnly />
                </div>
              </div>
              <div> {business.category}</div>
              <p>{business.description}</p>
            </div>
          ))}
        </div>
      )}
      <Pagination
        businessesPerPage={businessesPerPage}
        totalBusinesses={totalBusinesses}
        paginate={paginate}
        currentPage={currentPage}
      />
      {selectedBusiness && (
        <BusinessDialog
          business={selectedBusiness}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onUpdateBusiness={handleUpdateBusiness}
        />
      )}
    </div>
  );
}

export default BusinessPage;
