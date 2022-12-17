import React, { useState, useRef } from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from "./components/Navbar";
// import Axios from "axios";
import ListView from './pages/ListView';


function App() {
  // const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const inputRef = useRef()
  const inputSearchRef = useRef()



  // const filteredItems = items.filter(item => {
  // return item.toLowerCase().includes(query.toLowerCase())
  // })

  // const nodupliateitems = [...new Set(filteredItems)]

  // function onSubmit(e) {
  // e.preventDefault()

  // const valueInputList = inputRef.current.value
  // if (valueInputList === "") return
  // setItems(prev => [...prev, valueInputList])
  // inputRef.current.value = ""
  // }

  // function onSearch(e) {
  // e.preventDefault()

  // const valueInputSearch = inputSearchRef.current.value
  // if (valueInputSearch === "") return
  // inputSearchRef.current.value = ""
  // }
  
  // useEffect(()=>{

  //   Axios.get('http://localhost:4000/getlist')
  //   .then((response)=>{
  //     let output= response.data.rows
  //     handleArray(output, "title")
  //     // alert("got info")
  //     return output
  //  })
  // },[])

  //   function handleArray(input, property){
  //   for (let i = 0; i < input.length; i++) {
  //     setItems(oldArray =>[...oldArray, input[i][property]])
  //   }
  // }

  // function handleQuery (e) {
  //   setQuery(e.currentTarget.id)
  // }

  function refresh(){
    inputSearchRef.current.value = ""
    inputRef.current.value = ""
    setQuery("")
  }

  return (
    <div className="App">
      <Navbar refresh={refresh}/>
      <Routes>
            <Route 
              path='/' 
              element=
                {<Home 
                  inputSearchRef={inputSearchRef}
                  inputRef={inputRef}
                  listTitle={input => setQuery(input)}/>}
            />
            <Route 
              path='/list' 
              element=
                {<ListView 
                  listTitle={query}/>
                } />
      </Routes>
      {/* Serach Bar */}
      {/* Search: 
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
          New Item: <input ref={inputRef} type="text" />
          {query && <button type="submit">Add</button>}
      </form>


      {nodupliateitems.map(item => (
      <Link to="/list"><button id={item} onClick={handleQuery}>{item}</button></Link>
      ))} */}


    </div>
  );
}

export default App;


/* FOR LATER 

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [array, setArray] = useState([])


  function handleName(event) {
    return setUsername(event.target.value)
    }


  function handlePass(event) {
    return setPassword(event.target.value)
    }

  useEffect(()=>{

      Axios.get('http://localhost:4000/getuser')
      .then((response)=>{
        let output= response.data.rows
        handleArray(output, "username")
        // alert("got info")
        return output
     })
    },[])

  const getUserData = () => {
  Axios.get('http://localhost:4000/getuser')
    .then((response)=>{
      let output= response.data.rows
      handleArray(output, "username")
      alert("got info")
      return output
    })
  }
  
  function handleArray(input, property){
    for (let i = 0; i < input.length; i++)
    setArray(oldArray =>[...oldArray, input[i][property]])
  }

  const submitReview = () => {
  Axios.post('http://localhost:4000/adduser', {username: username, password:password}).then(()=>{
    alert("successful insert")
  })
  };


  return (
    <button onClick={getUserData}>Get Information</button>
    <br/>
    <br/>
    <input type="text" name="username" onChange={handleName}/>
    <p>{username}</p>
    <input type="text" name="password" onChange={handlePass}/>
    <p>{password}</p>
    <button onClick={submitReview}>Submit</button>
    <button onClick={getUserData}>Get Information</button>

    {array.map(val => {
      return (
        <>
          <input type="checkbox" id="completed"/>
          <label htmlFor="completed">{val}</label>
        </>)}

              <Route 
              path='/' 
              element=
                {<Home 
                  onSearch={onSearch} 
                  inputSearchRef={inputSearchRef}
                  onChange={e => setQuery(e.target.value)}
                  onSubmit = {onSubmit}/>}
                  inputRef={inputRef}
                  handleQuery={handleQuery}
                  nodupliateitems={nodupliateitems} /> 
    )}
  )
*/


