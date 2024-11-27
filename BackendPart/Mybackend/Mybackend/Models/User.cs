using System.ComponentModel.DataAnnotations;

namespace Mybackend.Models
{
    public class User
    {
        [Required(ErrorMessage = "Message is required.")]
        [StringLength(500, ErrorMessage = "Message cannot exceed 500 characters.")]
        public string Msg { get; set; } // Changed property to "Msg" as per naming convention

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }
    }
}