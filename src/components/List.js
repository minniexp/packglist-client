import React, {useState, useEffect, useRef} from "react"
import Axios from "axios"

import '../styles/List.css'

export default function List(props) {
    const listName = props.listName
    const category = props.category
    const [tasks, setTasks] = useState([])
    const [newItem, setNewItem] = useState('')
    const apiURL = "https://finalcheck-server.onrender.com"

    const inputRef = useRef()

    function handleNewTask (e) {
        setNewItem(e.target.value)
    }

    function handleArray(input, property, titleproperty, filtertitle, categoryproperty, filtercategory){
        for (let i = 0; i < input.length; i++) {
            if (input[i][titleproperty] === filtertitle) {
                if(input[i][categoryproperty] === filtercategory) {
                    setTasks(oldArray =>[...oldArray, input[i][property]])
                }
            }
        }
      }

    useEffect(()=>{
     Axios.get(`${apiURL}/getlist`)
    .then((response)=>{
        let output= response.data.rows
        handleArray(output, "item", "title", listName, "category", category)
        return output
    })
    }, [])

    const submitReview = () => {
        Axios.post(`${apiURL}/additem`, {title: listName, category:category, item:newItem}).then(()=>{
          console.log("successful insert")

        })
        setTasks(oldArray =>[...oldArray, newItem])
        inputRef.current.value=""

        };
    
    return (
        <div className='todo-container'>
            <p>{category}</p>
            <div className="checklist-total">
                <table>
                    {tasks.map(task => (
                        <tr className="checklist">
                            <th className="checklist-description">
                                <label htmlFor="completed">{task}</label>
                            </th>
                            <th className="checklist-checkbox">
                                <input className="checkbox" type="checkbox" id="completed"/>    
                            </th>
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