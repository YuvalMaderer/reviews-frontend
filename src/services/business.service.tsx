import api from "./api.service";
import { Business } from "../types";

export const getBusinesses = (page: number) => {
  return api.get<{ business: Business[] }>(`/api/business?page=${page}`);
};

// export function createBusiness(business: Business) {
//   return api.post<Business>("/business", business);
// }
