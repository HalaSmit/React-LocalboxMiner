import React, { useRef, useState, useEffect } from 'react'

export default function LocalboxMiner() {
  const [name, setname] = useState("")
  const [todo, settodo] = useState([])
  const [check, setcheck] = useState(false)
  const [index, setindex] = useState(null)

  const nameref = useRef(null)

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todoList"))
    if (savedTodos) {
      settodo(savedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todo))
  }, [todo])

  function add() {
    if (name !== "") {
      settodo([...todo, name])
      setname("")
    }
    nameref.current.focus();
  }

  function deleteitem(i) {
    const updateitem = [...todo]
    updateitem.splice(i, 1)
    settodo(updateitem)
  }

  function edititem(i) {
    setcheck(true)
    setindex(i)
    setname(todo[i])
    nameref.current.focus();
  }

  function save() {
    const updateitem = [...todo]
    updateitem[index] = name
    settodo(updateitem)
    setcheck(false)
    setname("")
  }

  return (
    <div>
      <h1>Todo</h1>

      <div>
        <input 
          type="text" 
          value={name} 
          ref={nameref} 
          placeholder='Add Your Task...' 
          onChange={(e) => setname(e.target.value)} 
        />&nbsp;

        {check ? (<button onClick={save}>Save</button>) : <button onClick={add}>Add</button>}
        
      </div>
      <div>
        <ul>
          {todo.map((el, i) => (
            <li key={i}>
              {el}&nbsp;
              <button onClick={() => deleteitem(i)}>Delete</button>&nbsp;
              <button onClick={() => edititem(i)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
