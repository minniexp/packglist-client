import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

import Axios from "axios";
import '../styles/Home.css'
import Iconimg from "../images/searchIcon.png"
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import {ThreeDots} from 'react-loader-spinner'



export default function Home(props) {
    const [items, setItems] = useState([])
    const [query, setQuery] = useState("")
    const [newListClick, setNewListClick] = useState(false)

    const inputRef = props.inputRef
    const inputSearchRef = props.inputSearchRef
    const apiURL = "https://finalcheck-server.onrender.com"

    const filteredItems = items.filter(item => {
        return item.toLowerCase().includes(query.toLowerCase())})
    
        const nodupliateitems = [...new Set(filteredItems)]

    function onSubmit(e) {
        e.preventDefault()
        console.log("onsubmit called")

        const valueInputList = inputRef.current.value
        if (valueInputList === "") return
        setItems(prev => [...prev, valueInputList])
        inputRef.current.value = ""
        toggleCreateList()
    }

    function onSearch(e) {
    e.preventDefault()

    const valueInputSearch = inputSearchRef.current.value
    props.listTitle(query)
    if (valueInputSearch === "") return
    inputSearchRef.current.value = ""
    }
    
    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
    
        return (
          promiseInProgress && 
          <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                 alignItems: "center"
            }}
            >
                <ThreeDots color="#6F47EB"/>
            </div>
        )
      }

    useEffect(()=>{
        trackPromise(
            Axios.get(`${apiURL}/getlist`)
            .then((response)=>{
            let output= response.data.rows
            handleArray(output, "title")
            // alert("got info")
            return output
        })
        )

        
    },[])
    

        function handleArray(input, property){
        for (let i = 0; i < input.length; i++) {
        setItems(oldArray =>[...oldArray, input[i][property]])
        }
    }

    function handleQuery (e) {
        props.listTitle(e.currentTarget.id)

    }

    function toggleCreateList () {
        setNewListClick(prev => !prev)
    }
    // function refresh(){
    //     inputSearchRef.current.value = ""
    //     inputRef.current.value = ""
    //     setQuery("")
    // }

    return (
        <div className='Home'>
            <div className="introduction">
                <p>Find your ulimate packing list</p>
                <h1>For any occasion, trip, and more</h1>
                <p>Click on the desired list or create your own</p>
            </div>
            <div className='search-bar'>
                <img src={Iconimg} className='search-bar-icon' />
                <input onSubmit = {onSearch}
                    type="search"
                    // name="query"
                    ref={inputSearchRef}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search List Name"
                    className='search-bar-input'
                />
            </div>

            {newListClick ? 
                <form onSubmit = {onSubmit} className='create-list-form'>
                    <input className='create-list-form-input' ref={inputRef} type="text" placeholder="Create New List"/>
                    <button className='creat-list-form-btn' type="submit" >Add</button>
                </form>
                : <button className='create-list-btn' onClick={toggleCreateList}>Create New List</button>
            }


            <LoadingIndicator/>

            <div className='search-output'>
                    {nodupliateitems.map(item => (
                    <Link to="/list"><button className='search-output-tile' id={item} onClick={handleQuery}>{item}</button></Link>
                    ))}
                </div>

        </div>
    )
}