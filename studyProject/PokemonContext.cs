using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using studyProject.Models;

namespace studyProject
{
    public class PokemonContext : DbContext
    {
        public PokemonContext(DbContextOptions<PokemonContext> options) : base(options) { }

        public DbSet<PokemonModel> Pokemons => Set<PokemonModel>();
        public DbSet<PokemonUser> PokemonUsers => Set<PokemonUser>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PokemonUser>()
                .HasMany(u => u.Pokemons)
                .WithMany(p => p.Owners)
                .UsingEntity<Dictionary<string, object>>(
                    "UserPokemons",
                    j => j.HasOne<PokemonModel>().WithMany().HasForeignKey("PokemonId").OnDelete(DeleteBehavior.Cascade),
                    j => j.HasOne<PokemonUser>().WithMany().HasForeignKey("PokemonUserId").OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("PokemonUserId", "PokemonId");
                        j.ToTable("UserPokemons");
                    });

            modelBuilder.Entity<PokemonUser>()
                .HasIndex(u => u.AppUserId)
                .IsUnique();
        }
    
    }

    public class AuthDbContext : IdentityDbContext<AppUserModel>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }
    }
}
