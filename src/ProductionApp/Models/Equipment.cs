using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductionApp.Models
{
    [Table("Vijis_Equipment")]
    public class Equipment
    {
        [Key]
        public int ID { get; set; }

        [ForeignKey("Vijis_ProductionLine")]
        public int LineID { get; set; }

        [Required]
        [StringLength(255)]
        public string EquipmentName { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;

    }
}
