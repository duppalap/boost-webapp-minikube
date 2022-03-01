import { createContext, ReactNode, useEffect, useReducer } from "react";
// utils
import axios from "../utils/axios";
import {
  decode,
  getTokenCookie,
  setCookie,
  setSession,
  validateToken,
} from "../utils/jwt";
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from "../@types/auth";
import { AuthService } from "../_apis_/auth";
import { LoginForm } from "../utils/sigin";
import { UserService } from "../_apis_/user";
import { User } from "../@types/user";

// ----------------------------------------------------------------------

enum Types {
  Initial = "INITIALIZE",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions =
  ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const authService = new AuthService();

  const userService = new UserService();

  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getTokenCookie();
        if (accessToken && validateToken()) {
          setSession(accessToken);
          const tokenDetails = decode(accessToken);
          if (tokenDetails && tokenDetails.email) {
            const user: User = JSON.parse(
              localStorage.getItem("UserInfo") || "{}"
            );
            dispatch({
              type: Types.Initial,
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          }
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const loginData: LoginForm = { email: email, password: password };
    const loginResponse = await authService.login(loginData);
    const { token } = loginResponse.data;
    setSession(token);
    const tokenDetails = decode(token);
    if (tokenDetails && tokenDetails?.email) {
      const userResponse = await userService.getUserDetails(tokenDetails.email);
      const user: User = userResponse.data;
      if (user && tokenDetails.role) user.role = tokenDetails.role;
      localStorage.setItem(
        "UserInfo",
        JSON.stringify({ ...user, boostGroup: user?.BoostGroup }) || ""
      );
      dispatch({
        type: Types.Login,
        payload: {
          user,
        },
      });
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;
    setCookie(accessToken);
    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
