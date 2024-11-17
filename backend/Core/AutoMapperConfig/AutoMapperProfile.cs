﻿using AutoMapper;
using backend.Core.Dtos.CandidateDTOs;
using backend.Core.Dtos.CompanyDTOs;
using backend.Core.Dtos.JobDTOs;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CompanyCreateDTO, Company>();
            CreateMap<Company, CompanyGetDTO>();

            CreateMap<JobCreateDTO, Job>();
            CreateMap<Job, JobGetDTO>().ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company.Name));

            CreateMap<CandidateCreateDTO, Candidate>();
            CreateMap<Candidate, CandidateGetDTO>().ForMember(dest => dest.JobName, opt => opt.MapFrom(src => src.Job.Title));
        }
    }
}
