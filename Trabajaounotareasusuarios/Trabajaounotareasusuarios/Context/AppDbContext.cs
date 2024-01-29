using Microsoft.EntityFrameworkCore;
using Trabajaounotareasusuarios.Models;

namespace Trabajaounotareasusuarios.Context
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Proyecto> Proyectos { get; set; }
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<Proyectoempleado> Proyectoempleados { get; set; }
        public DbSet<Jefe> Jefes { get; set; }
        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<Registrotareasenproyectofecha> Registrotareasenproyectofechas { get; set; }

public DbSet<Trabajaounotareasusuarios.Models.Login> Login { get; set; } = default!;

public DbSet<Trabajaounotareasusuarios.Models.Loginjefe> Loginjefe { get; set; } = default!;

public DbSet<Trabajaounotareasusuarios.Models.Consultahorasproyecto> Consultahorasproyecto { get; set; } = default!;



    }
}

