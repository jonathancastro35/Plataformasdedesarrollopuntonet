namespace Trabajaounotareasusuarios.Models
{
    public class Tarea
    {
        public int Id { get; set; }
        public int Idproyectoempleado { get; set; }
        public DateTime Fechatarea { get; set; }
        public int Horaentrada { get; set; }
        public int Horasalida { get; set; }

        public required string Nombretarea { get; set; }

        public int Tiempodedicadotarea { get; set; }


    }
}
