import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import Axios from "axios";

export default function Home(props) {

    const [items, setItems] = useState([])
    const [query, setQuery] = useState("")

    const inputRef = props.inputRef
    const inputSearchRef = props.inputSearchRef
    const apiURL = "https://finalcheck-server.onrender.com"

    const filteredItems = items.filter(item => {
        return item.toLowerCase().includes(query.toLowerCase())})
    
        const nodupliateitems = [...new Set(filteredItems)]

    function onSubmit(e) {
    e.preventDefault()

    const valueInputList = inputRef.current.value
    if (valueInputList === "") return
    setItems(prev => [...prev, valueInputList])
    inputRef.current.value = ""
    }

    function onSearch(e) {
    e.preventDefault()

    const valueInputSearch = inputSearchRef.current.value
    props.listTitle(query)
    if (valueInputSearch === "") return
    inputSearchRef.current.value = ""
    }
    
    useEffect(()=>{

        Axios.get(`${apiURL}/getlist`)
        .then((response)=>{
        let output= response.data.rows
        handleArray(output, "title")
        // alert("got info")
        return output
    })
    },[])

        function handleArray(input, property){
        for (let i = 0; i < input.length; i++) {
        setItems(oldArray =>[...oldArray, input[i][property]])
        }
    }

    function handleQuery (e) {
        props.listTitle(e.currentTarget.id)

    }

    // function refresh(){
    //     inputSearchRef.current.value = ""
    //     inputRef.current.value = ""
    //     setQuery("")
    // }

    return (
        <div className='Home'>
            Search: 
            <input onSubmit = {onSearch}
                type="search"
                // name="query"
                ref={inputSearchRef}
                onChange={e => setQuery(e.target.value)}
                // placeholder="Search List Name"
            />

            <br/>
            <br/>

            <form onSubmit = {onSubmit}>
                New List: <input ref={inputRef} type="text" />
                <button type="submit">Add</button>
            </form>


            {nodupliateitems.map(item => (
            <Link to="/list"><button id={item} onClick={handleQuery}>{item}</button></Link>
            ))}
        </div>
    )
}