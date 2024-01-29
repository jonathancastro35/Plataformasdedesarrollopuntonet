namespace Trabajaounotareasusuarios.Models
{
    public class Jefe
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Apellidos { get; set; }

        public required string Usuario { get; set; }

        public required string Pass { get; set; }
    }
}
