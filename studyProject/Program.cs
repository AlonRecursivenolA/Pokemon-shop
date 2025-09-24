using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using studyProject.Models; // AppUserModel, PokemonModel, PokemonContext
// אם AuthDbContext מוגדר אצלך באותו namespace studyProject אין צורך בעוד using

namespace studyProject
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // --- Controllers ---
            builder.Services.AddControllers();

            // --- Swagger (+JWT) ---
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                var jwtScheme = new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "Paste your JWT here."
                };
                c.AddSecurityDefinition("Bearer", jwtScheme);
                c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    { jwtScheme, Array.Empty<string>() }
                });
            });

            // --- DbContexts ---
            // קונטקסט הפוקימונים (נשאר כמו אצלך)
            builder.Services.AddDbContext<PokemonContext>(opt =>
                opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

            builder.Services.AddDbContext<AuthDbContext>(opt =>
                opt.UseSqlServer(builder.Configuration.GetConnectionString("default")));

            //builder.Services.AddDbContext<PokemonUserDbContext>(opt =>
            //    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));


            // --- Identity (מחובר ל-AuthDbContext) ---
            builder.Services
                .AddIdentity<AppUserModel, IdentityRole>(opt =>
                {
                    // הקלות לפיתוח
                    opt.Password.RequireDigit = false;
                    opt.Password.RequiredLength = 6;
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.Password.RequireUppercase = false;
                    opt.Password.RequireLowercase = false;
                    opt.User.RequireUniqueEmail = false;
                })
                .AddEntityFrameworkStores<AuthDbContext>() // <--- חשוב: לא PokemonContext
                .AddDefaultTokenProviders();

            // --- JWT ---
            var jwt = builder.Configuration.GetSection("Jwt");
            var keyBytes = Encoding.UTF8.GetBytes(jwt["Key"]!); // חשוב: 32+ תווים

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false; // בפיתוח
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwt["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwt["Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

            // --- CORS לאנגולר ---
            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("ng", p => p
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
            });

            var app = builder.Build();

            // --- Swagger ---
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // סדר חשוב: CORS -> Authentication -> Authorization
            app.UseCors("ng");
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            // --- מיגרציות + Seeding ---
            using (var scope = app.Services.CreateScope())
            {
                // מיגרציות ל-Identity (AuthDbContext)
                var authDb = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
                //authDb.Database.Migrate();

                // מיגרציות + seeding לפוקימונים (PokemonContext)
                var db = scope.ServiceProvider.GetRequiredService<PokemonContext>();
                db.Database.Migrate();

                if (!db.Pokemons.Any())
                {
                    db.Pokemons.AddRange(
                        new PokemonModel { Name = "Charmander", Power = "Fire", Strength = 15},
                        new PokemonModel { Name = "Squirtle", Power = "Water", Strength = 12},
                        new PokemonModel { Name = "Bulbasaur", Power = "Grass", Strength = 18}
                    );
                    db.SaveChanges();
                }
            }
            app.UseStaticFiles();
            app.Run();
        }
    }
}
