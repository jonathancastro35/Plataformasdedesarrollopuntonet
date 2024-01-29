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
    public class TareasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TareasController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetTareas()
        {
            return await _context.Tareas.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);

            if (tarea == null)
            {
                return NotFound();
            }

            return tarea;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarea(int id, Tarea tarea)
        {
            if (id != tarea.Id)
            {
                return BadRequest();
            }

            _context.Entry(tarea).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TareaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Tarea>> PostTarea(Tarea tarea)
        {
            _context.Tareas.Add(tarea);

            var x = await _context.Proyectoempleados.ToListAsync();
            var y = await _context.Proyectos.ToListAsync();
            var z = await _context.Empleados.ToListAsync();
            
            

            for(var i =0; i<x.LongCount(); i++){
            int cont = 0;
            for (var j=0; j<y.LongCount(); j++){
            for(var k=0; k<z.LongCount(); k++){
            if(tarea.Idproyectoempleado == x[i].Id && x[i].Idproyecto == y[j].Id && x[i].Idempleado == z[k].Id)
            {
            cont = cont + tarea.Tiempodedicadotarea;
           
            _context.Registrotareasenproyectofechas.Add(new Registrotareasenproyectofecha() { Nombreproyecto = y[j].Nombreproyecto, Horastrabajadasenproyecto = cont, Horastotales = "-", Idempleado = z[k].Id, Fechatarea = tarea.Fechatarea });
            }    
            }        
            }
            
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTarea", new { id = tarea.Id }, tarea);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null)
            {
                return NotFound();
            }

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TareaExists(int id)
        {
            return _context.Tareas.Any(e => e.Id == id);
        }

    }
}
