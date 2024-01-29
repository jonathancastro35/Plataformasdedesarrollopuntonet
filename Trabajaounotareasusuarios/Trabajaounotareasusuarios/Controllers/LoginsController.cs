using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using Trabajaounotareasusuarios.Context;
using Trabajaounotareasusuarios.Models;

namespace Trabajaounotareasusuarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Tarea>>> PostLogin(Login login)
        {
            if (UsuariotareaExists(login.Usuario, login.Pass).Equals(true))
            {
                var x = await _context.Tareas.ToListAsync();
                var y = await _context.Proyectoempleados.ToListAsync();
                var z = await _context.Empleados.ToListAsync();

                List<Tarea> listatareas = new List<Tarea>();
                int conttareas = 0;

                for (var i = 0; i < x.LongCount(); i++)
                {
                    for (var j = 0; j < y.LongCount(); j++)
                    {
                        for (var k=0; k< z.LongCount(); k++)
                        {
                            if (x[i].Idproyectoempleado == y[j].Id && y[j].Idempleado == z[k].Id && z[k].Usuario == login.Usuario)
                            {

        listatareas.Add(new Tarea() { Id = x[i].Id, Idproyectoempleado = x[i].Idproyectoempleado, Fechatarea = x[i].Fechatarea, Horaentrada = x[i].Horaentrada, Horasalida = x[i].Horasalida, Nombretarea = x[i].Nombretarea, Tiempodedicadotarea = x[i].Tiempodedicadotarea });
                                conttareas++;
                            }
                        }

                    }
                }

                if (conttareas == 0)
                {
                    listatareas.Add(new Tarea() { Id = 0, Idproyectoempleado = 0, Fechatarea = DateTime.Now, Horaentrada = 0, Horasalida = 0, Nombretarea = "", Tiempodedicadotarea = 0 });
                }

                return listatareas;

            }

            return NotFound();
        }



        private bool UsuariotareaExists(string usuario, string pass)
        {

            return _context.Empleados.Any(e => e.Usuario == usuario && e.Pass == pass);
        }
    }
}


