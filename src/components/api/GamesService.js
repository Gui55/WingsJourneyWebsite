import axios from 'axios'

const apiClient = axios.create(
    {
        //baseURL: 'https://6410ee0295656eab41c58fb8.mockapi.io/'
        baseURL: 'http://localhost:8081/'
    }
)

export const gamesApi = () => apiClient.get("games")