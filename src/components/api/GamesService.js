import axios from 'axios'

const apiClient = axios.create(
    {
        //baseURL: 'https://6410ee0295656eab41c58fb8.mockapi.io/'
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