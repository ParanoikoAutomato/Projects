import Axios from "axios";

import { store } from "./store";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withXSRFToken: true,
  withCredentials: true,
});

axios.interceptors.request.use(async (request) => {
  const token = store.getState().user.token;
  if (token) {
    request.headers!.Authorization = `Bearer ${token}`;
  }
  return request;
});
