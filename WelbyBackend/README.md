# WelbyAPI Routes  and Parameters
Note: The parameters might change because these 
were tested only in Postman.
- ##### *If value of a string parameter is not known, use* **" "** *to indicate it is null.*
- ##### *if value of a number parameter is not known, use* **0** *to indicate null.*
- ##### *If `Active` is not `true` it will show both active and inactive data* 

---
## Employee Routes

> ##### GET :
**~/api/GetEmployees**
- params : {
   - **EmployeeId:** number 
   - **CompanyId:** number
   - **Email:** string
   - **Phone_Number:** string
   - **Active:** boolean

  }

> ##### Add :

**~/api/AddEmployee**
- params : {
    - **CompanyId:** number
    - **GenderId:** number
    - **CountryId:** number
    - **Encoded_By:** number
    - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveEmployee**
- params : {
  - **EmployeeId:** number

  }

> ##### Return :

**~/api/ReturnEmployee**
- params : {
  - **EmployeeId:** number

  }

> ##### Update :

**~/api/UpdateEmployee**
- params : {
  - **EmployeeId:** number
  - **ProfilePhoto:** text
  - **First_Name:** string
  - **Middle_Name:** string
  - **Last_Name:** string
  - **Nickname:** string
  - **Email:** string
  - **Phone_Number:** string
  - **Address:** string
  - **Birthday:** string
  - **CompanyId** number
  - **CompanyPosition:** string
  - **CountryId:** number 
  - **GenderId:** number
  - **TikTok:** string
  - **LinkedIn:** string
  - **Facebook:** string
  - **Instagram:** string
  - **Work:** string
  - **Connect:** string
  - **Support:** string
  - **Other_Notes:** string
  - **Active:** boolean
  - **LastChanged_By:** number

  }

---
## Company Routes

> ##### GET :
**~/api/GetCompanies**
- params : {
  - **CompanyId:** number
  - **Email:** string
  - **Phone_Number:** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddCompany**
- params : {
  - **IndustryTypeId:** number
  - **CountryId:** number
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveCompany**
- params : {
  - **CompanyId:** number

  }

> ##### Return :

**~/api/ReturnCompany**
- params : {
  - **CompanyId:** number

  }

> ##### Update :

**~/api/UpdateCompany**
- params : {
  - **CompanyId:** number
  - **Logo:** text
  - **Name:** string
  - **Email:** string
  - **Phone_Number:** string
  - **Website:** string
  - **FoundingDate:** string
  - **Vision:** string
  - **Mission:** string
  - **Address:** string
  - **CountryId** number
  - **IndustryTypeId:** number
  - **CountryId:** number
  - **Active:** boolean
  - **LastChanged_By:** number

  }

---
## Company Values Routes

> ##### GET :
**~/api/GetValues**
- params : {
  - **ValueId:** number
  - **CompanyId:** number
  - **Title:** string
  - **Description:** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddValue**
- params : {
  - **CompanyId:** number
  - **Title:** string // maximum characters 250
  - **Description:** string // maximum characters 1000
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveValue**
- params : {
  - **ValueId:** number

  }

> ##### Return :

**~/api/ReturnValue**
- params : {
  - **ValueId:** number

  }

> ##### Update :

**~/api/UpdateValue**
- params : {
  - **ValueId:** number
  - **CompanyId:** number
  - **Title:** string
  - **Description:** string
  - **Active:** boolean
  - **LastChanged_By:** number

  }

---
## Company Goals Routes

> ##### GET :
**~/api/GetGoals**
- params : {
  - **GoalId:** number
  - **CompanyId:** number
  - **Title:** string
  - **Description:** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddGoal**
- params : {
  - **CompanyId:** number
  - **Title:** string // maximum characters 250
  - **Description:** string // maximum characters 1000
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveGoal**
- params : {
  - **GoalId:** number

  }

> ##### Return :

**~/api/ReturnGoal**
- params : {
  - **GoalId:** number

  }

> ##### Update :

**~/api/UpdateGoal**
- params : {
  - **GoalId:** number
  - **CompanyId:** number
  - **Title:** string
  - **Description:** string
  - **DurationTo:** string
  - **Active:** boolean
  - **LastChanged_By:** number

  }

---
## Strengths Master Routes

> ##### GET :
**~/api/GetStrengths**
- params : {
  - **StrengthId:** number
  - **Strength:** string
  - **Category:** string
  - **Description:** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddStrength**
- params : {
  - **Strength:** string
  - **Category:** string 
  - **Description:** string 
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveStrength**
- params : {
  - **StrengthId:** number

  }

> ##### Return :

**~/api/ReturnStrength**
- params : {
  - **StrengthId:** number

  }

> ##### Update :

**~/api/UpdateStrength**
- params : {
  - **StrengthId:** string
  - **Strength:** string
  - **Category:** string
  - **Description:** string
  - **Active:** boolean
  - **LastChanged_By:** number

  }

---
## Interest Master Routes

> ##### GET :
**~/api/GetInterests**
- params : {
  - **InterestId:** number
  - **Name:** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddInterest**
- params : {
  - **Name:** string
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveInterest**
- params : {
  - **InterestId:** number

  }

> ##### Return :

**~/api/ReturnInterest**
- params : {
  - **InterestId:** number

  }

> ##### Update :

**~/api/UpdateInterest**
- params : {
  - **InterestId:** string
  - **Name:** string
  - **Active:** boolean
  - **LastChanged_By:** number

  }


---
## Gender Master Routes

> ##### GET :
**~/api/GetGender**
- params : {
  - **GenderId:** number
  - **Gender:** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddGender**
- params : {
  - **Gender:** string
  - **Biological:** boolean
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveGender**
- params : {
  - **GenderId:** number

  }

> ##### Return :

**~/api/ReturnGender**
- params : {
  - **GenderId:** number

  }

> ##### Update :

**~/api/UpdateGender**
- params : {
  - **GenderId:** string
  - **Gender:** string
  - **Biological:** boolean
  - **Active:** boolean
  - **LastChanged_By:** number

  }


---
## Industry Type Routes

> ##### GET :
**~/api/GetIndustryTypes**
- params : {
  - **IndustryTypeId:** number
  - **Industry_Name** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddIndustryType**
- params : {
  - **Industry_Name:** string
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveIndustryTYpe**
- params : {
  - **IndustryTypeId:** number

  }

> ##### Return :

**~/api/ReturnIndustryType**
- params : {
  - **IndustryTypeId:** number

  }

> ##### Update :

**~/api/UpdateIndustryType**
- params : {
  - **IndustryTypeId:** number
  - **Industry_Name:** string
  - **Active:** boolean
  - **LastChanged_By:** number

  }

---
## Country Master Routes

> ##### GET :
**~/api/GetCountries**
- params : {
  - **CountryId:** number
  - **Name:** string
  - **Active:** boolean

  }

> ##### Add :

**~/api/AddCountry**
- params : {
  - **Name:** string
  - **Nationality:** string
  - **Flag_Image:** string
  - **Encoded_By:** number
  - **Encoded_Date:** string

  }

> ##### Remove :

**~/api/RemoveCountry**
- params : {
  - **CountryId:** number

  }

> ##### Return :

**~/api/ReturnCountry**
- params : {
  - **CountryId:** number

  }

> ##### Update :

**~/api/UpdateCountry**
- params : {
  - **CountryId:** number
  - **Name:** string
  - **Nationality:** string
  - **Flag_Image:** text
  - **Active:** boolean
  - **LastChanged_By:** number

  }

