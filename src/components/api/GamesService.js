import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8081/'
    }
)

export const gamesApi = () => apiClient.get("games")
export const uploadGamesApi = (game) => apiClient.post("games", game)
export const uploadGameImageApi = (id, formData) => apiClient.post(`games/image/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
export const findGameByIdApi = (id) => apiClient.get(`games/id/${id}`)
export const updateGameApi = (game) => apiClient.post("games/update", game)