using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ProductionApp.Models
{
    [Table("Vijis_part")]
    public class Part
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Vijis_Equipment")]
        public int EquipmentID { get; set; }

        [Required]
        [StringLength(255)]
        public string PartName { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;

    }
}
