using backend.Core.Entities;
using backend.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.Dtos.JobDTOs
{
    public class JobGetDTO
    {
        public long ID { get; set; }
        public string Title { get; set; }
        public JobLevel JobLevel { get; set; }
        public long CompanyId { get; set; }
        public string CompanyName { get; set; }

    }
}
