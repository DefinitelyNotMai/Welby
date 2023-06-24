using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Utilities
{
    public class CommonSchema : IDisposable
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public bool Active { get; set; }
        public int Encoded_By { get; set; }
        public DateTime Encoded_Date { get; set; }
        public int? LastChanged_By { get; set; }
        public DateTime? LastChanged_Date { get; set; }
        public string Computer_Name { get; set; }

        public int TotalRows { get; set; }
        public int TotalPage { get; set; }
        public string Message_Code { get; set; }
        public string EncodedByName { get; set; }
        public string LastChangedByName { get; set; }

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

        ~CommonSchema()
        {
            Dispose(false);
        }

        #endregion
    }
}
