namespace Trabajaounotareasusuarios.Models
{
    public class Consultahorasproyecto
    {
        public int Id { get; set; }
        public required string Usuario { get; set; }
        public required string Pass { get; set; }

        public DateTime Fechatarea { get; set; }
    }
}
