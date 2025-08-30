import { UserRoles } from "@/enums/enums";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  access_token: string;
  refresh_token?: string;
}
