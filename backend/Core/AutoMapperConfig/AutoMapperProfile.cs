using AutoMapper;
using backend.Core.Dtos.CompanyDTOs;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CompanyCreateDTO, Company>();
            CreateMap<Company, CompanyGetDTO>();
        }
    }
}
