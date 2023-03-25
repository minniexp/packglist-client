import React, { useEffect, useState } from "react";
import List from "../components/List";
import NewList from "../components/NewList";
import Change from "../components/Change";
import Axios from "axios";
import { useLocation } from "react-router-dom";

import "../styles/ListView.css";

export default function ListView(props) {
  const [categories, setCategories] = useState([]);
  const [changeClick, setChangeClick] = useState(false);
  const [newListClick, setNewListClick] = useState(false);
  const [newListCreated, setNewListCreated] = useState(false);
  const [deleteCateogryClick, setDeleteCateogryClick] = useState(false);
  const [title, setTitle] = useState("");
  const [test, setTest] = useState("");

  // const [currentList, setCurrentList] = useState(()=>{
  //     return window.localStorage.getItem('listClicked') || []
  // })
  // const [currentList, setCurrentList] = useState(props.listTitle)
  const location = useLocation();
  // let listName = props.listTitle;
  let listName = props.listTitle;
  const apiURL = process.env.REACT_APP_API_URL;

  function handleArray(input, property, filterproperty, filtertitle) {
    for (let i = 0; i < input.length; i++) {
      if (input[i][filterproperty] === filtertitle) {
        setCategories((oldArray) => [...oldArray, input[i][property]]);
      }
    }
  }

  // const filteredItems = items.filter(item => {
  // return item.toLowerCase().includes(query.toLowerCase())
  // })

  const nodupliatecategory = [...new Set(categories)];

  const handleNewListCreated = () => {
    setNewListCreated((prev) => !prev);
  };

  // Need to fix handleDelete
  const handleDeleteCateogry = () => {
    setDeleteCateogryClick((prev) => !prev);
  };

  const handleChangeClick = () => {
    setChangeClick(prev => !prev)
  }

  useEffect(() => {
    // setCurrentList(props.listTitle)
    setCategories([]);
    let i = 0;
    i++;
    Axios.get(`${apiURL}/api/v1/finalcheck/getlist${location.pathname}`)
      .then((response) => {
        setTitle(response.data.rows[0].title);
        listName = response.data.rows[0].title;
        setTest(response.data.rows[0].title);
        console.log("listname", response.data.rows[0].title);
        let output = response.data.rows;
        handleArray(output, "category", "title", listName);
        setNewListClick(false);
        return output;
      })
      .catch((error) => console.log(error));
  }, [newListCreated, deleteCateogryClick, changeClick]);

  // useEffect(()=>{
  //     window.localStorage.setItem('listClicked', JSON.stringify(listName))
  // },[listName])

  // useEffect(()=>{
  //     const data = window.localStorage.getItem('listClicked')
  //     if (data !== null ) {
  //         setCurrentList(data)
  //         console.log("useeffect running")
  //     }

  // },[])

  // window.onload = function () {
  //     const data = window.localStorage.getItem('listClicked')
  //     if (data !== null ) {
  //         setCurrentList(data)
  //         console.log("useeffect running")
  //     }
  // }
  // useEffect(()=>{
  //     window.localStorage.setItem('listClicked', currentList)
  // },[currentList])

  return (
    <div className="listcontent-container">
      <div className="mylist-container">
        <h2 className="listName-header">
          <Change select="title" description={listName} test={test} changeClick={changeClick} handleChangeClick={handleChangeClick}/>
        </h2>
        {/* <li>List1</li>
                    <li>List2</li> */}
      </div>
      <div className="list-container">
        {nodupliatecategory.map((category) => (
          category ? <List
            listName={title}
            category={category}
            handleDeleteCateogry={handleDeleteCateogry}
            location={location}
          />
          : ""
        ))}
        <div className="new-list-container">
          {newListClick ? (
            <NewList
              listName={title}
              newListCreated={newListCreated}
              handleNewListCreated={handleNewListCreated}
              // location={location}
            ></NewList>
          ) : (
            <button
              className="new-list-btn"
              onClick={() => setNewListClick((prev) => !prev)}
            >
              New Category
            </button>
          )}
        </div>
        {/* <button onClick={handleDeleteCateogry}>delete</button> */}
      </div>
    </div>
  );
}

// : (
//   <div>
//     <Link to="/">
//       <p className="link-homepage">Go back to Homepage</p>
//     </Link>
//   </div>
// );
