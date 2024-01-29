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
    public class ProyectoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProyectoesController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proyecto>>> GetProyectos()
        {
            return await _context.Proyectos.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Proyecto>> GetProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);

            if (proyecto == null)
            {
                return NotFound();
            }

            return proyecto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProyecto(int id, Proyecto proyecto)
        {
            if (id != proyecto.Id)
            {
                return BadRequest();
            }

            _context.Entry(proyecto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProyectoExists(id))
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
        public async Task<ActionResult<Proyecto>> PostProyecto(Proyecto proyecto)
        {

            if (ProyectoExistsrepetido(proyecto.Nombreproyecto).Equals(false))
            {
                
                _context.Proyectos.Add(proyecto);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProyecto", new { id = proyecto.Id }, proyecto);

            }

            return NoContent();
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProyecto(int id)
        {
            var proyecto = await _context.Proyectos.FindAsync(id);
            if (proyecto == null)
            {
                return NotFound();
            }

            if (verificarsiposeeempleadosinscritos(id).Equals(false) && proyecto != null)
            {

                _context.Proyectos.Remove(proyecto);
                await _context.SaveChangesAsync();

            }

            return NoContent();
        }

        private bool verificarsiposeeempleadosinscritos(int id)
        {
            return _context.Proyectoempleados.Any(e => e.Idproyecto == id);
        }

        private bool ProyectoExistsrepetido(String nombreproyecto)
        {
            return _context.Proyectos.Any(e => e.Nombreproyecto == nombreproyecto);
        }

        private bool ProyectoExists(int id)
        {
            return _context.Proyectos.Any(e => e.Id == id);
        }
    }
}
