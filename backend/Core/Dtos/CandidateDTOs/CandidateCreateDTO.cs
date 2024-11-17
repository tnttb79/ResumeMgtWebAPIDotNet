using System.ComponentModel.DataAnnotations;

namespace backend.Core.Dtos.CandidateDTOs
{
    public class CandidateCreateDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CoverLetter { get; set; }
        public long JobId { get; set; }
        public IFormFile Resume { get; set; }
    }
}
