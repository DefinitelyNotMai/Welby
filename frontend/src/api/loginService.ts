// lib
import bcrypt from "bcryptjs";

// local
import { Login } from "../data/login";
import { fetchAccessToken } from "./tokenService";
import { fetchData } from "./fetchData";

const loginUrl = "http://localhost:58258/api/GetSystemUsers";
const employeeUrl = "https://localhost:44373/api/GetEmployees";

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
    const data = await fetchData(employeeUrl, {
      CompanyId: 0,
      Email: loginData.UserName,
      EmployeeId: 0,
      Phone_Number: "",
      Active: true,
    });
    console.log(data);

    if (result && result.length > 0) {
      const storedPassword = result[0].Password;
      const passwordMatch = await bcrypt.compare(
        loginData.Password,
        storedPassword,
      );

      if (passwordMatch) {
        localStorage.setItem("userId", result[0].UserCode);
        localStorage.setItem("id", result[0].UserId);

        if (data[0].FirstLogIn === false) {
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
