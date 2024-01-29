namespace Trabajaounotareasusuarios.Models
{
    public class Registrotareasenproyectofecha
    {
        public int Id { get; set; }
        public required string Nombreproyecto { get; set; }
        public int Horastrabajadasenproyecto { get; set; }

        public required string Horastotales { get; set; }

        public int Idempleado { get; set; }
        public DateTime Fechatarea { get; set; }
    }
}
