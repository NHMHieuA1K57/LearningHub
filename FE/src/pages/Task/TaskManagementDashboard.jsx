import React from "react";
import "../Dashboard.css";
import RecentlyVisited from "../../components/MUIComponent/RecentlyVisited";
import TypoText from "../../components/MUIComponent/TypoText";
const TaskManagementDashBoard = () => {

  console.log(`
  __          __  _                            _                 
  \\ \\        / / | |                          | |                
   \\ \\  /\\  / /__| | ___ ___  _ __ ___   ___  | |_ ___           
    \\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | __/ _ \\          
     \\  /\\  /  __/ | (_| (_) | | | | | |  __/ | || (_) |         
   _  \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/    _     
  | |                         (_)             | |         | |    
  | |     ___  __ _ _ __ _ __  _ _ __   __ _  | |__  _   _| |__  
  | |    / _ \\/ _\` | '__| '_ \\| | '_ \\ / _\` | | '_ \\| | | | '_ \\ 
  | |___|  __/ (_| | |  | | | | | | | | (_| | | | | | |_| | |_) |
  |______\\___|\\__,_|_|  |_| |_|_|_| |_|\\__, | |_| |_|\\__,_|_.__/ 
                                       __/  |                    
                                       |___/                    
      `);
  return (
    <div>
      <div>
        <TypoText 
          variant="h1"
          style={{ fontWeight: "bold", margin: "30px" }}
        >
          YOUR NOTES
        </TypoText>
        <div className="dashboard-container-content notes-container">
          {/* List notes */}
          <RecentlyVisited />
        </div>
      </div>
    </div>
  );
};

export default TaskManagementDashBoard;
