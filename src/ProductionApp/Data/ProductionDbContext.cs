using Microsoft.EntityFrameworkCore;
using ProductionApp.Models;
namespace ProductionApp.Data
{
    public class ProductionDbContext : DbContext
    {
        public ProductionDbContext(DbContextOptions<ProductionDbContext> options) : base(options) { }
        public DbSet<ProductionLine> ProductionLines { get; set; } = null!;
        public DbSet<Equipment> Equipments { get; set; } = null!;
        public DbSet<Part> Parts { get; set; } = null!;
    }
}