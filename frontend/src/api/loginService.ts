// lib
import bcrypt from "bcryptjs";

// local
import { Login } from "../data/login";
import { fetchAccessToken } from "./tokenService";

const loginUrl = "http://localhost:58258/api/GetSystemUsers";

export const login = async (loginData: Login) => {
  let path = "";

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

        if (result[0].FirstLogIn === 0) {
          path = "/employee-signup";
        } else {
          path = "/dashboard/my-dashboard/overview";
        }

        return { loginSuccess: true, path };
      } else {
        return { loginSuccess: false, path };
      }
    } else {
      return { loginSuccess: false, path };
    }
  } catch (error) {
    console.error(error);
    return { loginSuccess: false, path };
  }
};
