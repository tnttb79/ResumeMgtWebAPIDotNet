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
        [Required(ErrorMessage ="hey you need to input companyID you dumb ass")]
        public long? CompanyId { get; set; }
    }
}
