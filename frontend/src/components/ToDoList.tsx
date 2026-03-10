import { useState, useEffect } from "react";
import { Category, Task } from "../types/types";
import {
  createCategory,
  createTask,
  deleteTask,
  getCategories,
  getTasks,
  updateTask,
} from "../api/api";
import axios from "axios";

export function ToDoList() {
  const [task, setTask] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  // add default category
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
  const [taskCategory, setTaskCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [categories, tasks] = await Promise.all([
          getCategories(),
          getTasks(),
        ]);
        setCategoryList(categories);
        setTaskList(tasks);
      } catch (error) {
        const msg = getErrorMessage(error, "Failed to load. Please try again.");
        setError(msg);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tasks = await getTasks(selectedFilterCategory);
        setTaskList(tasks);
      } catch (error) {
        const msg = getErrorMessage(error, "Failed to load tasks.");
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [selectedFilterCategory]);

  const handleAddCategory = async () => {
    setError(null);
    if (newCategory.trim()) {
      try {
        const category = await createCategory(newCategory);
        setCategoryList([...categoryList, category]);
        setNewCategory("");
      } catch (error) {
        const msg = getErrorMessage(error, "Failed to load. Please try again.");
        setError(msg);
        console.error(error);
      }
    }
  };

  const handleAddTask = async () => {
    setError(null);
    if (!task.trim()) {
      setError("Task description is required.");
      return;
    }
    if (!taskCategory) {
      setError("Please select a category.");
      return;
    }
    try {
      const newTask = await createTask(task, Number(taskCategory));
      if (
        !selectedFilterCategory ||
        selectedFilterCategory === String(newTask.category)
      ) {
        setTaskList([...taskList, newTask]);
      }
      setTask("");
      setTaskCategory("");
    } catch (error) {
      const msg = getErrorMessage(
        error,
        "Failed to create task. Please try again."
      );
      setError(msg);
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setError(null);
    try {
      await deleteTask(id);
      setTaskList(taskList.filter((t) => t.id !== id));
    } catch (error) {
      const msg = getErrorMessage(
        error,
        "Failed to delete task. Please try again."
      );
      setError(msg);
      console.error(error);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    setError(null);
    try {
      const updatedTask = await updateTask(id, {
        is_completed: !currentStatus,
      });
      setTaskList((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      const msg = getErrorMessage(error, "Failed to load tasks.");
      setError(msg);
      console.error(error);
    }
  };

  // const filteredTasks = selectedFilterCategory
  //   ? taskList.filter((t) => t.category_name === selectedFilterCategory)
  //   : taskList;

  const getErrorMessage = (error: unknown, defaultMessage: string): string => {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (Array.isArray(data)) return data.join(", ");
        if (typeof data === "object" && data !== null) {
          return Object.values(data).flat().join(", ");
        }
      }
    }
    if (error instanceof Error) return error.message;
    return defaultMessage;
  };

  return (
    <>
      {/* error display */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* create category */}
      <div style={{ display: "flex" }}>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder="Add new category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* create task */}
      <div style={{ marginTop: "1em", display: "flex" }}>
        <input
          type="text"
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categoryList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* filter dropdown */}
      <div style={{ marginTop: "1em" }}>
        <label htmlFor="category-filter">Filter by category: </label>
        <select
          id="category-filter"
          value={selectedFilterCategory}
          onChange={(e) => setSelectedFilterCategory(e.target.value)}
        >
          <option value="">All</option>
          {categoryList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* to do list */}

      <div style={{ marginTop: "1em" }}>
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : taskList.length === 0 ? (
          <p>No tasks to show</p>
        ) : (
          <ul>
            {taskList.map((task) => (
              <li key={task.id}>
                <input
                  id={`task-${task.id}`}
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() =>
                    handleToggleStatus(task.id, task.is_completed)
                  }
                />
                <label
                  htmlFor={`task-${task.id}`}
                  style={{
                    textDecoration: task.is_completed ? "line-through" : "none",
                  }}
                >
                  {task.description} ({task.category_name})
                </label>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
