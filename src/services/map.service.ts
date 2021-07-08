const axios = require('axios')

const GOOGLE_URL = import.meta.env.VITE_GOOGLE_URL
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

export const getCoords = async (address: string) => {
  try {
    const { data } = await axios.get(
      `${GOOGLE_URL}?address=${address}&key=${API_KEY}`
    )
    return data
  } catch (err) {
    throw err
  }
}
