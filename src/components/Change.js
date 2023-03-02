import React, { useState, useRef, useEffect } from "react";
import { SlOptionsVertical, SlTrash } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";
// import { confirmAlert } from 'react-confirm-alert'
import Axios from "axios";

import "../styles/List.css";

export default function Change(props) {
  let selectComp = props.select;
  let descriptionComp = props.description;
  let titleComp = props.title;
  let test = props.test;

  const [deleteSelect, setDeleteSelect] = useState(false);
  const [optionsSelect, setOptionsSelect] = useState(false);
  const [newSelect, setNewSelect] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(descriptionComp);

  const apiURL = process.env.REACT_APP_API_URL;
  const inputRef = useRef();

  function handleExit() {
    setOptionsSelect((prev) => !prev);
  }

  useEffect(() => {
    setCurrentSelect(descriptionComp);
  }, []);

  const handleDeleteSelect = () => {
    console.log("handling");
    if (selectComp === "category") {
      Axios.post(`${apiURL}/api/v1/finalcheck/deletecategory`, {
        category: descriptionComp,
        title: titleComp,
      }).then(() => {
        console.log(`successfuly deleted ${selectComp}`);
        props.handleDeleteCateogry();
      });
    } else if (selectComp === "title") {
      Axios.post(`${apiURL}/api/v1/finalcheck/deletelist`, {
        title: descriptionComp,
      }).then(() => {
        console.log(`successfuly deleted ${selectComp}`);
        props.handleDeleteCateogry();
      });
    }
    setDeleteSelect(true);
    setOptionsSelect((prev) => !prev);
  };

  // function handleDeleteSelect() {
  //     confirmAlert({
  //         title: 'Confirm to submit',
  //         message: 'Are you sure to do this.',
  //         buttons: [
  //           {
  //             label: 'Yes',
  //             onClick: () => alert('Click Yes')
  //           },
  //           {
  //             label: 'No',
  //             onClick: () => alert('Click No')
  //           }
  //         ]
  //       })
  // }

  function handleEditSelect() {
    if (selectComp === "category") {
      Axios.post(`${apiURL}/api/v1/finalcheck/editcategory`, {
        category: newSelect,
        prevcategory: descriptionComp,
        title: titleComp,
      })
        .then(() => {
          console.log(`successfuly deleted ${selectComp}`);
          inputRef.current.value = "";
          setOptionsSelect((prev) => !prev);
          setCurrentSelect(newSelect);
        })
        .catch((error) => console.log(error));
    } else if (selectComp === "title") {
      Axios.post(`${apiURL}/api/v1/finalcheck/edittitle`, {
        title: newSelect,
        prevtitle: descriptionComp,
      })
        .then(() => {
          console.log(`successfuly deleted ${selectComp}`);
          inputRef.current.value = "";
          setOptionsSelect((prev) => !prev);
          setCurrentSelect(newSelect);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      {deleteSelect ? (
        ""
      ) : optionsSelect ? (
        <div className="select-list-container">
          <div
            className="select-list-form"
            style={
              selectComp === "title" ? { maxWidth: "70%" } : { maxWidth: "70%" }
            }
          >
            <textarea
              className="select-list-form-input"
              ref={inputRef}
              type="text"
              // placeholder={descriptionComp}
              placeholder="testing"
              onChange={(e) => setNewSelect(e.target.value)}
              style={
                selectComp === "title" ? { height: "40px" } : { height: "20px" }
              }
            >
              {descriptionComp}
            </textarea>
            <button className="select-list-form-btn" onClick={handleEditSelect}>
              Edit
            </button>
          </div>
          <div className="select-list-icons">
            <SlTrash
              onClick={handleDeleteSelect}
              size={22}
              style={
                selectComp === "title"
                  ? { color: "rgba(65,88,98, 0.8)" }
                  : { color: "#5C5F62" }
              }
            />
            <MdOutlineCancel
              onClick={handleExit}
              size={22}
              style={
                selectComp === "title"
                  ? { color: "rgba(65,88,98, 0.8)", maxWidth: "70%" }
                  : { color: "#5C5F62" }
              }
            />
          </div>
        </div>
      ) : (
        <div className="select-total-container">
          {console.log("current select is", currentSelect)}
          {selectComp === "title" ? test : currentSelect}
          <div className="options">
            <th onClick={() => setOptionsSelect((prev) => !prev)}>
              <SlOptionsVertical
                size={20}
                style={
                  selectComp === "title"
                    ? { color: "rgba(65,88,98, 0.8)" }
                    : { color: "#5C5F62" }
                }
              />
            </th>
          </div>
        </div>
      )}
    </>
  );
}
