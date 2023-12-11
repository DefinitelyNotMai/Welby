// lib
import axios from "axios";
import bcrypt from "bcryptjs";

// local
import { fetchAccessToken } from "./tokenService";
import { EmployeeSignup } from "../data/employeeSignup";

export const signUpEmployee = async (
  EmployeeData: EmployeeSignup,
  UserId: string | number,
) => {
  const employee = {
    EmployeeId: UserId,
    First_Name: EmployeeData.First_Name,
    Middle_Name: EmployeeData.Middle_Name,
    Last_Name: EmployeeData.Last_Name,
    Nickname: EmployeeData.Nickname,

    Email: EmployeeData.Email,
    Phone_Number: EmployeeData.Phone_Number,

    Address: EmployeeData.Address,
    Birthday: EmployeeData.Birthday,
    Linkedin: EmployeeData.Linkedin,
    Facebook: EmployeeData.Facebook,
    Instagram: EmployeeData.Instagram,
    TikTok: EmployeeData.TikTok,

    ProfilePhoto: EmployeeData.ProfilePhoto,
    GenderId: EmployeeData.GenderId,
    CompanyId: EmployeeData.CompanyId,
    CountryId: EmployeeData.CountryId,

    RealizedStrengths: [],
    UnrealizedStrengths: [],
    LearnedBehaviors: [],
    Weakness: "",

    Interests: [],

    Work: EmployeeData.Work,
    Connect: EmployeeData.Connect,
    Support: EmployeeData.Support,

    Other_Notes: EmployeeData.Other_Notes,
    FirstLogIn: EmployeeData.FirstLogIn,
    CompanyPosition: EmployeeData.CompanyPosition,
    CompanyRole: EmployeeData.CompanyRole,
    Active: true,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Adding employee strengths, interest and weakness
    const RealizedStrengthsUrl =
      "https://localhost:44373/api/AddEmployeeRealizedStrength";
    for (let i = 0; i < EmployeeData.RealizedStrengths.length; i++) {
      const EMP_RealizedStrength = {
        EmployeeId: UserId,
        StrengthId: EmployeeData.RealizedStrengths[i],
      };

      axios
        .post(RealizedStrengthsUrl, EMP_RealizedStrength, config)
        .then(() => {
          // (response)
          // console.log(response.data)
          console.log("Added employee realized strengths");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const UnrealizedStrengthsUrl =
      "https://localhost:44373/api/AddEmployeeUnrealizedStrength";
    for (let i = 0; i < EmployeeData.UnrealizedStrengths.length; i++) {
      const EMP_UnrealizedStrength = {
        EmployeeId: UserId,
        StrengthId: EmployeeData.UnrealizedStrengths[i],
      };

      axios
        .post(UnrealizedStrengthsUrl, EMP_UnrealizedStrength, config)
        .then(() => {
          // (response)
          // console.log(response.data)
          console.log("Added employee unrealized strengths");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const LearnedBehaviorsUrl =
      "https://localhost:44373/api/AddEmployeeLearnedBehavior";
    for (let i = 0; i < EmployeeData.LearnedBehaviors.length; i++) {
      const EMP_LearnedBehaviors = {
        EmployeeId: UserId,
        StrengthId: EmployeeData.RealizedStrengths[i],
      };

      axios
        .post(LearnedBehaviorsUrl, EMP_LearnedBehaviors, config)
        .then(() => {
          // (response)
          // console.log(response.data)
          console.log("Added employee learned behavior");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const InterestsUrl = "https://localhost:44373/api/AddEmployeeInterest";
    for (let i = 0; i < EmployeeData.Interests.length; i++) {
      const EMP_Interest = {
        EmployeeId: UserId,
        InterestId: EmployeeData.Interests[i],
      };

      axios
        .post(InterestsUrl, EMP_Interest, config)
        .then(() => {
          // (response)
          // console.log(response.data)
          console.log("Added employee Interests");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const WeaknessUrl = "https://localhost:44373/api/AddEmployeeWeakness";
    const EMP_Weakness = {
      EmployeeId: UserId,
      StrengthId: EmployeeData.Weakness, // CHECK IF ID AND NOT STRING
    };
    axios
      .post(WeaknessUrl, EMP_Weakness, config)
      .then(() => {
        // (response)
        // console.log(response.data)
        console.log("Added employee weakness");
      })
      .catch((error) => {
        console.log(error);
      });

    const UpdateEmployeeUrl = "https://localhost:44373/api/UpdateEmployee";
    axios
      .patch(UpdateEmployeeUrl, employee, config)
      .then(() => {
        console.log("Update: ", employee);
      })
      .catch((error) => {
        console.log(error);
      });

    const tokenResponse = await fetchAccessToken();
    if (tokenResponse) {
      const token = tokenResponse;
      const UpdateSystemUserUrl = "http://localhost:58258/api/UpdateSystemUser";

      const hashedPassword = await bcrypt.hash(EmployeeData.Password, 10);

      const systemUser = {
        UserCode: localStorage.getItem("userId"),
        UserId: localStorage.getItem("id"),
        UserName: EmployeeData.Email,
        Password: hashedPassword,
        AccountLocked: 0,
        LoggedIn: 0,
        PasswordNoExpiry: null,
        ExpiryDays: null,
        AccountVerified: null,
        VerifiedDate: null,
        Encoded_By: UserId,
        Active: true,
      };

      console.log(systemUser);
      axios
        .patch(UpdateSystemUserUrl, systemUser, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log("Successfully added to OWS");
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  } catch (error) {
    console.error("An error has occured: ", error);
  }
};
