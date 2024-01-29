using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
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
    public class RegistrotareasenproyectofechasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistrotareasenproyectofechasController(AppDbContext context)
        {
            _context = context;
        }

        

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Registrotareasenproyectofecha>>> PostRegistrotareasenproyectofecha(Consultahorasproyecto consultahorasproyecto)
        {
            
            var z = await _context.Empleados.ToListAsync();
            int idemp = 0;
            for (var i = 0; i < z.LongCount(); i++)
            {
                if (z[i].Usuario == consultahorasproyecto.Usuario && z[i].Pass == consultahorasproyecto.Pass)
                {
                    idemp = z[i].Id;
                    
                }
            }

            var r = await _context.Registrotareasenproyectofechas.ToListAsync();
            List<Registrotareasenproyectofecha> listainfop = new List<Registrotareasenproyectofecha>();
            

            if (r.LongCount() > 0 && idemp > 0)
            {
                int cont = 0;
                for (var j = 0; j < r.LongCount(); j++)
                {
                    if (r[j].Idempleado == idemp && r[j].Fechatarea == consultahorasproyecto.Fechatarea)
                    {
                        cont = cont + r[j].Horastrabajadasenproyecto;

                            int contcont = cont;
                            string contcontcopia = contcont.ToString();
                            listainfop.Add(new Registrotareasenproyectofecha() { Id = r[j].Id, Nombreproyecto = r[j].Nombreproyecto, Horastrabajadasenproyecto = r[j].Horastrabajadasenproyecto, Horastotales = contcontcopia, Idempleado = r[j].Idempleado, Fechatarea = r[j].Fechatarea });
                         
                    }

                }

                
            }

            if (listainfop.Count > 0) { return listainfop; }
            return NoContent();


        }


        }
    }

