using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace studyProject.Models
{
    public class PokemonUser
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public List<PokemonModel> Pokemons { get; set; } = new();

        public string AppUserId { get; set; } = ""; 

    }
}
