import { User } from "@/entities/user/model/user";
import { baseUrl, ApiPaths } from "@/shared/api/apiPaths";

type LoginResponse = {
  access_token: string;
  user: User;
};

export const loginRequest = async (
  login: string,
  password: string
): Promise<LoginResponse> => {
  const body = JSON.stringify({
    login,
    password,
  });

  const response = await fetch(`${baseUrl}${ApiPaths.login()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  return response.json();
};
