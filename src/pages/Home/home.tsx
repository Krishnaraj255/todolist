import React, { useState } from "react";
import '../../App.css'
import { MdDelete } from "react-icons/md";

interface Todo {
  text: string;
  completed: boolean;
}

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [searchtodo, setSearchtodo] = useState<string>("")

  const addTodo = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  })
    .filter((todo) => {
      return todo.text.toLowerCase().includes(searchtodo.toLowerCase())
    });


  return (
    <div className="home">
      <h2 className="title">
        ToDo List <span role="img" aria-label="note">📝</span>
      </h2>

      <div className="input-div">
        <input
          type="text"
          placeholder="Add your task"
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="status">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {todos.length > 0 && (
        <div className='search'>
          <input placeholder='Search Todo' value={searchtodo} onChange={(e) => setSearchtodo(e.target.value)} />
        </div>
      )}

      <ul className="list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className="item">
            <div className="left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
              </span>
            </div>
            <div className="actions">
              <button className="del-btn" onClick={() => deleteTodo(index)}>
                <MdDelete size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
