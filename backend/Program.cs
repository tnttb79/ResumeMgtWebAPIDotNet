using backend.Core.AutoMapperConfig;
using backend.Core.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add DB config to the application
builder.Services.AddDbContext<ApplicationDBContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("localhost")));
// Add AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
