using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using studyProject.Models;
using studyProject.Dtos;

namespace studyProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUserModel> _userManager;
        private readonly IConfiguration _config;
        private readonly PokemonContext  _context;

        public AuthController(UserManager<AppUserModel> userManager, IConfiguration config, PokemonContext context)
        {
            _userManager = userManager;
            _config = config;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterAuthDto dto)
        {
            var user = new AppUserModel { UserName = dto.userName };
            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);


            var userPokemon = new PokemonUser
            {
                AppUserId = user.Id,
                Name = dto.userName
            };
            _context.PokemonUsers.Add(userPokemon);
            await _context.SaveChangesAsync();
            return await CreateToken(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginAuthDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.UserName);
            if (user == null) return Unauthorized();

            var passwordOk = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!passwordOk) return Unauthorized();

            return await CreateToken(user);
        }

        private async Task<AuthResponseDto> CreateToken(AppUserModel user)
        {
            var jwt = _config.GetSection("Jwt");
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim("username", user.UserName ?? "")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: jwt["Issuer"],
                audience: jwt["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return new AuthResponseDto
            {
                Token = tokenString,
                UserName = user.UserName ?? "",
            };
        }
    }
}
