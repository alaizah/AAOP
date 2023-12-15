import React, { useState, useEffect } from "react";
import ProfileInputs from "../components/ProfileInputs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const [erroMessage, setErrorMessage] = useState("");
  const [account, setAccount] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    gender: "",
    bday: "",
    age: "",
  });
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2]; //pathname to array from url
  //console.log(userID);

  //save data to account
  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const navigate = useNavigate();
  //pre-fill the fields
  useEffect(() => {
    const fetchAccount = async () => {
      axios
        .get(`https://localhost:8800/Profile?userId=${userID}`)
        .then((response) => {
          //if (response != null) console.log(response.data);
          // const retrievedAccount = response.data[0];
          //format date
          // console.log(response.data);
          const formattedDate = new Date(response.data.bday)
            .toISOString()
            .substr(0, 10);
          setAccount({
            username: response.data.username,
            password: response.data.password,
            fname: response.data.fName,
            lname: response.data.lName,
            email: response.data.email,
            bday: formattedDate,
            age: response.data.age,
            gender: response.data.gender,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchAccount();
  }, [userID]);
  // ...

  const handleClick = async (e) => {
    if (
      !account.username ||
      !account.age ||
      !account.bday ||
      !account.fname ||
      !account.lname ||
      !account.email
    ) {
      setErrorMessage("Missing fields!");
      return;
    }

    try {
      // const dataToSend = {
      //   userID: userID,
      //   model: {
      //     Username: account.username,
      //     Password: account.password,
      //     FName: account.fname,
      //     LName: account.lname,
      //     Email: account.email,
      //     Bday: account.bday,
      //     Age: account.age,
      //     Gender: account.gender,
      //   },
      // };

      const response = await axios.post(
        `https://localhost:8800/UpdateProfile?userID=${userID}`,
        account
        // Send data as the 'data' property
      );

      //Check the response from the server
      if (response.data === "SUCCESS") {
        navigate(`/profile/${userID}`);
      } else {
        console.error("Update failed:", response.data);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  console.log(account);
  return (
    <div>
      <Navbar
        home={`/home/${userID}`}
        notices={`/notices/${userID}`}
        page2="NOTICES"
        page4={account.username.toUpperCase()}
        profile={`/profile/${userID}`}
        map={`/map/${userID}`}
      />
      <div className="prof-cont">
        <div className="prof_form">
          <ProfileInputs
            change={handleChange}
            username="username"
            password="password"
            fname="fname"
            lname="lname"
            sex="gender"
            email="email"
            sexType={account.gender}
            date="bday"
            age="age"
            //retrieved values
            usernameValue={account.username}
            passwordValue={account.password}
            fnameValue={account.fname}
            lnameValue={account.lname}
            emailValue={account.email}
            bdayValue={account.bday}
            ageValue={account.age}
          />
          <h4 className="err_msg">{erroMessage}</h4>
          <div className="prof_button">
            <button onClick={handleClick}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
