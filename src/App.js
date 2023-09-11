import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState("");
  const [submitEditing, setSubmitEditing] = React.useState([])

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);

    if (loadedTodos) {
      setTodos(loadedTodos);
      console.log("Stored.")
    }
  }, [])

  React.useEffect(() => {
    if ([todos].length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
      console.log("Set")
    }
  }, [todos])
  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {

      setTodos([...todos].concat(newTodo));
      console.log(todos, "added")
      setTodo("");
    } else {
      alert("Enter Valid Task");
      setTodo("");
    }
  }

  // Add the deleteToDo code here
  // function deleteTodo(e) {
  //   e.preventDefault();


  //   let num = undefined
  //   const newTodos = todos.filter((obj, index) => {
  //     if (obj.text.toLowerCase() === todo.toLowerCase()) {
  //       num = index
  //     }
  //     return obj.text.toLowerCase() === todo.toLowerCase()
  //   })

  //   console.log(newTodos, "this is todos.")

  //   if (newTodos.length === 0) {

  //     alert("Please insert a valid todo item.")
  //   } else {

  //     let todosTemp = []
  //     todos.map((todo, index) => {
  //       if (index !== num) {
  //         todosTemp.push(todo)
  //       }

  //     })
  //     setTodos(todosTemp)
  //   }

  // }
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Add the toggleComplete code here
  function toggleComplete(id) {

    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // Add the submitEdits code here
  function submitEdits(id, text) {
    let todosTemp = todos.map((ob, ind) => {
      if (ob.id === id) {
        ob.text = text.trim()
      }
      return ob;
    });
    setTodos(todosTemp)
    setTodoEditing("")
  }


  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Add a new task" type="text" onChange={(e) => setTodo(e.target.value)} align="right" />
        <button type="submit" >Add Todo</button>
        {/* <button type="submit" onClick={deleteTodo}>Delete Todo</button> */}
      </form>
      {todos.map((todo) => <div className="todo" key={todo.id}>
        {todo.id === todoEditing ? (
          <input type="text" onChange={(e) => setSubmitEditing(e.target.value)}></input>
        ) : (
          <div>{todo.text}</div>
        )}

        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
        <div className="todo-actions">
          {todo.id === todoEditing ? (
            <button type="submit" onClick={() => submitEdits(todo.id, submitEditing)}>Submit</button>
          ) : (
            <button type="submit" onClick={() => setTodoEditing(todo.id)}>Edit</button>
          )

          }

        </div>
      </div>)}


    </div>
  );
};
export default App;
