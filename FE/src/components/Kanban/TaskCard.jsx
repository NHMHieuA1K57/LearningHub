import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateCard from "./UpdateCard";

const Tag = styled.span`
  background-color: #10957d;
  padding: 3px 20px;
  color: white;
  border-radius: 8px;
  margin: 0px 0.25rem;
  font-weight: 600;
  font-family: roboto, sans-serif;
`;
const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;
  flex-wrap: wrap;
  white-space: nowrap;
  font-family: roboto, sans-serif;
  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
    text-overflow: unset;
    overflow: overlay;
    flex-wrap: none;
  }
`;
const TaskHeading = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`;

const TaskCard = ({ item, index, onDelete, onClick }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  const handleCardClick = () => {
    onClick(item.id);
  };

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleCardClick}
        >
          <TaskInformation>
            <TaskHeading>
              <p>{item.cardTitle}</p>
              <DeleteIcon onClick={handleDelete} />
            </TaskHeading>
            <div className="secondary-details">
              <p>
                {item.labels?.map((element) => {
                  return (
                    <Tag
                      key={item.labels.name}
                      style={{ backgroundColor: element.color }}
                    >
                      {element.name}
                    </Tag>
                  );
                })}
              </p>
            </div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
