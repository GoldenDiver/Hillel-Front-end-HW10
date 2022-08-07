import TodoItem from "./TodoItem";
import React, { useEffect, useState } from 'react';

export default function TodosList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [loader, setLoader] = useState('');
  const [edit, setEdit] = useState();
  const [newTitle, setNewTitle] = useState();
  const url = "https://612687da3ab4100017a68fd8.mockapi.io/todos";

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setTodos(data))
      .then(setLoader("hidden"))
  }, [])

  function onInputChange(e) {
    setTitle(e.target.value);
  }

  function onSubmitButtonClick(e) {
    e.preventDefault();
    const newItem = {
      title,
      completed: false,
    };
    setLoader("");
    fetchUrl(undefined, newItem, "POST")
      .then((resp) => resp.json())
      .then((data) => setTodos((prevTodos) => [...prevTodos, data]))
      .then(setLoader("hidden"))
      .then(setTitle(""))
  }

  function onItemClick(id) {
    const item = todos.find((todo) => todo.id === id);
    const newItem = { ...item, completed: !item.completed };
    fetchUrl(id, newItem, "PUT");
    setTodos(todos.map((item) => (item.id === id ? newItem : item)))
  }

  function onDeleteButtonClick(id) {
    fetch(url + "/" + id, {
      method: "DELETE",
    });
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function onEditButtonClick(title, id) {
    const item = todos.find((todo) => todo.id === id);
    if (edit!==title) {
      setEdit(title)

    } else {
      setTitle(newTitle)
      setEdit(undefined)
      const newItem = { ...item, title: newTitle};
      fetchUrl(id, newItem, "PUT");
      
      setTodos(todos.map((item) => (item.id === id ? newItem : item)))
    } 
  }

  function onEditChange(e) {
    setNewTitle(e.target.value)
  }

  function fetchUrl(id, newItem, method){
    return (
      fetch(url + (id===undefined ? "" : ("/" + id)), {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        })
    )
  }

  return (
    <>       
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            item={todo}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            onItemClick={onItemClick}
            isEdit={edit}
            onEditChange={onEditChange}
          />
        ))}      
      </ul>   
      <img hidden={loader} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAaVBMVEX///8AAACVlZXW1tbo6OgYGBhYWFj4+PjJycn8/Pynp6fT09OwsLDOzs5JSUnb29tSUlJkZGTw8PBeXl6Dg4PBwcFBQUG4uLiNjY12dnYyMjKfn58hISHi4uI3Nzd9fX0MDAwoKChubm6xHIQ8AAADkUlEQVRoge1aa5uyIBBV85Jl3vKW1rb1/3/kaoUyMCgIvh/ep/OtBT0CczkzrGUpIHF8z/Z8Z6fykBpOsU1QnTbiaGwazSYcdxvisgGHY7Mwv5aE47DtxDTJGSFJDXPkCIdt38ySHFCSg1mSC0qSmSVJUZLYLEklR5K7uQYJZlwMya1pX3+sHFfihYHrctMalKSgKOjPuCzR7LPhg6oCmuceJSnHcdb66jmKfDrhAgygJCEZLbghR8wBgkcVUCMdwjG+CNtMoQ8xfu1TQ+EP9xqPjJXoMkWJjbUh+mv4CEniY+ihJBXOceS+NZwZ3ZMBPOTQZkGDTUvMvDymRqrJSvmNfMPnCIZl827N5KWa2F5MmSiWad7AvD+/ctO4COiWXdOVwNdqIQkmNvJfuRUzwIPBAMyKg5abJiMW8CwwAHVIPgrKZCVFEt4WZeIpL2MIImx6wB6KVObD/X0A7vOsocgsxHJFHF6APwCj6R6fxMIXkAitxlHnEO7XUfjEjnzXXT5b4wJg9kDzyOmdWprBEp2K4ERWA9sw83USH7+2KJISGFx/pIxfHYfHSNHOahU9nJxzHMeZIzbdL/5/JFHTxw2dQmIREcnkGV0h58dyZyzYuA/KL0fdnmSv308z1ewOBpiP4onGP5hwVZeVxq/kRcdQ2UQ1Az5R9p8e0L9FeVkeSE12ZYUQKmP0FjLsD5R02vU/wtHrdnhOuvX/DiOJWZJw+UVzQKWLx2ziWXMlAhJY1+o2friS8L1dsOTVDWkhRlJAG9Z3+RghGVTcpE07bQ7sUN5F9P4tNFMjYolfCnHwW32oDWmlG8uha7AoTpDDdM/1g4SucLdohL8QdkS1pgZyh5jm2BX3JtpIEn/xxRcGkeerJF4QPVP/UkspkSh+/LaZeswpP/GqXc5KLmnAPhU5qCS+1DOhVIVaHgCibiEuZkjWlALoFM1rXdDveShwMB3oWWEFFb7CjSjTwZk1m1XtwQHM9cqsfGvWkkSQZNa+4FyFOpWRwLPmBXTxjzyHZYF+l+B+hoDeLyU9CdTpQmswnG7n0Dv9pDmn5wbbR8pmFhV1QPr76L0EGbwjUXA0MBknTor44XeYOwXTxRK2627TH0zraFY4dOGnGj9lAYX0Rv8f8wQkxfIDa2C24BcAcCw53Fr8k5XAJsxGxQ3MGVtVN/Ql70aVYO/S0+2dfvNNiBuRC+mmDd/yebWvd+Xz+AMSoyNQ5OZrmwAAAABJRU5ErkJggg==" />
      <form action="">
        <fieldset>
          <legend>Enter new todo</legend>
          <input 
            type='input'
            value={title}
            onChange={onInputChange}
          />
          <button onClick={onSubmitButtonClick}>Add</button>
        </fieldset>
      </form>
    </>
    
  );
}
