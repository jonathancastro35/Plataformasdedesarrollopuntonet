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
    public class EmpleadoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmpleadoesController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleado>>> GetEmpleados()
        {
            return await _context.Empleados.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Empleado>> GetEmpleado(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);

            if (empleado == null)
            {
                return NotFound();
            }

            return empleado;
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleado(int id, [FromBody] Empleado empleado)
        {
            if (id != empleado.Id)
            {
                return BadRequest();
            }

            if (Controlactualizar(empleado.Usuario, id).Equals(false))
            {

                _context.Entry(empleado).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!EmpleadoExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

            }

            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<Empleado>> PostEmpleado(Empleado empleado)
        {
            if (EmpleadoExistsrepetido(empleado.Usuario).Equals(false))
            {

                _context.Empleados.Add(empleado);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEmpleado", new { id = empleado.Id }, empleado);

            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpleado(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound();
            }

            if (verificarsiposeeeproyectoinscrito(id).Equals(false) && empleado !=null && comprobarsiesjefe(id).Equals(false))
            {

                _context.Empleados.Remove(empleado);
                await _context.SaveChangesAsync();

            }

            return NoContent();
        }

        private bool Controlactualizar(String usuario, int id)
        {
            return _context.Empleados.Any(e => e.Usuario == usuario && e.Id != id);
        }

        private bool EmpleadoExistsrepetido(String usuario)
        {
            return _context.Empleados.Any(e => e.Usuario == usuario);
        }

        private bool verificarsiposeeeproyectoinscrito(int id)
        {
            return _context.Proyectoempleados.Any(e => e.Idempleado == id);
        }

        private bool EmpleadoExists(int id)
        {
            return _context.Empleados.Any(e => e.Id == id);
        }

        private bool comprobarsiesjefe(int id)
        {
            return _context.Jefes.Any(e =>

            _context.Empleados.Any(f => f.Id == id && f.Usuario == e.Usuario)
            );
        }

    }
}
