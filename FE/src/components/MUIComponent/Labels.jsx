import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react';
import Button from './Button/Button';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
const Labels = ({boardID,onDataChangechild}) => {
  const [show, setShow] = useState(false);
  const [newLabel, setNewLabel] = useState({boardId: boardID, name: '', color: '' });
  const [count, setCount] = useState(1);

  const handleOnClick=()=>{
     createLabel();
     setShow(false);
    }
    
    
    const createLabel = async () => {
      try{
        const response = await fetch(` http://localhost:8080/api/v1/labels/createBL`, {
          method: 'POST',
          credential:'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLabel),
        });
        if (response.ok) {
          console.log('add suceess')
          onDataChangechild(count);
          setCount(prev=>prev+1);
      // Reset the new label form
      setNewLabel({ name: '', color: '' });
    } else {
      // Handle error response
      console.error('Failed to create label:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Failed to create label:', error);
  }
  };

 

  return (
    <>
    <Button onClick={()=>setShow(!show)}><AddIcon /></Button> 
    {show&&<div style={{ border: '2px solid black', width: '350px', backgroundColor: 'lightgray'}}>
      <h2>Labels</h2>

      <div >
        <label>
          Name:
          <input
            type="text"
            value={newLabel.name}
            onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
            required
          />
          
        </label>
        <br></br>
        <br></br>
        <div>
          <label htmlFor="labelColor">Color:</label>
          <input
            id="labelColor"
            type="color"
            value={newLabel.color}
            onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
            required
          />
        </div>
        <br></br>
        <Button onClick={handleOnClick}><CloudDoneIcon /></Button>
        <br></br>
        
      </div>
      <br></br>
    </div>}
    </>
  );
};

export default Labels;