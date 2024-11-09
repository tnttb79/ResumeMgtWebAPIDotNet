using backend.Core.Enums;

namespace backend.Core.Entities
{
    public class Job : BaseEntity
    {
        public string Title { get; set; }
        public JobLevel JobLevel { get; set; }

        // Relations
        public Company Company { get; set; }
        // Foreign key
        public long CompanyId { get; set; }

        public ICollection<Candidate> Candidates { get; set; }
    }
}
