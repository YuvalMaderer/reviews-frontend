import api from "./api.service";
import { Business } from "../types";

export const getBusinesses = (page: number) => {
  return api.get<{ business: Business[] }>(`/business?page=${page}`);
};

// export function createBusiness(business: Business) {
//   return api.post<Business>("/business", business);
// }
