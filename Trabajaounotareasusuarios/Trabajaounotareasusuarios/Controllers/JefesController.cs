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
    public class JefesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JefesController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jefe>>> GetJefes()
        {
            return await _context.Jefes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Jefe>> GetJefe(int id)
        {
            var jefe = await _context.Jefes.FindAsync(id);

            if (jefe == null)
            {
                return NotFound();
            }

            return jefe;
        }

        

        [HttpPost]
        public async Task<ActionResult<Jefe>> PostJefe(Jefe jefe)
        {

            if (JefeExists(jefe.Usuario).Equals(false))
            {
                if (verificarsiexisteemp(jefe.Usuario).Equals(false))
                {
                    _context.Jefes.Add(jefe);
                    _context.Empleados.Add(new Empleado() { Nombre = jefe.Nombre, Apellidos = jefe.Apellidos, Usuario = jefe.Usuario, Pass = jefe.Pass });
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetJefe", new { id = jefe.Id }, jefe);

                }

                if (verificarsiexisteemp(jefe.Usuario).Equals(true))
                {
                    _context.Jefes.Add(jefe);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("GetJefe", new { id = jefe.Id }, jefe);

                }

            }
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJefe(int id)
        {
            var jefe = await _context.Jefes.FindAsync(id);
            if (jefe == null)
            {
                return NotFound();
            }

            _context.Jefes.Remove(jefe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JefeExists(string usuario)
        {
            return _context.Jefes.Any(e => e.Usuario == usuario);
        }

        private bool verificarsiexisteemp(string username)
        {
            return _context.Empleados.Any(e => e.Usuario == username);
        }

    }
}
