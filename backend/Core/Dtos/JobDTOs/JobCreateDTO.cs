using backend.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.Dtos.JobDTOs
{
    public class JobCreateDTO
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public JobLevel JobLevel { get; set; }
        public long? CompanyId { get; set; }
    }
}
