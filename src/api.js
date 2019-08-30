import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://jservice.io/api`,
    withCredentials: false,
    crossDomain: true,
    headers: {
    }
  })
}
