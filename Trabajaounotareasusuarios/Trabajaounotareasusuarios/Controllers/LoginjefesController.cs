using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Trabajaounotareasusuarios.Context;
using Trabajaounotareasusuarios.Models;

namespace Trabajaounotareasusuarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginjefesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginjefesController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<ActionResult<IEnumerable<Tarea>>> PostLogin(Loginjefe loginjefe)
        {
            if (JefeusertExists(loginjefe.Usuario, loginjefe.Pass).Equals(true))
            {

                var x = await _context.Tareas.ToListAsync();

                List<Tarea> listadotareas = new List<Tarea>();

                for (var i = 0; i < x.LongCount(); i++)
                {

                    listadotareas.Add(new Tarea() { Id = x[i].Id, Idproyectoempleado = x[i].Idproyectoempleado, Fechatarea = x[i].Fechatarea, Horaentrada = x[i].Horaentrada, Horasalida = x[i].Horasalida, Nombretarea = x[i].Nombretarea, Tiempodedicadotarea = x[i].Tiempodedicadotarea });

                }

                return listadotareas;

            }

            return NotFound();
        }



        private bool JefeusertExists(string usuario, string pass)
        {

            return _context.Jefes.Any(e => e.Usuario == usuario && e.Pass == pass);
        }

       
    }
}


