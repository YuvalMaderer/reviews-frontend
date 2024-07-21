import { useEffect, useState } from "react";
import { getBusinesses } from "../services/business.service";
import BusinessList from "../components/general-components/BusinessList";
import { Business } from "../types";
import BusinessDetail from "../components/general-components/BusinessDetail";
import { AxiosResponse, AxiosError } from "axios";

function BusinessPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  function fetchBusinesses() {
    getBusinesses()
      .then(function (response: AxiosResponse<Business[]>) {
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch(function (error: AxiosError) {
        console.error("Error fetching businesses:", error);
        setLoading(false);
      });
  }

  useEffect(function () {
    fetchBusinesses();
  }, []);

  function handleBusinessClick(business: Business) {
    setSelectedBusiness(business);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Business Page</h1>
      {!selectedBusiness ? (
        <BusinessList
          businesses={businesses}
          onBusinessClick={handleBusinessClick}
        />
      ) : (
        <BusinessDetail business={selectedBusiness} />
      )}
    </div>
  );
}

export default BusinessPage;
