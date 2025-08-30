import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { login } from "@/services/auth/auth.service";
import { useAppSelector } from "@/redux/hooks";
import { userActions } from "@/redux/slices/user";

export function useAuth() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const userData = await login({
      username: username,
      password: password,
    });
    dispatch(
      userActions.set({
        id: userData.id,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        token: userData.access_token,
        role: userData.role,
      })
    );
  };

  const signOut = () => {
    dispatch(userActions.reset());
    queryClient.clear();
  };

  return {
    isAuthenticated: user.id !== null && user.token !== null,
    user,
    signIn,
    signOut,
  };
}

export default useAuth;
