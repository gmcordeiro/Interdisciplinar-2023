import { AuthenticatedHttp } from "../../common/http/axios";
import { LoginUserInput, LoginUserPayload } from "../types";

export const login = (credentials: LoginUserInput): Promise<LoginUserPayload> =>
  AuthenticatedHttp.post("/auth/login", credentials).then(
    (response) => response.data as LoginUserPayload
  );
