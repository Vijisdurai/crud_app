// FILE: src/api/productionLineService.js
import axiosClient from './axiosClient';

const BASE = '/ProductionLine';

export const productionLineService = {
  ping: () => axiosClient.get(`${BASE}/Ping`),
  getAll: () => axiosClient.get(BASE),
  create: (data) => axiosClient.post(BASE, data),
  update: (id, data) => axiosClient.put(`${BASE}/${id}`, data),
  remove: (id) => axiosClient.delete(`${BASE}/${id}`),
};
