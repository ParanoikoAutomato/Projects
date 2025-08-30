import { UserRoles } from "@/enums/enums";
import { AuthUser } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthUser = {
  id: null,
  token: null,
  username: "",
  firstName: "",
  lastName: "",
  role: UserRoles.Simple,
};

type SetPayload = {
  id: number | string;
  token: string | null;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
};

const getInitialState = (): AuthUser => {
  const token = localStorage.getItem("token") ?? null;
  const user = localStorage.getItem("user") ?? null;

  if (user) {
    const authUser = JSON.parse(user);
    return {
      token,
      id: authUser.id,
      role: authUser.role,
      username: authUser.username,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
    };
  }

  return initialState;
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    set: (state, action: PayloadAction<SetPayload>) => {
      const { id, token, username, role, firstName, lastName } = action.payload;

      if (token !== null) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id, username, role, firstName, lastName })
        );
        state.id = id;
        state.username = username;
        state.token = token;
        state.role = role;
        state.firstName = firstName;
        state.lastName = lastName;
      }
    },
    reset: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return initialState;
    },
  },
});

export const userActions = {
  set: userSlice.actions.set,
  reset: userSlice.actions.reset,
};

export default userSlice.reducer;
