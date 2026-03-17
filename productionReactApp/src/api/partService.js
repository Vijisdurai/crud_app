// FILE: src/api/partService.js
import axiosClient from './axiosClient';

const BASE = '/Part';

export const partService = {
  ping: () => axiosClient.get(`${BASE}/Ping`),
  getAll: () => axiosClient.get(BASE),
  create: (data) => axiosClient.post(BASE, data),
  update: (id, data) => axiosClient.put(`${BASE}/${id}`, data),
  remove: (id) => axiosClient.delete(`${BASE}/${id}`),
};
