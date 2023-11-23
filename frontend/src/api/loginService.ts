import bcrypt from "bcryptjs";
import { LoginData } from "../data/typesForm";
import { fetchAccessToken } from "./tokenService";

const loginUrl = "http://localhost:58258/api/GetSystemUsers";

export const processLogin = async (
  loginData: LoginData,
): Promise<{
  loginSuccess: boolean;
  path: string;
  id: string;
}> => {
  let path = "";
  let id = "";

  try {
    const token = await fetchAccessToken();

    const params = new URLSearchParams({
      UserName: loginData.UserName,
      Active: "true",
    });

    const response = await fetch(`${loginUrl}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result && result.length > 0) {
      const storedPassword = result[0].Password;
      const passwordMatch = await bcrypt.compare(
        loginData.Password,
        storedPassword,
      );

      if (passwordMatch) {
        localStorage.setItem("userId", result[0].UserCode);
        id = result[0].UserCode;

        if (result[0].FirstLogin === 1) {
          path = "/employee-signup";
        } else {
          path = "/dashboard/my-dashboard/overview";
        }

        return { loginSuccess: true, path, id };
      } else {
        return { loginSuccess: false, path, id };
      }
    } else {
      return { loginSuccess: false, path, id };
    }
  } catch (error) {
    console.error(error);
    return { loginSuccess: false, path, id };
  }
};

export default processLogin;
