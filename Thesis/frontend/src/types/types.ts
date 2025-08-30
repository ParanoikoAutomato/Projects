import { UserRoles } from "@/enums/enums";

export interface AuthUser {
  id: null | number | string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  token: string | null;
}

export type Option = {
  value: number | string;
  label: string;
};
