using backend.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options) { }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Candidate> Candidates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // One-to-many relation between Company and Job
            modelBuilder.Entity<Company>().HasMany(company => company.Jobs).WithOne(job => job.Company).HasForeignKey(job => job.CompanyId);
            // One-to-many relation between Job and Candidate
            modelBuilder.Entity<Job>().HasMany(job => job.Candidates).WithOne(candidate => candidate.Job).HasForeignKey(candidate => candidate.JobId);

        }
    }
}