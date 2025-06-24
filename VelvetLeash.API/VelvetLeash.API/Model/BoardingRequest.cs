using System;

namespace VelvetLeash.API.Model
{
    public class BoardingRequest
    {
        public int Id { get; set; }
        public string DogSize { get; set; }
        public string DogAge { get; set; }
        public string GetAlongWithDogs { get; set; }
        public string GetAlongWithCats { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 