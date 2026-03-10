import './App.css'
import { ToDoList } from "./components/ToDoList";


function App() {

  return (
    <div className="card card--accent">
      <h1>My To-do List</h1>
      <ToDoList />
    </div>
  );
}

export default App
