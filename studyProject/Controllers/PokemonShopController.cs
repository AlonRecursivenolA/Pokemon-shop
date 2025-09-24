using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using studyProject.Models;

namespace studyProject.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PokemonShopController : ControllerBase
    {

        private readonly PokemonContext _context;
        private readonly PokemonUser _user;

        public PokemonShopController(PokemonContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult> GetAllPokemons()
        {
            var list = await _context.Pokemons.AsNoTracking().ToListAsync();
            return Ok(list);
        }

        [HttpGet("pokemons/{id}")]
        public async Task<ActionResult> getPokemon(int id)
        {
            var pokemon = await _context.Pokemons.FindAsync(id);
            if(pokemon == null)
            {
                return NotFound();
            }
            return Ok(pokemon);
        }


    [HttpPost("claim/{id}")]
    public async Task<ActionResult> ClaimPokemon(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) // = sub
                   ?? User.FindFirstValue("sub");

        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var user = await _context.PokemonUsers
            .Include(u => u.Pokemons)
            .FirstOrDefaultAsync(u => u.AppUserId == userId);

        if (user is null) return NotFound("User not found");

        var pokemon = await _context.Pokemons.FindAsync(id);
        if (pokemon is null) return NotFound("Pokemon not found");

        if (user.Pokemons.Any(p => p.Id == id))
            return Conflict("Already owned");

        user.Pokemons.Add(pokemon);
        await _context.SaveChangesAsync();

        return Ok(new { pokemon.Id, pokemon.Name, pokemon.Power });
    }


    //[HttpGet("myPokemons")]
    //public async Task<ActionResult> showUsersPokemons()
    //{

    //}
    [HttpGet("myPokemons")]
        public async Task<ActionResult> GetMyPokemons()
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) // = sub
           ?? User.FindFirstValue("sub");

            if (string.IsNullOrEmpty(userId)) return Unauthorized();


            var user = await _context.PokemonUsers
            .Include(u => u.Pokemons)
            .FirstOrDefaultAsync(u => u.AppUserId == userId);

            if (user is null) return NotFound("User not found");



            var pokemons = await _context.PokemonUsers
                .Where(u => u.Name == user.Name)
                .SelectMany(u => u.Pokemons)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Strength
                })
                .ToListAsync();

            if (pokemons.Count == 0) 
                return NotFound("No Pokemons to display");

            return Ok(pokemons);
        }
        public record AddStrengthRequest(int Amount);


        [HttpPatch("{id}/addStrength")]
        public async Task<ActionResult> AddStrength(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? User.FindFirstValue("sub");
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            // מצא את הפוקימון ששייך למשתמש המחובר
            var pokemon = await _context.Pokemons
                .AsTracking()
                .SingleOrDefaultAsync(p => p.Id == id
                    && p.Owners.Any(o => o.AppUserId == userId));

            if (pokemon is null)
                return NotFound("Pokemon not found for this user.");

            // --- כללי האימון (החזרתי ומעט הידקתי) ---
            if (DateTime.UtcNow < pokemon.lastTimeTrained.AddHours(24) && pokemon.timesTrainedToday >= 5)
                return Unauthorized("Please wait 24h before training");

            if (DateTime.UtcNow >= pokemon.lastTimeTrained.AddHours(24))
                pokemon.timesTrainedToday = 0;

            if (pokemon.timesTrainedToday >= 4)
                return Unauthorized("Already trained maximum times today!");

            // --- עדכון ---
            pokemon.timesTrainedToday += 1;
            pokemon.lastTimeTrained = DateTime.UtcNow;
            pokemon.Strength += 10;

            await _context.SaveChangesAsync();

            return Ok(new { pokemon.Id, pokemon.Name, pokemon.Strength });
        }


        [HttpGet("admin")]
        public async Task<IActionResult> getAllRegisteredUsers()
        {
            var users = await _context.PokemonUsers.Select(obj => obj.Name).ToListAsync();




            return Ok(users);
        }
    }
}
