using backend.Core.Enums;

namespace backend.Core.Dtos.CompanyDTOs
{
    public class CompanyGetDTO
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public CompanySize Size { get; set; }
        public DateTime CreateAt { get; set; }

    }
}
