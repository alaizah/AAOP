import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
function Signup() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    gender: "",
    email: "",
    bday: "",
    age: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  //save input data to account variablse
  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  //save inputted data to db
  const handleClick = async (e) => {
    //if fileds are empty
    //error message
    if (
      !account.username ||
      !account.password ||
      !account.email ||
      !account.fname ||
      !account.lname ||
      !account.age ||
      !account.bday ||
      !account.gender
    ) {
      setErrorMessage("Missing fields. Please try again.");
    }

    //save to db if no error
    e.preventDefault();
    try {
      await axios.post("https://localhost:8800/SignUp", account);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(account);
  return (
    <div className="body_su">
      <form className="form_su">
        <div className="su_banner">
          <h1>SIGN UP</h1>
          <p>And let the world knows what you know</p>
        </div>
        <div className="cont_su">
          <input
            className="su_in"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="cont_su">
          <input
            className="su_in"
            type="password"
            placeholder="Password..."
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="cont_su">
          <input
            className="su_in"
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="cont_su">
          <input
            className="su_in"
            type="text"
            placeholder="First name"
            name="fname"
            onChange={handleChange}
          />
        </div>
        <div className="cont_su">
          <input
            className="su_in"
            type="text"
            placeholder="Last name"
            name="lname"
            onChange={handleChange}
          />
        </div>
        <div className="cont_su">
          <select
            name="gender"
            onChange={handleChange}
            value={account.gender}
            className="su_in"
          >
            <option value="">Choose Sex....</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="su_row">
          <div className="su_row_i">
            <input
              className="su_in"
              type="date"
              placeholder="Birthday"
              name="bday"
              onChange={handleChange}
            />
          </div>

          <div className="su_row_i">
            <input
              className="su_in"
              type="number"
              placeholder="Age"
              name="age"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="si_error">
          <h4 className="error">{errorMessage}</h4>
        </div>
        <div className="si_button">
          <button className="su_button" onClick={handleClick}>
            Sign Up
          </button>
        </div>

        <div className="su_link">
          <h5>
            <i>
              Already have an account? Sign-in <Link to="/">here!</Link>
            </i>
          </h5>
        </div>
      </form>
    </div>
  );
}

export default Signup;
