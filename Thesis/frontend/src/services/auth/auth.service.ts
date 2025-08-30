import { axios } from "@/lib/axios";

import { LoginPayload, LoginResponse } from "./auth.interfaces";

const PATH = "/api/users";

export const login = async (payload: LoginPayload) => {
  const response = await axios.post<LoginResponse>(`${PATH}/login`, {
    username: payload.username,
    password: payload.password,
  });
  return response.data;
};

const AuthService = {
  login,
};

export default AuthService;
