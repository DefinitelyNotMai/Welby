import axios from "axios";
import bcrypt from "bcryptjs";
import { LoginData } from "../data/typesForm";
import fetchAccessToken from "./tokenService";

const processLogin = async (
  loginData: LoginData,
  setUserId: (id: string) => void,
): Promise<boolean> => {
  try {
    const tokenResponse = await fetchAccessToken();

    if (tokenResponse !== null) {
      const token = tokenResponse;
      const loginUrl = "http://localhost:58258/api/GetSystemUsers";
      const param = {
        UserName: loginData.email,
        Active: true,
      };

      return new Promise<boolean>((resolve, reject) => {
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
                loginData.password,
                storedPassword,
                (err, passwordMatch) => {
                  if (err) {
                    // handle error
                    console.error(err);
                    reject(err);
                  } else if (passwordMatch) {
                    // passwords match, login successful
                    setUserId(result[0].UserId);
                    resolve(true);
                  } else {
                    // passwords do not match; login failed
                    resolve(false);
                  }
                },
              );
            } else {
              // User not found
              resolve(false);
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    }
    return false; // failed to get an access token
  } catch (error) {
    console.error(error);
    return false; // an error occurred
  }
};

export default processLogin;
