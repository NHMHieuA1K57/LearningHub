import React, {useState} from "react";

export default function EditableField({ content, onChange, onClick,name }) {
    const [isEditing, setIsEditing] = useState(false);
  
    const handleClick = () => {
      setIsEditing(true);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        setIsEditing(false);
      }
    };
  
    return (
      <>
        {isEditing ? (
          <input
            autoFocus
            name={name}
            readOnly={false}
            defaultValue={content}
            onChange={onChange}
            onKeyUp={handleKeyPress}
            type="text"
          />
        ) : (
          <span onClick={handleClick}>{content}</span>
        )}
      </>
    );
  }
  