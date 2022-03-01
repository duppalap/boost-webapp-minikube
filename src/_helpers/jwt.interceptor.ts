import axios from "axios";
import { AuthService } from "_apis_/auth";

export default function jwtInterceptor() {
  axios.interceptors.request.use((request: any) => {
    const authService = new AuthService();
    // add auth header with jwt if account is logged in
    if (authService?.token) {
      request.headers.common.Authorization = `Bearer ${authService?.token}`;
    }

    return request;
  });
}
