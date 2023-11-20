using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Utilities
{
    public class GlobalFunctions : IDisposable
    {
        private const string cryptoKey = "cryptoKey";
        private static readonly byte[] IV = new byte[8] { 240, 3, 45, 29, 0, 76, 173, 59 };
        public void InitializeDefaults()
        {
            WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING = ConfigurationManager.ConnectionStrings["WWAEntities"].ToString();
        }
        public bool ValidateDatatable(DataTable dt)
        {
            if (dt != null)
            {
                if (dt.Rows.Count > 0)
                {
                    return true;
                }
            }

            return false;
        }
        public bool ValidateDataSet(DataSet ds, int TableIndex)
        {
            if (ds != null)
            {
                if (ds.Tables.Count > 0)
                {
                    if (this.ValidateDatatable(ds.Tables[TableIndex]))
                    {
                        return true;
                    }
                }
            }

            return false;
        }
        public bool ValidDateTime(string dateTime)
        {
            string[] sFormat = { "dd/MM/yyyy" };
            bool Value = DateTime.TryParseExact(dateTime, sFormat, new CultureInfo("en-US"),
                               DateTimeStyles.None, out _);
            return Value;
        }

        public string Encrypt(string s)
        {
            if (s == null || s.Length == 0) return string.Empty;

            string result;
            try
            {
                byte[] buffer = Encoding.ASCII.GetBytes(s);

                TripleDESCryptoServiceProvider des =
                    new TripleDESCryptoServiceProvider();

                MD5CryptoServiceProvider MD5 =
                    new MD5CryptoServiceProvider();

                des.Key =
                    MD5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(cryptoKey));

                des.IV = IV;
                result = Convert.ToBase64String(
                    des.CreateEncryptor().TransformFinalBlock(
                        buffer, 0, buffer.Length));
            }
            catch
            {
                throw;
            }

            return result;
        }
        public string Decrypt(string s)
        {
            if (s == null || s.Length == 0) return string.Empty;

            string result;
            try
            {
                byte[] buffer = Convert.FromBase64String(s);

                TripleDESCryptoServiceProvider des =
                    new TripleDESCryptoServiceProvider();

                MD5CryptoServiceProvider MD5 =
                    new MD5CryptoServiceProvider();

                des.Key =
                    MD5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(cryptoKey));

                des.IV = IV;

                result = Encoding.ASCII.GetString(
                    des.CreateDecryptor().TransformFinalBlock(
                    buffer, 0, buffer.Length));
            }
            catch
            {
                throw;
            }

            return result;
        }

        public DateTime GetServerDateTime()
        {
            using (SqlConnection sqlConn = new SqlConnection(Convert.ToString(WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING)))
            {
                if (sqlConn.State == ConnectionState.Closed)
                    sqlConn.Open();
                string SQL = "SELECT GETDATE() as ServerDate";
                using (SqlCommand sqlCmd = sqlConn.CreateCommand())
                {
                    using (DataTable dt = new DataTable())
                    {
                        try
                        {
                            sqlCmd.CommandTimeout = 0;
                            using (SqlDataAdapter SQA_DataAdapter = new SqlDataAdapter(sqlCmd))
                            {
                                SQA_DataAdapter.SelectCommand = new SqlCommand(SQL.ToString(), sqlConn)
                                {
                                    CommandTimeout = 0
                                };
                                SQA_DataAdapter.Fill(dt);
                                if (this.ValidateDatatable(dt))
                                    return Convert.ToDateTime(dt.Rows[0]["ServerDate"]);
                                else
                                    return DateTime.Now;
                            }

                        }
                        catch { return DateTime.Now; }
                    }
                }
            }
        }
        public DateTime GetFirstDayOfMonth(DateTime givenDate)
        {
            return new DateTime(givenDate.Year, givenDate.Month, 1);
        }
        public DateTime GetTheLastDayOfMonth(DateTime givenDate)
        {
            return GetFirstDayOfMonth(givenDate).AddMonths(1).Subtract(new TimeSpan(1, 0, 0, 0, 0));
        }
        public Image ConvertFromStringBase64(string imagestring)
        {
            Image img;
            byte[] bytes = Convert.FromBase64String(imagestring);

            using (MemoryStream ms = new MemoryStream(bytes))
            {
                img = Image.FromStream(ms);
            }

            return img;
        }


        #region Disposable Implementation
        private bool disposed = false;
        private readonly Component component = new Component();
        private IntPtr handle;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                    component.Dispose();

                CloseHandle(handle);
                handle = IntPtr.Zero;
                disposed = true;
            }
        }

        [System.Runtime.InteropServices.DllImport("Kernel32")]
        private extern static Boolean CloseHandle(IntPtr handle);

        ~GlobalFunctions()
        {
            Dispose(false);
        }

        #endregion
    }
}
