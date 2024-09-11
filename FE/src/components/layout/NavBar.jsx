import React from "react";
import { Link } from "react-router-dom";
import ProfileButton from "../MUIComponent/ProfileButton";

const NavBar = () => {
  return (
    <div style={{ margin: 0 }}>
      <Link to="/taskmanagement">
        <ProfileButton>Task Management</ProfileButton>
      </Link>
      <Link to="/flashcardDash">
        <ProfileButton>Flashcard</ProfileButton>
      </Link>
    </div>
  );
};

export default NavBar;
