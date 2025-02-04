using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.CandidateDTOs;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    /// <summary>
    /// Controller for managing candidates and their related operations.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        private readonly string _uploadsFolder;
        public CandidateController(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            // check if the directory exists, if not create it
            if (!Directory.Exists(_uploadsFolder))
            {
                Directory.CreateDirectory(_uploadsFolder);
            }
        }
        // CRUD

        /// <summary>
        /// Create a new candidate and upload resume.
        /// </summary>
        /// <param name="newCandidate">Candidate information and resume file.</param>
        /// <returns>Returns the created candidate's details.</returns>
        [HttpPost]
        public async Task<ActionResult<CandidateGetDTO>> CreateCandidate([FromForm] CandidateCreateDTO newCandidate)
        {
            Candidate? candidate = _context.Candidates.FirstOrDefault(candidate => candidate.Email == newCandidate.Email);
            if (candidate != null)
            {
                return Conflict($"A candidate with the email: '{newCandidate.Email}' is already exist");
            }
            Job? existingJob = await _context.Jobs.FirstOrDefaultAsync(job => job.ID == newCandidate.JobId);
            if (existingJob == null)
            {
                return NotFound($"Job with ID: {newCandidate.JobId} not found");
            }
            if (newCandidate.Resume.Length > 5 * 1024 * 1024)
            {
                return BadRequest("File is too large");
            }
            if (newCandidate.Resume.ContentType != "application/pdf")
            {
                return BadRequest("File is not a pdf");
            }
            string filePath = await SaveFile(newCandidate.Resume);
            Candidate newCandidateEntity = _mapper.Map<Candidate>(newCandidate);
            newCandidateEntity.ResumeUrl = filePath;
            await _context.Candidates.AddAsync(newCandidateEntity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCandidateById), new { id = newCandidateEntity.ID }, _mapper.Map<CandidateGetDTO>(newCandidateEntity));
        }

        /// <summary>
        /// Helper method to save the uploaded file.
        /// </summary>
        private async Task<string> SaveFile(IFormFile file)
        {
            string fileName = $"{Guid.NewGuid()}_{file.FileName}";
            string filePath = Path.Combine(_uploadsFolder, fileName);
            using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return filePath;

        }

        /// <summary>
        /// Get all candidates associated with a specific job.
        /// </summary>
        /// <param name="jobId">Job ID.</param>
        /// <returns>List of candidates related to the specified job.</returns>
        [HttpGet("job/{jobId}")]
        public async Task<ActionResult<List<CandidateGetDTO>>> GetAllCandidatesByJobId(long jobId)
        {
            List<Candidate> candidates = await _context.Candidates.Include(candidate => candidate.Job).Where(candidate => candidate.JobId == jobId).ToListAsync();
            if (candidates.Count == 0)
            {
                return NotFound($"No candidates found for job with ID: {jobId}");
            }
            List<CandidateGetDTO> candidatesDTO = _mapper.Map<List<CandidateGetDTO>>(candidates);
            return Ok(candidatesDTO);
        }

        /// <summary>
        /// Get a candidate by their ID.
        /// </summary>
        /// <param name="id">Candidate ID.</param>
        /// <returns>Returns the candidate details.</returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<CandidateGetDTO>> GetCandidateById(long id)
        {
            Candidate? candidate = await _context.Candidates.Include(candidate => candidate.Job).FirstOrDefaultAsync(candidate => candidate.ID == id);
            if (candidate == null)
            {
                return NotFound($"Candidate with ID: {id} not found");
            }
            return Ok(_mapper.Map<CandidateGetDTO>(candidate));
        }

        /// <summary>
        /// Download the resume file of a candidate by their ID.
        /// </summary>
        /// <param name="id">Candidate ID.</param>
        /// <returns>The candidate's resume as a file download.</returns>
        [HttpGet("download/{id}")]
        public async Task<IActionResult> Download(long id)
        {
            Candidate? existingCandidate = await _context.Candidates.FindAsync(id);
            if (existingCandidate == null)
            {
                return NotFound($"File for candidate with ID: {id} not found");
            }
            string filePath = existingCandidate.ResumeUrl;

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound($"File for candidate with ID: {id} not found");
            }

            // logic to read to get the file and return it
            byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);

            string contentType = "application/pdf";

            return File(fileBytes, contentType, Path.GetFileName(filePath));
        }

        /// <summary>
        /// Get all candidates with their job information.
        /// </summary>
        /// <returns>List of all candidates with their job details.</returns>
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<CandidateGetDTO>>> GetAllCandidates()
        {
            var candidates = await _context.Candidates
                .Include(c => c.Job)
                .ThenInclude(j => j.Company)
                .OrderByDescending(c => c.CreateAt) 
                .ToListAsync();

            if (!candidates.Any())
            {
                return Ok(new List<CandidateGetDTO>());
            }

            var candidatesDTO = _mapper.Map<List<CandidateGetDTO>>(candidates);
            return Ok(candidatesDTO);
        }

        // Update

        // Delete

    }
}

