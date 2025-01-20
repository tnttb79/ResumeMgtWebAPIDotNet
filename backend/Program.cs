using backend.Core.AutoMapperConfig;
using backend.Core.Context;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
// Config cor to allow local frontend origins
var AllowLocalFrontendOrigins = "_allowLocalFrontendOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowLocalFrontendOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
                      });
});
// Add DB config to the application
builder.Services.AddDbContext<ApplicationDBContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("localhost")));
// Add AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
// Add JsonStringEnumConverter
// Ignore cycles in JSON serialization
builder.Services.AddControllers()
      .AddJsonOptions(options =>
      {
          options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
          options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
      });
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Config swagger to accept descriptions from XML comments
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath, includeControllerXmlComments: true);
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(AllowLocalFrontendOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
