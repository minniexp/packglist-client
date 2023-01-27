import React, { useState, useRef } from "react";
import { SlOptionsVertical, SlTrash } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";
import Axios from "axios";

import "../styles/List.css";

export default function EditList(props) {
  let editId = props.id;
  const [optionsClick, setOptionsClick] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const [currentTask, setCurrentTask] = useState(props.task);

  const [edittask, setEditTask] = useState(props.task);
  const inputRef = useRef();
  const apiURL = process.env.REACT_APP_API_URL;

  const editItem = () => {
    Axios.post(`${apiURL}/api/v1/finalcheck/edititem`, {
      id: editId,
      item: edittask,
    })
      .then(() => {
        console.log("successful edit");
      })
      .catch((error) => console.log(error));
    setCurrentTask(edittask);
    inputRef.current.value = "";
    setOptionsClick((prev) => !prev);
  };

  const deleteItem = () => {
    Axios.post(`${apiURL}/api/v1/finalcheck/deleteitem`, { id: editId })
      .then(() => {
        console.log("successfuly deleted item");
      })
      .catch((error) => console.log(error));
    setDeleteTask(true);
    inputRef.current.value = "";
    setOptionsClick((prev) => !prev);
  };

  function handleExit() {
    setOptionsClick((prev) => !prev);
  }

  return (
    <div className="edit-list-container">
      {/* <th className="checklist-checkbox">
                <input className="checkbox" type="checkbox" id="completed"/>    
            </th>
            <th className="checklist-description">
                <label htmlFor="completed" key={props.key}>{props.task}</label>
            </th> */}
      <div>
        {deleteTask ? (
          ""
        ) : optionsClick ? (
          <div className="edit-list-container">
            <div className="edit-list-form">
              <input
                className="edit-list-form-input"
                ref={inputRef}
                type="text"
                placeholder={props.task}
                onChange={(e) => setEditTask(e.target.value)}
              >
                {currentTask}
              </input>
              <button className="edit-list-form-btn" onClick={editItem}>
                Edit
              </button>
            </div>
            <SlTrash
              onClick={deleteItem}
              size={20}
              style={{ color: "#5C5F62" }}
            />
            <MdOutlineCancel
              onClick={handleExit}
              size={20}
              style={{ color: "#5C5F62" }}
            />
          </div>
        ) : (
          <div className="checklist-total-container">
            <div className="checklist-container">
              <th className="checklist-checkbox">
                <input
                  className="checkbox"
                  type="checkbox"
                  id={`${props.id}`}
                />
              </th>
              <th className="checklist-description">
                <label htmlFor={`${props.id}`} key={props.key}>
                  {currentTask}
                </label>
              </th>
            </div>
            <div className="options">
              <th onClick={() => setOptionsClick((prev) => !prev)}>
                <SlOptionsVertical size={20} style={{ color: "#5C5F62" }} />
              </th>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
