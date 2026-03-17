using Microsoft.AspNetCore.Mvc;
using ProductionApp.Data;
using ProductionApp.Models;

[ApiController]
[Route("api/[controller]")]
public class ProductionLineController: ControllerBase
{
    private readonly ProductionDbContext _context;
    public ProductionLineController(ProductionDbContext context)
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
        return Ok(_context.ProductionLines.ToList());
    }
    [HttpPost]
    public IActionResult Post(ProductionLine productionLine)
    {
        _context.ProductionLines.Add(productionLine);
        _context.SaveChanges();
        return Ok(productionLine);
    }
    [HttpPut("{id}")]
    public IActionResult Put(int id, ProductionLine productionLine)
    {
        var data=_context.ProductionLines.Find(id);
        if (data == null)
        {
            return NotFound();
        }
        data.LineName=productionLine.LineName;
        data.IsActive=productionLine.IsActive;
        _context.SaveChanges();
        return Ok(productionLine);
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var data=_context.ProductionLines.Find(id);
        if (data == null)
        {
            return NotFound();
        }
        _context.ProductionLines.Remove(data);
        _context.SaveChanges(); 
        return Ok();
    }

}