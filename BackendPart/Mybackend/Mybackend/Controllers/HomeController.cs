using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Mybackend.Models;
using System.Linq;
using System.Data;

namespace testing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly Utility ul;
        public HomeController(Utility dataService)
        {
            ul = dataService;
        }

        [HttpGet("getCategory")]
        public IActionResult GetCategory()
        {
            DataSet DSA = ul.Fn_DataSet("pr_getCategory");

            if (DSA.Tables.Count > 0 && DSA.Tables[0].Rows.Count > 0)
            {
                var Category = DSA.Tables[0];

                var Ress = Category.AsEnumerable().Select(s => new Category
                {
                    CategoryID = s.Field<int>("CategoryID"),
                    CategoryName = s.Field<string>("CategoryName"),
                    Courses = s.Field<string>("Courses")
                }).ToList();

                return Ok(Ress);
            }
            else
            {
                return NotFound(new { message = "Course details not found." });
            }
        }



        [HttpGet("getTopSixCourse")]
        public IActionResult GetTopSixCourse()
        {
            try
            {
                DataSet DSA = ul.Fn_DataSet("pr_getTopSixCourse");

                if (DSA.Tables.Count > 0 && DSA.Tables[0].Rows.Count > 0)
                {
                    var Category = DSA.Tables[0];

                    var Ress = Category.AsEnumerable().Select(s => new Course
                    {
                        NoOfVideos = s.Field<int>("NoOfVideos"),
                        CourseID = s.Field<int>("CourseID"),
                        NoOfStudentEnrolled = s.Field<int>("NoOfStudentEnrolled"),
                        Rating = s.Field<int>("Rating"),
                        Price = s.Field<decimal>("Price"),
                        Instructor = s.Field<string>("Instructor"),
                        Image = s.Field<string>("Image"),
                        CategoryName = s.Field<string>("CategoryName"),
                        CourseName = s.Field<string>("CourseName")
                    }).ToList();

                    return Ok(Ress);
                }
                else
                {
                    return NotFound(new { message = "Top six courses not found." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving courses.", error = ex.Message });
            }
        }


        [HttpGet("getCourseDetail/{id}/{coursename}")]
        public IActionResult GetCourseDetail(int id, string coursename)
        {
            try
            {
                SqlParameter[] parameters = {
                  new SqlParameter("@courseId", id),
                   new SqlParameter("@coursename", coursename)
            };

                DataSet ds = ul.Fn_DataSet("pr_getCourseDetail", parameters);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    var courses = ds.Tables[0].AsEnumerable().Select(row => new Course
                    {
                        NoOfVideos = row.Field<int>("NoOfVideos"),
                        CourseID = row.Field<int>("CourseID"),
                        NoOfStudentEnrolled = row.Field<int>("NoOfStudentEnrolled"),
                        Rating = row.Field<int>("Rating"),
                        Price = row.Field<decimal>("Price"),
                        Instructor = row.Field<string>("Instructor"),
                        Image = row.Field<string>("Image"),
                        CategoryName = row.Field<string>("CategoryName"),
                        CourseName = row.Field<string>("CourseName"),
                        Description = row.Field<string>("Description"),
                        Features = row.Field<string>("Features"),
                        Benefits = row.Field<string>("Benefits"),
                        Duration = row.Field<string>("Duration"),
                        Certification = row.Field<string>("Certification"),
                        Language = row.Field<string>("Language"),
                        InstructorMobile = row.Field<string>("InstructorMobile"),
                        InstructorEmail = row.Field<string>("InstructorEmail"),
                        InstructorName = row.Field<string>("InstructorName"),
                        InstructorLocation = row.Field<string>("InstructorLocation")
                    }).ToList();

                    return Ok(courses);
                }
                else
                {
                    return NotFound(new { message = "Course details not found." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching course details.", error = ex.Message });
            }
        }

        [HttpGet("getAllCourse")]
        public IActionResult GetAllCourse()
        {
            try
            {
                DataSet DSA = ul.Fn_DataSet("pr_getAllCourses");

                if (DSA.Tables.Count > 0 && DSA.Tables[0].Rows.Count > 0)
                {
                    var Category = DSA.Tables[0];

                    var Ress = Category.AsEnumerable().Select(s => new Course
                    {
                        NoOfVideos = s.Field<int>("NoOfVideos"),
                        CourseID = s.Field<int>("CourseID"),
                        NoOfStudentEnrolled = s.Field<int>("NoOfStudentEnrolled"),
                        Rating = s.Field<int>("Rating"),
                        Price = s.Field<decimal>("Price"),
                        Instructor = s.Field<string>("Instructor"),
                        Image = s.Field<string>("Image"),
                        CategoryName = s.Field<string>("CategoryName"),
                        CourseName = s.Field<string>("CourseName")
                    }).ToList();

                    return Ok(Ress);
                }
                else
                {
                    return NotFound(new { message = "No courses found." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving courses.", error = ex.Message });
            }
        }

        [HttpGet("GetAllTeacher")]
        public IActionResult GetAllTeacher()
        {
            try
            {
                DataSet DSA = ul.Fn_DataSet("getTeacher");

                if (DSA.Tables.Count > 0 && DSA.Tables[0].Rows.Count > 0)
                {
                    var Category = DSA.Tables[0];

                    var Ress = Category.AsEnumerable().Select(s => new Teacher
                    {
                        Students = s.Field<int>("Students"),
                        Rating = s.Field<int>("InstructorRating"),
                        InstructorID = s.Field<int>("InstructorID"),

                        CategoryName = s.Field<string>("CategoryName"),
                        InstructorName = s.Field<string>("InstructorName"),
                        InstructorImage = s.Field<string>("InstructorImage")
                    }).ToList();

                    return Ok(Ress);
                }
                else
                {
                    return NotFound(new { message = "No teacher found." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving courses.", error = ex.Message });
            }
        }

        [HttpGet("GetTeacherDetail/{id}")]
        public IActionResult GetTeacherDetail(int id)
        {
            try
            {
                SqlParameter[] parameters = {
            new SqlParameter("@teacherId", id)
         
        };
                DataSet DSA = ul.Fn_DataSet("GetTeacherDetail", parameters);

                if (DSA.Tables.Count > 0 && DSA.Tables[0].Rows.Count > 0)
                {
                    var Category = DSA.Tables[0];

                    var Ress = Category.AsEnumerable().Select(s => new Teacher
                    {
                        Students = s.Field<int>("Students"),
                        Rating = s.Field<int>("InstructorRating"),
                        InstructorID = s.Field<int>("InstructorID"),
                        CategoryName = s.Field<string>("CategoryName"),
                        InstructorName = s.Field<string>("InstructorName"),
                        TeacherDetail = s.Field<string>("TeacherDetail"),
                        InstructorLocation = s.Field<string>("InstructorLocation"),
                        InstructorEmail = s.Field<string>("InstructorEmail"),
                        InstructorImage = s.Field<string>("InstructorImage"),
                        InstructorMobile = s.Field<string>("InstructorMobile")
                    }).FirstOrDefault();

                    return Ok(Ress);
                }
                else
                {
                    return NotFound(new { message = "No teacher found." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving courses.", error = ex.Message });
            }
        }


        [HttpPost("SaveMsg")]
        public IActionResult SaveMsg([FromBody] User model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    SqlParameter[] updateParameters = {
                                new SqlParameter("@name", model.Name),
                                new SqlParameter("@email", model.Email),
                                new SqlParameter("@msg", model.Msg)
                            };
                    int value = ul.Func_ExecuteNonQuery("saveUserMsg", updateParameters);
                    if (value > 0)
                    {
                        ModelState.Clear();
                        return Ok(new { message = "Successfully Saved!" });
                      
                    }
                    else
                    {
                        return BadRequest(new { message = "Value not saved !" });
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = ex.Message });
                }


            }
            else
            {
                return BadRequest(new { message = "Please enter valid data!" });
            }
        }

        [HttpPost("saveAdminDetail")]
        public IActionResult saveAdminDetail([FromBody] Admin model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    SqlParameter[] updateParameters = {
                                new SqlParameter("@name", model.Name),
                                new SqlParameter("@email", model.Email),
                                new SqlParameter("@pass", model.Password)
                            };
                    int value = ul.Func_ExecuteNonQuery("saveAdminDetail", updateParameters);
                    if (value > 0)
                    {
                        ModelState.Clear();
                        return Ok(new { message = "Successfully Saved!" });

                    }
                    else
                    {
                        return BadRequest(new { message = "Value not saved !" });
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = ex.Message });
                }
            }
            else
            {
                return BadRequest(new { message = "Please enter valid data!" });
            }
        }

        [HttpPost("AdminLogin")]
        public IActionResult AdminLogin([FromBody] Admin model)
        {
            if (model.Email != null && model.Password != null)
            {
                try
                {
                    SqlParameter[] updateParameters = {
                                new SqlParameter("@email", model.Email),
                                new SqlParameter("@pass", model.Password)
                            };
                    var value = ul.Func_ExecuteScalar("AdminLogin", updateParameters);
                    if (value != null)
                    {
                        ModelState.Clear();
                        return Ok(new { message = "Successfully Login!" });

                    }
                    else
                    {
                        return BadRequest(new { message = "Update first !" });
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = ex.Message });
                }
            }
            else
            {
                return BadRequest(new { message = "Please enter valid data!" });
            }
        }

    }
}