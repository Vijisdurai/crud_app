// FILE: src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5160/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Request interceptor ──────────────────────────────────────────────────────
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('[Axios Request Error]', error);
    return Promise.reject(error);
  }
);

// ── Response interceptor ─────────────────────────────────────────────────────
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const originalMsg =
      error?.response?.data?.message ||
      error?.response?.data ||
      error.message;

    // 409 Conflict → wrap into a user-friendly validation error
    if (status === 409) {
      const conflictError = new Error(
        typeof originalMsg === 'string'
          ? originalMsg
          : 'A record with this name already exists.'
      );
      conflictError.isConflict = true;
      conflictError.status = 409;
      console.warn('[Axios 409 Conflict]', conflictError.message);
      return Promise.reject(conflictError);
    }

    if (import.meta.env.DEV) {
      console.error(`[Axios Error ${status}]`, originalMsg, error);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
