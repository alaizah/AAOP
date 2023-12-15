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
    contactNumber: "",
    bday: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // save input data to account variables
  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // save inputted data to db
  const handleClick = async (e) => {
    // if fields are empty
    // error message
    if (
      !account.username ||
      !account.password ||
      !account.fname ||
      !account.lname ||
      !account.contactNumber ||
      !account.bday
    ) {
      setErrorMessage("Missing fields. Please try again.");
      return;
    }

    // save to db if no error
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
          <p>Create an Account</p>
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
          <input
            className="su_in"
            type="text"
            placeholder="Contact Number"
            name="contactNumber"
            onChange={handleChange}
          />
        </div>
        <div className="cont_su">
          {/* Replace text input with date input */}
          <input
            className="su_in"
            type="date"
            placeholder="Birthday"
            name="bday"
            onChange={handleChange}
          />
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
