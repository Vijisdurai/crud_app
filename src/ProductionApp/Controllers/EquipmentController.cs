using Microsoft.AspNetCore.Mvc;
using ProductionApp.Data;
using ProductionApp.Models;

[ApiController]
[Route("api/[controller]")]
public class EquipmentController: ControllerBase
{
    private readonly ProductionDbContext _context;
    public EquipmentController(ProductionDbContext context)
    {
        _context=context;
    }

    [HttpGet("Ping")]
    public IActionResult Ping()
    {
        return Ok("Pong");
    } 

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Equipments.ToList());
    }
    [HttpPost]
    public IActionResult Post(Equipment equipment)
    {
        _context.Equipments.Add(equipment);
        _context.SaveChanges();
        return Ok(equipment);
    }
    [HttpPut("{id}")]
    public IActionResult Put(int id, Equipment equipment)
    {
        var data=_context.Equipments.Find(id);
        if (data == null)
        {
            return NotFound();
        }
        data.EquipmentName=equipment.EquipmentName;
        data.IsActive=equipment.IsActive;
        data.LineID=equipment.LineID;
        _context.SaveChanges();
        return Ok(equipment);
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var data=_context.Equipments.Find(id);
        if (data == null)
        {
            return NotFound();
        }
        _context.Equipments.Remove(data);
        _context.SaveChanges(); 
        return Ok();
    }

}