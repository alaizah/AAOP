namespace backend.Models
{
    public class postModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public double Long { get; set; }
        public double Lat { get; set; }
        public DateTime Date { get; set; }
        public int PosterID { get; set; }
    }
}
