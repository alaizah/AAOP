namespace backend.Models
{
    public class userModel
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string LName { get; set; }
        public string FName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public DateTime Bday {get; set;}
        public string Gender { get; set; }

    }
}
