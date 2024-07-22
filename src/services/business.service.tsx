import api from "./api.service";
import { Business } from "../types";

export function getBusinesses(page = 1, name = "", category = "") {
  const params: { [key: string]: string | number } = { page };
  if (name) params.name = name;
  if (category) params.category = category;

  return api.get<{ business: Business[] }>("/business", { params });
}
// export function createBusiness(business: Business) {
//   return api.post<Business>("/business", business);
// }
