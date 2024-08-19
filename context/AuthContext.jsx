import React from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL, KEYS } from "../constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMe, loginFn, logoutFn, registerFn } from "./handlers";

const AuthContext = React.createContext({
  jwt: null,
  me: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    jwt: null,
    me: null,
    loading: false,
  });

  const {
    data: me,
    isLoading: loadingMe,
    refetch: refetchMe,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const { mutateAsync: mutateLogin, isPending: loggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,
  });
  const { mutateAsync: mutateRegister, isPending: registering } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,
  });
  const { mutateAsync: mutateLogout, isPending: loggingOut } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutFn,
  });

  // React.useEffect(() => {
  //   setAuthState((s) => ({
  //     ...s,
  //     loading: loggingIn || registering || loggingOut,
  //     me,
  //   }));
  // }, [me, loggingIn, registering, loggingOut]);

  // React.useEffect(() => {
  //   (async () => {
  //     const data = await SecureStore.getItemAsync(KEYS.JWT);
  //     if (data) {
  //       const object = JSON.parse(data);
  //       setAuthState((s) => ({ ...s, jwt: object.jwt }));
  //     }
  //   })();
  // }, []);

  const login = async (email, password) => {
    const data = await mutateLogin({ email, password });
    if (!!data?.jwt) {
      setAuthState((s) => ({ ...s, jwt: data.jwt }));
      refetchMe();
    } else {
      setAuthState((s) => ({ ...s, jwt: null }));
      refetchMe();
    }
    return data;
  };

  const register = async (email, password) => {
    try {
      const result = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: true,
      });
      const json = await result.json();
      if (json.error) {
        return { error: json.error };
      }
      setAuthState({
        jwt: json.jwt,
      });
      await SecureStore.setItemAsync(KEYS.JWT, JSON.stringify(json));
      return json;
    } catch (e) {
      return { error: e.message };
    }
  };

  const logout = mutateLogout().then(() =>
    setAuthState((s) => ({ ...s, jwt: null, me: null }))
  );

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        ...authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
