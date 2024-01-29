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
    public class ProyectoempleadoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProyectoempleadoesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proyectoempleado>>> GetProyectoempleados()
        {
            return await _context.Proyectoempleados.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Proyectoempleado>> GetProyectoempleado(int id)
        {
            var proyectoempleado = await _context.Proyectoempleados.FindAsync(id);

            if (proyectoempleado == null)
            {
                return NotFound();
            }

            return proyectoempleado;
        }

        
        

        [HttpPost]
        public async Task<ActionResult<Proyectoempleado>> PostProyectoempleado(Proyectoempleado proyectoempleado)
        {
            if(VerificarExistsrepetido(proyectoempleado.Idempleado, proyectoempleado.Idproyecto).Equals(false))
            {
                _context.Proyectoempleados.Add(proyectoempleado);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProyectoempleado", new { id = proyectoempleado.Id }, proyectoempleado);

            }

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProyectoempleado(int id)
        {
            var proyectoempleado = await _context.Proyectoempleados.FindAsync(id);
            if (proyectoempleado == null)
            {
                return NotFound();
            }

            if (verificarsiposeetareas(id).Equals(false))
            {
                _context.Proyectoempleados.Remove(proyectoempleado);
                await _context.SaveChangesAsync();

            }

            return NoContent();
        }

        private bool Controlactualizar(int id, int idempleado, int idproyecto)
        {
            return _context.Proyectoempleados.Any(e => e.Id == id && (e.Idempleado != idempleado || e.Idproyecto != idproyecto ) );
        }

        private bool VerificarExistsrepetido(int idempleado, int idproyecto)
        {
            return _context.Proyectoempleados.Any(e => e.Idempleado == idempleado && e.Idproyecto == idproyecto);
        }

        private bool verificarsiposeetareas(int id)
        {
            return _context.Tareas.Any(e => e.Idproyectoempleado == id);
        }

        private bool ProyectoempleadoExists(int id)
        {
            return _context.Proyectoempleados.Any(e => e.Id == id);
        }
    }
}
