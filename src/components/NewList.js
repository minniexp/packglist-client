import React, { useState, useRef } from "react";
import Axios from "axios";

import "../styles/List.css";

export default function NewList(props) {
  const listName = props.listName;
  const [tasks, setTasks] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;

  const inputRef = useRef();

  function handleNewTask(e) {
    setNewItem(e.target.value);
  }

  const submitReview = () => {
    Axios.post(`${apiURL}/additem`, {
      title: listName,
      category: newCategory,
      item: newItem,
    }).then(() => {
      console.log("successful insert");
      props.handleNewListCreated();
    });
    setTasks((oldArray) => [...oldArray, newItem]);
    inputRef.current.value = "";
  };

  return (
    <div className="todo-container">
      <div className="checklist-add">
        <input
          type="text"
          name="newCategory"
          value={newCategory}
          className="checklist-add"
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </div>

      <div className="checklist-total">
        {tasks.map((task) => (
          <div className="checklist">
            <label htmlFor="completed">{task}</label>
            <input className="checkbox" type="checkbox" id="completed" />
          </div>
        ))}
      </div>

      <div className="checklist-add">
        <hr />
        <form>
          <input
            type="text"
            name="username"
            className="checklist-add"
            ref={inputRef}
            onChange={handleNewTask}
          />
          <button onClick={submitReview}>Submit</button>
        </form>
      </div>
    </div>
  );
}
