using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos;
using backend.Core.Dtos.CompanyDTOs;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public CompanyController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        // CRUD

        // Create
        [HttpPost]
        public async Task<ActionResult<CompanyGetDTO>> CreateCompany([FromBody] CompanyCreateDTO newCompany)
        {
            Company? existingCompany = await _context.Companies.FirstOrDefaultAsync(company => company.Name == newCompany.Name);
            if (existingCompany != null)
            {
                return Conflict($"A company with the name: '{newCompany.Name}' is already exist");
            }
            var company = _mapper.Map<Company>(newCompany);
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCompany", new { id = company.ID }, _mapper.Map<CompanyGetDTO>(company));
        }
        // Read
        [HttpGet]
        public async Task<ActionResult<List<CompanyGetDTO>>> GetAllCompanies()
        {
            List<Company> companies = await _context.Companies.ToListAsync();
            List<CompanyGetDTO> companiesDTO = _mapper.Map<List<CompanyGetDTO>>(companies);
            return Ok(companiesDTO);
        }
        //public async Task<ActionResult<Companyget>>
        // Update

        // Delete

    }
}
