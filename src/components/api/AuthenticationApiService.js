import { apiClient } from "./ApiClient";

export const authenticationService = (username, password) => apiClient.post(`/authenticate`, {username, password})