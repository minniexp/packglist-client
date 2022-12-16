import React, {useEffect, useState} from 'react';
import List from '../components/List'
import NewList from '../components/NewList'
import Change from '../components/Change'
import Axios from "axios";
import '../styles/ListView.css'

export default function ListView(props) {
    const listName = props.listTitle
    const [categories, setCategories] = useState([])
    const [newListClick, setNewListClick] = useState(false)
    const [newListCreated, setNewListCreated] = useState(false)
    const [deleteCateogryClick, setDeleteCateogryClick] = useState(false)

    const apiURL = "https://finalcheck-server.onrender.com"


    function handleArray(input, property, filterproperty, filtertitle){
        for (let i = 0; i < input.length; i++) {
            if (input[i][filterproperty] === filtertitle) {
                setCategories(oldArray =>[...oldArray, input[i][property]])
            }
        }
      }
    
    // const filteredItems = items.filter(item => {
    // return item.toLowerCase().includes(query.toLowerCase())
    // })

    const nodupliatecategory = [...new Set(categories)]

    const handleNewListCreated = () => {
        setNewListCreated(prev=>!prev)
    }
    
    // Need to fix handleDelete
    const handleDeleteCateogry = () => {
        setDeleteCateogryClick(prev=>!prev)
    }


    useEffect(()=>{
        setCategories([])
        Axios.get(`${apiURL}/getlist`)
            .then((response)=>{
            let output= response.data.rows
            handleArray(output, "category", "title", listName)
            setNewListClick(false)
            return output
            })
    },[newListCreated, deleteCateogryClick])

      return (
        <div className="listcontent-container">
            <div className="mylist-container">
                <h2 className="listName-header"> <Change select="title" description={listName} handleDeleteCateogry={handleDeleteCateogry}/></h2>
                {/* <li>List1</li>
                <li>List2</li> */}
            </div>
            <div className="list-container">
                {nodupliatecategory.map(category => (<List listName={listName} category={category}/>))}
                <div className="new-list-container">
                    {newListClick ? <NewList listName={listName} newListCreated={newListCreated} handleNewListCreated={handleNewListCreated}></NewList>: <button className="new-list-btn" onClick={()=>setNewListClick(prev=>!prev)}>New List</button>}
                {/* {deleteCateogryClick?"true":"false"} */}
                </div>
                {/* <button onClick={handleDeleteCateogry}>delete</button> */}
            </div>
            



        </div>
    )
}
