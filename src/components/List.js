import React, {useState, useEffect, useRef} from "react"
import EditList from './EditList'
import Change from './Change'

// import { SlOptionsVertical, SlTrash } from "react-icons/sl"
// import {MdOutlineCancel} from "react-icons/md"
import Axios from "axios"

import '../styles/List.css'

export default function List(props) {
    const listName = props.listName
    const category = props.category
    const [taskObjects, settaskObjects] = useState([])
    const [newTaskClick, setNewTaskClick] = useState(false)
    const [deleteCategory, setDeleteCategory] = useState(false)
    const [optionsCategory, setOptionsCategory] = useState(false)

    
    
    const [newItem, setNewItem] = useState('')
    const apiURL = "https://finalcheck-server.onrender.com"

    const inputRef = useRef()

    function handleNewTask (e) {
        setNewItem(e.target.value)
    }

    
    function handleObjectArray(input, property, titleproperty, filtertitle, categoryproperty, filtercategory){
    for (let i = 0; i < input.length; i++) {
        if (input[i][titleproperty] === filtertitle) {
            if(input[i][categoryproperty] === filtercategory) {
                settaskObjects(oldArray =>[...oldArray, {"id":input[i]["id"], "task":input[i][property]}])
            }
        }
    }
    }

    useEffect(()=>{
        settaskObjects([])
        Axios.get(`${apiURL}/getlist`)
            .then((response)=>{
            let output= response.data.rows
            handleObjectArray(output, "item", "title", listName, "category", category)
            return output
            })
    }, [newTaskClick])
    
    const submitReview = () => {


        Axios.post(`${apiURL}/additem`, {title: listName, category:category, item:newItem}).then(()=>{
          console.log("successful insert")
          setNewTaskClick(prev=>!prev)

        })
        inputRef.current.value=""

        };

    // const deleteItem = () => {
    //     Axios.post(`${apiURL}/deletecategory`, {id: editId}).then(()=>{
    //         console.log("successfuly deleted category")

    //     })
    //     setDeleteTask(true)
    //     inputRef.current.value=""
    //     setOptionsClick(prev=>!prev)
    //     };
    
    return (
        <div className='todo-container'>

            <p><Change select="category" description={category} title={listName}/></p>
            <div className="checklist-total">
                <table>
                    {taskObjects.map((item, key) => (
                        <tr className="checklist">
                            {/* <th className="checklist-checkbox">
                                <input className="checkbox" type="checkbox" id="completed"/>    
                            </th>
                            <th className="checklist-description">
                                <label htmlFor="completed" key={key}>{item.task}</label>
                            </th> */}
                            <EditList
                                key={key}
                                id={item.id}
                                task={item.task}                                
                            />
                        </tr>
                    ))}
                </table>
            </div>
            <br/>
            <br/>
            
         
            <div className="checklist-add">
                <input type="text" name="username" className="checklist-add" ref={inputRef} onChange={handleNewTask} />
                <button onClick={submitReview}>Submit</button>
            </div>

        </div>
    )
}