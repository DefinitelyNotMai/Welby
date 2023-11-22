using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Accord.MachineLearning;
using Accord.Statistics.Models.Regression.Linear;
using WWA_CORE.Constants;
using WWA_CORE.Persistent.Context;
using WWA_CORE.Persistent.ViewModel.Algo;

namespace WWA_CORE.Utilities
{
    public class EmployeeTrainingData : CommonSchema
    {
        public int EmployeeId { get; set; }
        public double EnergyAtWork { get; set; }
        public double FocusAtWork { get; set; }
        public double NegativeEmotions { get; set; }
        public double PositiveEmotions { get; set; }
        public double Productivity { get; set; }
        public double Prediction { get; set; }

        public EmployeeTrainingData()
        {
            //empty constructor
        }

        public EmployeeTrainingData(int employeeId, double energyAtWork, double focusAtWork, double positiveEmotions, double negativeEmotions)
        {
            EmployeeId = employeeId;
            EnergyAtWork = energyAtWork;
            FocusAtWork = focusAtWork;
            NegativeEmotions = negativeEmotions;
            PositiveEmotions = positiveEmotions;
        }
    }
    
    class EmployeePredictor
    {
        // Training data: EnergyAtWork, FocusAtWork, NegativeEmotions, PositiveEmotions, Productivity
        private double[][] inputs = {
            new double[] { 5, 4, 4, 2 },
            new double[] { 4, 4, 4, 2 },
            new double[] { 3, 3, 3, 3 },
            new double[] { 3, 4, 3, 2 },
            new double[] { 3, 4, 3, 4 },
            new double[] { 3, 4, 3, 3 },
            new double[] { 4, 4, 4, 4 },
            new double[] { 5, 4, 5, 1 },
            new double[] { 3, 3, 3, 3 },
            new double[] { 1, 3, 2, 4 },
        };

        private double[] outputs = {
                40,100,80,100,80,60,40,80,40,0
        };

        private MultipleLinearRegression regression;
        public EmployeePredictor()
        {
            regression = new MultipleLinearRegression();
            var teacher = new OrdinaryLeastSquares();
            regression = teacher.Learn(inputs, outputs);
        }

        public double PredictProductivity(double energy, double focus, double negEmotions, double posEmotions)
        {
            double[] input = { energy, focus, negEmotions, posEmotions };
            return regression.Transform(input);
        }
        //
        //
        //
        //
        //
        //
        //
        private IEnumerable<EmployeeTrainingData> employeeTrainingData;
        public IEnumerable<EmployeeTrainingData> GetTrainingSet(EmployeeTrainingData employeeTrainingData)
        {
            var query = new SqlQueryObject
            {
                ProcedureName = PROCEDURE_NAME.PROC_EMP_DAILYCHECKIN_GET_EMPLOYEE,
                ConnectionString = WWA_COREDefaults.DEFAULT_WWA_CORE_CONNECTION_STRING,
                Parameters = new SqlParameter[]
                {
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_GET_TRAININGSET_EMPLOYEEID, employeeTrainingData.EmployeeId),
                    new SqlParameter(PROCEDURE_PARAMETERS.PARA_COMMON_ACTIVE, employeeTrainingData.Active)
                }
            };
            query.Execute();

            var ReturnedList = query.Result.Tables[0].AsEnumerable().Select(row => new EmployeeTrainingData()
            {
                EnergyAtWork = Convert.ToDouble(row["EnergyAtWork_int"]),
                FocusAtWork = Convert.ToDouble(row["FocusAtWork_int"]),
                PositiveEmotions = Convert.ToDouble(row["PositiveEmotions_int"]),
                NegativeEmotions = Convert.ToDouble(row["NegativeEmotions_int"]),
                Productivity = Convert.ToDouble(row["Productivity"])
            }).ToList();
            query.Dispose();
            employeeTrainingData.Dispose();
            return ReturnedList;
        }

    public class AlgorithmHandler :IDisposable
    {
        public float UseAlgo(int e_id, int eaw, int faw, int pe, int ne)
        {
            EmployeeTrainingData employee = new EmployeeTrainingData(
                e_id,
                Convert.ToDouble(eaw),
                Convert.ToDouble(faw),
                Convert.ToDouble(pe),
                Convert.ToDouble(ne));

            EmployeePredictor predictor = new EmployeePredictor();

            IEnumerable<EmployeeTrainingData> employeeTrainingData = predictor.GetTrainingSet(employee);
            var trainingData = employeeTrainingData.ToList();

            

            if (employeeTrainingData == null ||  trainingData.Count < 4)
            {
                // Example prediction for an employee
                double predictedProductivity = predictor.PredictProductivity(
                    Convert.ToDouble(eaw),
                    Convert.ToDouble(faw),
                    Convert.ToDouble(pe),
                    Convert.ToDouble(ne));

                return Convert.ToSingle(predictedProductivity);
            } else
            {
                double[][] trainingInputs = new double[trainingData.Count][];
                double[] trainingOutputs = new double[trainingData.Count];

                for (int i = 0; i < trainingData.Count; i++)
                {
                    trainingInputs[i] = new double[] {
                    trainingData[i].EnergyAtWork,
                    trainingData[i].FocusAtWork,
                    trainingData[i].NegativeEmotions,
                    trainingData[i].PositiveEmotions
                };

                    trainingOutputs[i] = (double)trainingData[i].Productivity;
                }
                MultipleLinearRegression regression = new MultipleLinearRegression();
                var teacher = new OrdinaryLeastSquares();
                regression = teacher.Learn(trainingInputs, trainingOutputs);
                double[] input = {Convert.ToDouble(eaw),
                Convert.ToDouble(faw),
                Convert.ToDouble(pe),
                Convert.ToDouble(ne)};

                return Convert.ToSingle(regression.Transform(input));
            }
        }

        public float ImplementAlgo(int eaw, int faw, int pe, int ne)
        {   
            EmployeePredictor predictor = new EmployeePredictor();

            // Example prediction for an employee
            double predictedProductivity = predictor.PredictProductivity(
                Convert.ToDouble(eaw),
                Convert.ToDouble(faw),
                Convert.ToDouble(pe),
                Convert.ToDouble(ne));

            return Convert.ToSingle(predictedProductivity);
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