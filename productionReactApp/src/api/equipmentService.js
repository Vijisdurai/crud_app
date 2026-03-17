// FILE: src/api/equipmentService.js
import axiosClient from './axiosClient';

const BASE = '/Equipment';

export const equipmentService = {
  ping: () => axiosClient.get(`${BASE}/Ping`),
  getAll: () => axiosClient.get(BASE),
  create: (data) => axiosClient.post(BASE, data),
  update: (id, data) => axiosClient.put(`${BASE}/${id}`, data),
  remove: (id) => axiosClient.delete(`${BASE}/${id}`),
};
