import bcrypt from "bcryptjs";
import { LoginData } from "../data/typesForm";
import { fetchAccessToken } from "./tokenService";

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
    const tokenResponse = await fetchAccessToken();

    if (tokenResponse) {
      const token = tokenResponse;
      const loginUrl = "http://localhost:58258/api/GetSystemUsers";
      const params = new URLSearchParams({
        UserName: loginData.UserName,
        Active: "true",
      });

      return new Promise<{
        loginSuccess: boolean;
        path: string;
        id: string;
      }>((resolve, reject) => {
        fetch(`${loginUrl}?${params.toString()}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((result) => {
            if (result && result.length > 0) {
              const storedPassword = result[0].Password;
              bcrypt.compare(
                loginData.Password,
                storedPassword,
                (err, passwordMatch) => {
                  if (err) {
                    console.error(err);
                    reject(err);
                  } else if (passwordMatch) {
                    localStorage.setItem("userId", result[0].UserCode);
                    id = result[0].UserCode;
                    console.log(id);
                    if (result[0].FirstLogin == 0) {
                      path = "/employee-signup";
                    } else {
                      path = "/employee-signup";
                    }
                    resolve({ loginSuccess: true, path, id });
                  } else {
                    // FAIL: passwords don't match
                    resolve({ loginSuccess: false, path, id });
                  }
                },
              );
            } else {
              // handle case when result is empty
              resolve({ loginSuccess: false, path, id });
            }
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    } else {
      return { loginSuccess: false, path, id };
    }
  } catch (error) {
    console.error(error);
    return { loginSuccess: false, path, id };
  }
};
