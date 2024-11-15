using AutoMapper;
using AutoMapper.Configuration.Annotations;
using backend.Core.Context;
using backend.Core.Dtos.JobDTOs;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public JobController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD
        // Create
        [HttpPost]
        public async Task<ActionResult<JobGetDTO>> CreateJob([FromBody] JobCreateDTO jobCreateDTO)
        {
            if (!ModelState.IsValid)
            {
                // Custom error response with validation messages
                return BadRequest(ModelState);
            }
            Company? existingCompany = await _context.Companies.FirstOrDefaultAsync(company => company.ID == jobCreateDTO.CompanyId);
            if (existingCompany == null)
            {
                return NotFound($"Company with ID: {jobCreateDTO.CompanyId} not found");
            }
            Job job = _mapper.Map<Job>(jobCreateDTO);
            await _context.Jobs.AddAsync(job);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetJobById", new { id = job.ID }, _mapper.Map<JobGetDTO>(job));
        }

        // Read
        // Get all jobs
        [HttpGet]
        public async Task<ActionResult<List<JobGetDTO>>> GetAllJobs()
        {
            List<Job> jobs = await _context.Jobs.Include(job => job.Company).ToListAsync();
            List<JobGetDTO> jobGetDTOs = _mapper.Map<List<JobGetDTO>>(jobs);
            return Ok(jobGetDTOs);
        }

        // Get job by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<JobGetDTO>> GetJobById(long id)
        {
            Job? job = await _context.Jobs.Include(j => j.Company).FirstOrDefaultAsync(j => j.ID == id);
            if (job == null)
            {
                return NotFound($"Job with ID: {id} not found");
            }
            return Ok(_mapper.Map<JobGetDTO>(job));
        }
    }
}

