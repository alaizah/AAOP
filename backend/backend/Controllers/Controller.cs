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
                    Email = model.Email,
                    Age = model.Age,
                    Bday = model.Bday,
                    Gender = model.Gender,
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
                    existingUser.Email = model.Email;
                    existingUser.Bday = model.Bday;
                    existingUser.Age = model.Age;
                    existingUser.Gender = model.Gender;
                    context.SaveChanges();
                    return "SUCCESS";
                }
                return "User not found";
            }
        }
        //====================POST NOTICE===============================================//
        [HttpGet]
        public ActionResult<IEnumerable<postModel>> AllNotice() //all notice
        {
            using (var context = new dbContext())
            {
                //var posts = context.Posts.Take(5).ToList();
                var posts = context.Posts.ToList();
                if (posts.Count > 0)
                {
                    return Ok(posts);
                }

                return NotFound();
            }
        }
        [HttpGet]
        public ActionResult<IEnumerable<postModel>> SomeNotice() //return the 5 most recent post
        {
            using (var context = new dbContext())
            {
                var posts = context.Posts.OrderByDescending(post=>post.Id).Take(5).ToList();
                if (posts.Count > 0)
                {
                    return Ok(posts);
                }

                return NotFound();
            }
        }
        //post notice
        [HttpPost]
        public string Post(postModel model)
        {
            using (var context = new dbContext())
            {
                context.Posts.Add(new post
                {
                    Title = model.Title,
                    Description = model.Description,
                    Location = model.Location,
                    Long = model.Long,
                    Lat = model.Lat,
                    Date = model.Date,
                    PosterID = model.PosterID,

                });
                context.SaveChanges();
            }
            return "SUCCESS";
        }
        //display posted notice
        [HttpGet]
        public ActionResult<IEnumerable<postModel>> NoticeList(int posterID)
        {
            using (var context = new dbContext())
            {
                var posts = context.Posts.Where(post => post.PosterID == posterID).ToList();
                if (posts.Count > 0)
                {
                    return Ok(posts);
                }
                return NotFound();
            }
        }
        //delete notice based on the id
        [HttpPost]
        public string DeletePost(int postId)
        {
            using var context = new dbContext();
            var postToDelete = context.Posts.FirstOrDefault(post => post.Id == postId);
            if (postToDelete != null)
            {
                context.Posts.Remove(postToDelete);
                context.SaveChanges();
                return "SUCCESS";
            }
            return "Post not found";
        }
        //get post
        [HttpGet]
        public ActionResult<userModel> ViewPost(int postID)
        {
            using (var context = new dbContext())
            {
                var post = context.Posts.FirstOrDefault(post => post.Id == postID);
                if (post != null)
                {
                    return Ok(post);
                }
                return NotFound();
            }
        }
        [HttpPost]
        public string UpdateNotice(int postID, postModel model)
        {
            using (var context = new dbContext())
            {
                // Retrieve the existing user from the database based on the user ID.
                var existingPost = context.Posts.FirstOrDefault(post => post.Id == postID);
                if (existingPost != null)
                {
                    // Update the properties of the existing user with the values from the model.
                    existingPost.Title = model.Title;
                    existingPost.Description = model.Description;
                    existingPost.Location = model.Location;
                    existingPost.Long = model.Long;
                    existingPost.Lat = model.Lat;
                    existingPost.Date = model.Date;
                    existingPost.PosterID = model.PosterID;
                    // Save the changes to the database.
                    context.SaveChanges();
                    return "SUCCESS";
                }
                return "User not found";
            }
        }



    }
}