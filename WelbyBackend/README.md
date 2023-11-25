# WelbyAPI Routes  and Parameters
Note: The parameters might change because these 
were tested only in Postman.
- ##### *If value of a string parameter is not known, use* **" "** *to indicate it is null.*
- ##### *if value of a number parameter is not known, use* **0** *to indicate null.*
- ##### *If `Active` is not `true` it will show both active and inactive datas* 

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
  - **EmpoyeeId:** number

  }

> ##### Return :

**~/api/ReturnEmployee**
- params : {
  - **EmpoyeeId:** number

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
## Values Routes

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