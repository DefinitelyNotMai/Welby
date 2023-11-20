using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WWA_CORE.Persistent.Resource.Registration;

namespace WWA_CORE.Persistent.ViewModel.Registration
{
    public class EmployeeRegistrationViewModel : EmployeeRegistrationResource
    {
        public int EmployeeId { get; set; }
        public string First_Name { get; set; }
        public string Middle_Name { get; set; }
        public string Last_Name { get; set;}
        public string Nickname { get; set; }
        public string Email { get; set; }
        public string Phone_Number { get; set; }
        public string Address { get; set; }
        public DateTime? Birthday { get; set; }
        public string Linkedin { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string TikTok { get; set; }
        public string ProfilePhoto { get; set; }
        public string CompanyPosition { get;set; }


        public int GenderId { get; set; }
        public int CompanyId { get; set; }
        public int CountryId { get; set; } 
        public bool? FirstLogIn { get; set; }

        public string Work { get; set; }
        public string Connect { get; set; }
        public string Support { get; set; }
        public string Other_Notes { get; set; }
    }
}
