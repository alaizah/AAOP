import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home/:userID" exact Component={Home} />
          <Route path="/profile/:userID" element={<Profile />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
