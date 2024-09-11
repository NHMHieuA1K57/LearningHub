import React, { useState } from "react";
// import "./UserDashboard.css";
import "../Dashboard.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import ProfileButton from "../../components/MUIComponent/ProfileButton";
import FlashcardDashboard from "../Flashcard/FlashcardDashBoard";
import TaskManagementDashBoard from "../Task/TaskManagementDashboard";

const UserDashBoard = () => {
  const [destination, setDestination] = useState("task");
  const des = () => {
    if (destination === "flashcard")
      return (<FlashcardDashboard />);
    else {
      return (<TaskManagementDashBoard />);
    }
  }
return (
  // <BrowserRouter>
  <div>
    <Header />
    <div className="dashboard-container">
      <div className="left-side">
        {/* <NavBar /> */}
        <div style={{ margin: 0 }}>
          <Link to="#" onClick={() => setDestination("task")}>
            <ProfileButton>Task Management</ProfileButton>
          </Link>
          <Link to="#" onClick={() => setDestination("flashcard")}>
            <ProfileButton>Flashcard</ProfileButton>
          </Link>
        </div>
      </div>
      <div className="right-side">
        {des()}
      </div>
    </div>
    <Footer />
  </div>
);
};

export default UserDashBoard;
