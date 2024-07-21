import api from "./api.service";
import { Business } from "../types";

export function getBusinesses() {
  return api.get<Business[]>("/business");
}

export function createBusiness(business: Business) {
  return api.post<Business>("/business", business);
}
