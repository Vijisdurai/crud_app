using Microsoft.AspNetCore.Mvc;
using ProductionApp.Data;
using ProductionApp.Models;

[ApiController]
[Route("api/[controller]")]
public class PartController: ControllerBase
{
    private readonly ProductionDbContext _context;
    public PartController(ProductionDbContext context)
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
        return Ok(_context.Parts.ToList());
    }
    [HttpPost]
    public IActionResult Post(Part part)
    {
        _context.Parts.Add(part);
        _context.SaveChanges();
        return Ok(part);
    }
    [HttpPut("{id}")]
    public IActionResult Put(int id, Part part)
    {
        var data=_context.Parts.Find(id);
        if (data == null)
        {
            return NotFound();
        }
        data.PartName=part.PartName;
        data.IsActive=part.IsActive;
        data.EquipmentID=part.EquipmentID;
        _context.SaveChanges();
        return Ok(part);
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var data=_context.Parts.Find(id);
        if (data == null)
        {
            return NotFound();
        }
        _context.Parts.Remove(data);
        _context.SaveChanges(); 
        return Ok();
    }

}