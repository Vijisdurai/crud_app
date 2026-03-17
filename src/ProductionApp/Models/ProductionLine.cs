using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ProductionApp.Models
{
    [Table("Vijis_ProductionLine")]
    public class ProductionLine
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [StringLength(255)]
        public string LineName { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;

    }
}
