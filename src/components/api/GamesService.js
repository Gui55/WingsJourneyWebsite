import { apiClient } from "./ApiClient"

export const gamesApi = () => apiClient.get("games")
export const uploadGamesApi = (game) => apiClient.post("games", game)
export const uploadGameImageApi = (id, formData) => apiClient.post(`games/image/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
export const findGameByIdApi = (id) => apiClient.get(`games/id/${id}`)
export const updateGameApi = (game) => apiClient.post("games/update", game)
export const deleteGameApi = (id) => apiClient.delete(`games/delete/${id}`)
export const gameImageApi = (url) => apiClient.get(`${url}`, {responseType: 'arraybuffer'})