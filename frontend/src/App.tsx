import './App.css'
import * as Sentry from "@sentry/react";
import { ToDoList } from "./components/ToDoList";

function testSentry() {
  try {
    throw new Error("Sentry test error");
  } catch (e) {
    Sentry.captureException(e);
    alert("Sentry test error sent!");
  }
}

function App() {

  return (
    <div className="card card--accent">
      <h1>My To-do List</h1>
      <ToDoList />
      <button onClick={testSentry} style={{ marginTop: "2em" }}>
        Test Sentry
      </button>
    </div>
  );
}

export default App
