using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using Accord.MachineLearning;
using Accord.Statistics.Models.Regression.Linear;
using WWA_CORE.Persistent.Context;

namespace WWA_CORE.Utilities
{
    public class EmployeeTrainingData
    {
        public int EmployeeID { get; set; }
        public double EnergyAtWork { get; set; }
        public double FocusAtWork { get; set; }
        public double NegativeEmotions { get; set; }
        public double PositiveEmotions { get; set; }
        public double Productivity { get; set; }
    }
    class EmployeePredictor
    {
        //private List<tbl_EMP_DailyCheckIn> employeeTrainingData;

        // Training data: EnergyAtWork, FocusAtWork, NegativeEmotions, PositiveEmotions, Productivity
        private double[][] inputs = {
            new double[] { 5, 4, 4, 2 },
            new double[] { 4, 4, 4, 2 },
            new double[] { 3, 3, 3, 3 },
            new double[] { 3, 4, 3, 2 },
            new double[] { 3, 4, 3, 4 },
            new double[] { 3, 4, 3, 3 },
            new double[] {4,4,4,4},
            new double[] {5,4,5,1},
            new double[] {3,3,3,3},
            new double[] {1,3,2,4},
        };

        private double[] outputs = {
                40,  // Example productivity for the first set of inputs
                100,80,100,80,60,40,80,40,0// Corresponding productivity for each set of inputs
        };

        private MultipleLinearRegression regression;
        public EmployeePredictor()
        {
            //using (var context = new WWAEntities())
            //{
            //    employeeTrainingData = context.tbl_EMP_DailyCheckIn.Where(x => x.EmployeeId == 1011).ToList();
            //}

            //int rows = employeeTrainingData.Count;
            //double[][] trainingInputs = new double[rows][];
            //double[] trainingOutputs = new double[rows];
            //for (int i = 0; i < rows; i++)
            //{
            //    inputs[i] = new double[] {
            //    (double)employeeTrainingData[i].EnergyAtWork_int,
            //    (double)employeeTrainingData[i].FocusAtWork_int,
            //    (double)employeeTrainingData[i].NegativeEmotions_int,
            //    (double)employeeTrainingData[i].PositiveEmotions_int
            //};

            //    outputs[i] = (double)employeeTrainingData[i].Productivity;
            //}

            regression = new MultipleLinearRegression();
            var teacher = new OrdinaryLeastSquares();
            regression = teacher.Learn(inputs, outputs);
            //regression = teacher.Learn(trainingInputs, trainingOutputs);
        }

        public double PredictProductivity(double energy, double focus, double negEmotions, double posEmotions)
        {
            double[] input = { energy, focus, negEmotions, posEmotions };
            return regression.Transform(input);
        }
    }

    public class AlgorithmHandler :IDisposable
    {
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