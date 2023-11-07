import axios from "axios";
import bcrypt from "bcryptjs";
import { LoginData } from "../data/typesForm";
import fetchAccessToken from "./tokenService";

const processLogin = async (
  loginData: LoginData,
): Promise<{ loginSuccess: boolean; path: string }> => {
  let path = "";
  try {
    const tokenResponse = await fetchAccessToken();

    if (tokenResponse !== null) {
      const token = tokenResponse;
      const loginUrl = "http://localhost:58258/api/GetSystemUsers";
      const param = {
        UserName: loginData.UserName,
        Active: true,
      };

      return new Promise<{ loginSuccess: boolean; path: string }>(
        (resolve, reject) => {
          axios
            .get(loginUrl, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              params: param,
            })
            .then((response) => {
              const result = response.data;

              if (result !== null && result.length > 0) {
                const storedPassword = result[0].Password;

                bcrypt.compare(
                  loginData.Password,
                  storedPassword,
                  (err, passwordMatch) => {
                    if (err) {
                      // handle error
                      console.error(err);
                      reject(err);
                    } else if (passwordMatch) {
                      // passwords match, login successful
                      localStorage.setItem("userId", result[0].UserId);
                      if (result[0].Nickname === "com") {
                        path = "/employee-signup";
                      } else {
                        path = "/dashboard";
                      }
                      resolve({ loginSuccess: true, path });
                    } else {
                      // passwords do not match; login failed
                      resolve({ loginSuccess: false, path });
                    }
                  },
                );
              } else {
                // User not found
                resolve({ loginSuccess: false, path });
              }
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        },
      );
    }
    return { loginSuccess: false, path };
  } catch (error) {
    console.error(error);
    return { loginSuccess: false, path };
  }
};

export default processLogin;
