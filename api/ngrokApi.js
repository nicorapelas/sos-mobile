import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { devKeys } from '../config/devKeys'

const instance = axios.create({
  baseURL: devKeys.ngrokUri,
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
