import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Axios from "axios";
import "../styles/Home.css";
import Iconimg from "../images/searchIcon.png";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from "react-loader-spinner";
import NewList from "../components/NewList";

export default function Home(props) {
  let navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [dataResponse, setDataReponse] = useState([]);
  const [query, setQuery] = useState("");
  const [newListClick, setNewListClick] = useState(false);

  const inputRef = props.inputRef;
  const inputSearchRef = props.inputSearchRef;
  const apiURL = process.env.REACT_APP_API_URL;

  // const filteredItems = items.filter((item) => {
  //   return item.toLowerCase().includes(query.toLowerCase());
  // });

  // const nodupliateitems = [...new Set(filteredItems)];
  const createList = (listName) => {
    Axios.post(`${apiURL}/api/v1/finalcheck/createList`, {
      title: listName
    }).then((res) => {
      console.log("successfuly created list");
      let newListID = res.data.rows[0].id
      let urlString = `/list/${newListID}`
      console.log("urlStringNow is ", urlString)
      navigate(urlString)
    });

  };

  function onSubmit(e) {
    e.preventDefault();
    console.log("onsubmit called");

    const valueInputList = inputRef.current.value;
    if (valueInputList === "") return;
    createList(valueInputList)
    setItems((prev) => [...prev, valueInputList]);
    inputRef.current.value = "";
    toggleCreateList();

  }

  function onSearch(e) {
    e.preventDefault();

    const valueInputSearch = inputSearchRef.current.value;
    props.listTitle(query);
    if (valueInputSearch === "") return;
    inputSearchRef.current.value = "";
  }

  const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
      promiseInProgress && (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeDots color="#6F47EB" />
        </div>
      )
    );
  };

  useEffect(() => {
    console.log("getting all lists");

    trackPromise(
      Axios.get(`${apiURL}/api/v1/finalcheck/getAllLists`).then((response) => {
        if (!response) {
          console.log("response is empty");
          return;
        }
        let output = response.data.rows;
        // handleArray(output, "title");
        setDataReponse(output);
        // alert("got info")
        return output;
      })
    );
  }, [items, apiURL]);

  function handleArray(input, property) {
    for (let i = 0; i < input.length; i++) {
      setItems((oldArray) => [...oldArray, input[i][property]]);
    }
  }

  // function handleObjectArray(input, propertyOne, propertyTwo) {
  //   for (let i = 0; i < input.length; i++) {
  //     setDataReponse((oldObject) => [
  //       ...oldObject,
  //       { id: input[i][propertyOne], title: propertyTwo },
  //     ]);
  //   }
  // }

  function handleQuery(e) {
    props.listTitle(e.currentTarget.id);
  }

  function toggleCreateList() {
    setNewListClick((prev) => !prev);
  }
  // function refresh(){
  //     inputSearchRef.current.value = ""
  //     inputRef.current.value = ""
  //     setQuery("")
  // }

  return (
    <div className="Home">
      <div className="introduction">
        <p>Find your ulimate packing list</p>
        <h1>For any occasion, trip, and more</h1>
        <p>Click on the desired list or create your own</p>
      </div>
      <div className="search-bar">
        <img src={Iconimg} className="search-bar-icon" />
        <input
          onSubmit={onSearch}
          type="search"
          // name="query"
          ref={inputSearchRef}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search List Name"
          className="search-bar-input"
        />
      </div>

      {newListClick ? (
        <form onSubmit={onSubmit} className="create-list-form">
          <input
            className="create-list-form-input"
            ref={inputRef}
            type="text"
            placeholder="Create New List"
          />
          <button className="creat-list-form-btn" type="submit">
            Add
          </button>
        </form>
      ) : (
        <button className="create-list-btn" onClick={toggleCreateList}>
          Create New List
        </button>
      )}

      <LoadingIndicator />

      <div className="search-output">
        {dataResponse.map((item) => {
          let urlString = `list/${item.id}`;
          return (
            <Link to={urlString}>
              <button
                className="search-output-tile"
                id={item.title}
                onClick={handleQuery}
              >
                {item.title}
              </button>
            </Link>
          );
        })}
      </div>
      {items.map(item => console.log("item is",item))}


      {/* {nodupliateitems.map((item) => {
          let urlString = `/list/${item}`;
          return (
            <Link to={urlString}>
              <button
                className="search-output-tile"
                id={item}
                onClick={handleQuery}
              >
                {item}
              </button>
            </Link>
          );
        })} */}
    </div>
  );
}
