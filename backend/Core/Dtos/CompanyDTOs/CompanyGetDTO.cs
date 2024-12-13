using backend.Core.Dtos.JobDTOs;
using backend.Core.Enums;

namespace backend.Core.Dtos.CompanyDTOs
{
    public class CompanyGetDTO
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public DateTime CreateAt { get; set; }
        public List<JobGetDTO> Jobs { get; set; }

    }
}
