using backend.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.Dtos.CandidateDTOs
{
    public class CandidateGetDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CoverLetter { get; set; }
        public string JobName { get; set; }
        public long JobId { get; set; }
    }
}
