using System.ComponentModel.DataAnnotations;

namespace studyProject.Models
{
    public class PokemonModel
    {
        public int Id { get; set; }                      
        public string Name { get; set; } = string.Empty;
        public string Power { get; set; } = string.Empty;   
        public int Strength { get; set; }

        public int timesTrainedToday { get; set; } = 0;

        public DateTime lastTimeTrained { get; set; } = DateTime.MinValue;

        public List<PokemonUser> Owners { get; set; } = new();



    }
}
