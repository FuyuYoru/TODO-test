import { User } from "@/entities/user/model/user";
import { baseUrl, ApiPaths } from "@/shared/api/apiPaths";

type LoginResponse = {
  access_token: string;
  refresh_token: string;
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

  try {
    const response = await fetch(`${baseUrl}${ApiPaths.login()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      credentials: "include",
    });
  
    if (!response.ok) {
      console.log(response.status)
      throw new Error("Неверный логин/пароль");
    }
  
    return response.json();
  } catch { 
    throw new Error("Ошибка авторизации");
  }
};
