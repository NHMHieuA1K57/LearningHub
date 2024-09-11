import React from "react";
import "../Dashboard.css";
import TypoText from "../../components/MUIComponent/TypoText";
import RecentlyVisitedSet from "../../components/MUIComponent/Flashcard/RecentlyVisitedSet";
const FlashcardDashboard = () => {
  return (
    <div>
      {/* <Header />
      <div className="dashboard-container">
        <div className="left-side">
          <NavBar />
        </div>

        <div className="right-side"> */}
          <div>
            <TypoText
              variant="h1"
              style={{ fontWeight: "bold", margin: "30px" }}
            >
              YOUR SETS
            </TypoText>
            <div className="dashboard-container-content sets-container">
              {/* Flashcard sets */}
              <RecentlyVisitedSet />
            </div>
          </div>
        </div>
    //   </div>
    //   <Footer />
    // </div>
  );
};

export default FlashcardDashboard;
