using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Mybackend.Models
{
    public class Utility
    {
        private readonly string _connectionString = "";
        private static readonly object LockObject = new object();

        // Constructor to inject configuration
        public Utility(IConfiguration configuration)
        {
            // Get the connection string from appsettings.json
            _connectionString = configuration.GetConnectionString("mycon");
        }

        #region DataSet
        public DataSet Fn_DataSet(string procedure, params SqlParameter[] sqlParameters)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using (SqlDataAdapter tda = new SqlDataAdapter("dbo." + procedure, con))
                {
                    tda.SelectCommand.CommandType = CommandType.StoredProcedure;
                    foreach (SqlParameter param in sqlParameters)
                    {
                        tda.SelectCommand.Parameters.Add(param);
                    }
                    DataSet ds = new DataSet();
                    lock (LockObject)
                    {
                        tda.Fill(ds);
                    }
                    return ds;
                }
            }
        }
        #endregion

        #region Data Reader
        public IDataReader Fn_DataReader(string procedure, params SqlParameter[] sqlParameters)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("dbo." + procedure, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (SqlParameter param in sqlParameters)
                    {
                        cmd.Parameters.Add(param);
                    }
                    con.Open();
                    return cmd.ExecuteReader();
                }
            }
        }
        #endregion

        #region DataTable
        public DataTable Fn_DataTable(string procedure)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using (SqlDataAdapter tda = new SqlDataAdapter("dbo." + procedure, con))
                {
                    tda.SelectCommand.CommandType = CommandType.StoredProcedure;
                    DataTable dt = new DataTable();
                    lock (LockObject)
                    {
                        tda.Fill(dt);
                    }
                    return dt;
                }
            }
        }

        public DataTable Fn_DataTable(string procedure, params SqlParameter[] sqlParameters)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using (SqlDataAdapter tda = new SqlDataAdapter("dbo." + procedure, con))
                {
                    tda.SelectCommand.CommandType = CommandType.StoredProcedure;
                    foreach (SqlParameter param in sqlParameters)
                    {
                        tda.SelectCommand.Parameters.Add(param);
                    }
                    DataTable dt = new DataTable();
                    lock (LockObject)
                    {
                        tda.Fill(dt);
                    }
                    return dt;
                }
            }
        }
        #endregion

        #region Execute Non Query
        public int Func_ExecuteNonQuery(string procedure, params SqlParameter[] sqlParameters)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("dbo." + procedure, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (SqlParameter param in sqlParameters)
                    {
                        cmd.Parameters.Add(param);
                    }
                    con.Open();
                    return cmd.ExecuteNonQuery();
                }
            }
        }
        #endregion

        #region Execute Scalar
        public object Func_ExecuteScalar(string procedure, params SqlParameter[] sqlParameters)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("dbo." + procedure, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    foreach (SqlParameter param in sqlParameters)
                    {
                        cmd.Parameters.Add(param);
                    }
                    con.Open();
                    return cmd.ExecuteScalar();
                }
            }
        }
        #endregion
    }
}
