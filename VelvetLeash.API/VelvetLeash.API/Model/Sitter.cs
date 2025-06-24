using System;

namespace VelvetLeash.API.Model
{
    public class Sitter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public double Rating { get; set; }
        public string Bio { get; set; }
        public bool IsAvailable { get; set; }
    }
} 