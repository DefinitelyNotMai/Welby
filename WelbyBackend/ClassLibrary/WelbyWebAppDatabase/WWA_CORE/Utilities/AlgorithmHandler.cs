using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Accord.Statistics.Models.Regression.Linear;
using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;
using Microsoft.ML.Transforms;
using WWA_CORE.Constants;
using WWA_CORE.Persistent.ViewModel.Algo;

namespace WWA_CORE.Utilities
{
    public class EmployeeData
    {
        [LoadColumn(0)]
        public float EnergyAtWork { get; set; }

        [LoadColumn(1)]
        public float FocusAtWork { get; set; }

        [LoadColumn(2)]
        public float PositiveEmotions { get; set; }

        [LoadColumn(3)]
        public float NegativeEmotions { get; set; }

        [LoadColumn(4)]
        public float Productivity { get; set; }    
    }

    

    public class AlgorithmHandler :IDisposable
    {
        public float ApplyAlgorithm(int e_id, int eaw, int faw, int pe, int ne)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_DAILYCHECKIN_GET_EMPLOYEE,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_CMP_DAILYCHECKIN_GET_EMPLOYEEID, e_id),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, true)
                }
            };

            query.Execute();

            var mlContext = new MLContext();
            var dataList = mlContext.Data.LoadFromEnumerable(query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeData()
            {
                EnergyAtWork = Convert.ToSingle(row["EnergyAtWork_int"]),
                FocusAtWork = Convert.ToSingle(row["FocusAtWork_int"]),
                PositiveEmotions = Convert.ToSingle(row["PositiveEmotions_int"]),
                NegativeEmotions = Convert.ToSingle(row["NegativeEmotions_int"]),
                Productivity = Convert.ToSingle(row["Productivity"])
            }));

            // Define the training pipeline
            var pipeline = mlContext.Transforms.Concatenate("Features", nameof(EmployeeData.EnergyAtWork),
                nameof(EmployeeData.FocusAtWork),
                nameof(EmployeeData.PositiveEmotions),
                nameof(EmployeeData.NegativeEmotions))
                .Append(mlContext.Regression.Trainers.Sdca(labelColumnName: nameof(EmployeeData.Productivity)));

            // Train the model
            var model = pipeline.Fit(dataList);

            var newEmployee = new EmployeeData
            {
                EnergyAtWork = Convert.ToSingle(eaw), // Replace with actual values
                FocusAtWork = Convert.ToSingle(faw), // Replace with actual values
                PositiveEmotions = Convert.ToSingle(pe), // Replace with actual values
                NegativeEmotions = Convert.ToSingle(ne) // Replace with actual values

            };

            // Make predictions using the trained model
            var predictionEngine = mlContext.Model.CreatePredictionEngine<EmployeeData, EmployeeData>(model);
            var prediction = predictionEngine.Predict(newEmployee);
            
            query.Dispose();
            return prediction.Productivity;
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

        ~AlgorithmHandler()
        {
            Dispose(false);
        }

        #endregion
    }
}
