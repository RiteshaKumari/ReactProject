using Mybackend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", builder =>
        builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()); // Ensure credentials are allowed if needed
});

// Register Utility service
builder.Services.AddScoped<Utility>();

// Register ChatHub for SignalR
builder.Services.AddSignalR();

// Add Controllers
builder.Services.AddControllers();

// Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
}

// Use HTTPS, Static Files, and CORS policy
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting(); // Ensure routing is set up before middleware that depends on it

app.UseCors("AllowLocalhost3000");
app.UseAuthorization();

// Map controllers and SignalR hubs
app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

app.MapFallbackToFile("index.html");

app.Run();
