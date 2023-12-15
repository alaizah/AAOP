using backend.Views;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[action]")]
    [ApiController]
    public class Controller : ControllerBase
    {
        [HttpGet]
        public List<string> Sample()
        {
            List<string> list = new List<string> { "first", "second", "third", "fourth", "fifth", "sixth" };

            return list;
        }
        [HttpPost]
        public string SignUp(userModel model) //accept new data
        {
            using (var context = new dbContext())
            {
                context.Users.Add(new user
                {
                    Username = model.Username,
                    Password = model.Password,
                    FName = model.FName,
                    LName = model.LName,
                    Contact = model.Contact,
                    Bday = model.Bday,
                });

                context.SaveChanges();
            }
            return "SUCCESS";
        }
        [HttpGet]
        public ActionResult<userModel> Profile(int userId) //return user data based on id
        {
            using (var context = new dbContext())
            {
                var user = context.Users.FirstOrDefault(user => user.Id == userId);

                if (user != null)
                {
                    return Ok(user);
                }

                return NotFound();
            }
        }
        //for sign in
        //verify if user exist
        [HttpGet]
        public ActionResult<int> SignIn(string username, string password)
        {
            using (var context = new dbContext())
            {
                var user = context.Users.FirstOrDefault(user => user.Username == username && user.Password == password);
                if (user != null)
                {
                    return Ok(user.Id);
                }
                return NotFound();
            }
        }
        //get name
        [HttpGet]
        public ActionResult<string> GetName(int userID)
        {
            using (var context = new dbContext())
            {
                var user = context.Users.FirstOrDefault(user => user.Id == userID);
                if (user != null)
                {
                    return Ok(user.Username);
                }
                return NotFound();
            }
        }
        //update the user data
        [HttpPost]
        public string UpdateProfile(int userID, userModel model)
        {
            using (var context = new dbContext())
            {
                // Retrieve the existing user from the database based on the user ID.
                var existingUser = context.Users.FirstOrDefault(user => user.Id == userID);
                if (existingUser != null)
                {
                    // Update the properties of the existing user with the values from the model.
                    existingUser.Username = model.Username;
                    existingUser.Password = model.Password;
                    existingUser.FName = model.FName;
                    existingUser.LName = model.LName;
                    existingUser.Contact = model.Contact;
                    existingUser.Bday = model.Bday;
                    context.SaveChanges();
                    return "SUCCESS";
                }
                return "User not found";
            }
        }
    }
}