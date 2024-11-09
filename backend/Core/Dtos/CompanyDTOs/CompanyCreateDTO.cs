using backend.Core.Entities;
using backend.Core.Enums;

namespace backend.Core.Dtos.CompanyDTOs
{
    public class CompanyCreateDTO
    {
        public string Name { get; set; }
        public CompanySize Size { get; set; }
    }
}
