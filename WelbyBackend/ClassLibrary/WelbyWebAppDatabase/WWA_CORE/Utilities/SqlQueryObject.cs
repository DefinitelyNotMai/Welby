using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Utilities
{
    public class SqlQueryObject : IDisposable
    {
        public string ConnectionString { get; set; }
        public string ProcedureName { get; set; }
        public SqlParameter[] Parameters { get; set; }
        public DataSet Result { get; private set; } = new DataSet();
        public bool OnFailure { get; private set; } = false;
        public string Problem { get; private set; }
        public Exception Exception { get; private set; }
        public void Execute()
        {
            if (string.IsNullOrEmpty(ProcedureName))
            {
                OnFailure = true;
                Problem = "Stored Procedure name not defined.";
                return;
            }

            var sqlConnection = new SqlConnection(ConnectionString);
            var sqlCommand = new SqlCommand();

            try
            {
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = ProcedureName;
                sqlCommand.CommandType = CommandType.StoredProcedure;

                if (Parameters != null)
                    sqlCommand.Parameters.AddRange(Parameters);

                var sqlAdapter = new SqlDataAdapter(sqlCommand);
                sqlAdapter.Fill(Result);

                OnFailure = Result.Tables.Count.Equals(0);
                
            } 
            catch (Exception ex) 
            {
                OnFailure = true;
                Problem = ex.Message;
                Exception = ex;
            }
            
        }

        public async Task ExecuteAsync()
        {
            if (string.IsNullOrEmpty(ProcedureName))
            {
                OnFailure = true;
                Problem = "Stored Procedure name not defined.";
                return;
            }
            var sqlConnection = new SqlConnection(ConnectionString);
            var sqlCommand = new SqlCommand();

            try
            {
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandText = ProcedureName;
                sqlCommand.CommandType = CommandType.StoredProcedure;

                if (Parameters != null)
                    sqlCommand.Parameters.AddRange(Parameters);

                var sqlAdaptor = new SqlDataAdapter(sqlCommand);

                await Task.Run(() =>
                {
                    sqlAdaptor.Fill(Result);
                    OnFailure = Result.Tables.Count.Equals(0);
                });
            }
            catch (Exception ex)
            {
                OnFailure = true;
                Problem = ex.Message;
                Exception = ex;
            }
            finally
            {
                sqlConnection.Dispose();
                sqlCommand.Dispose();
            }
        }

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

        ~SqlQueryObject()
        {
            Dispose(false);
        }

    }
}
