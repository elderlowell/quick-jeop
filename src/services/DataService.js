import api from '@/api'

export default {
  getCluesBatch: () => api().get(`/random?count=100`)
}
