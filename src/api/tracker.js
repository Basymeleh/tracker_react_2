import axios from 'axios'
import { AsyncStorage } from 'react-native'

// On track-server 'npm run dev'
// On tracks 'ngrok http 3000'
// Change URL every 8 hours

const instance = axios.create({
    baseURL: 'http://d0170a06.ngrok.io'
})

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance