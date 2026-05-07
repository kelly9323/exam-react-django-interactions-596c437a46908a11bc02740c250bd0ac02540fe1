import { Task } from '../types/types'

interface TaskItemProps {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number, currentStatus: boolean) => void
}

export function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  return (
    <li>
      <input
        id={`task-${task.id}`}
        type="checkbox"
        checked={task.is_completed}
        onChange={() => onToggle(task.id, task.is_completed)}
      />
      <label
        htmlFor={`task-${task.id}`}
        style={{ textDecoration: task.is_completed ? 'line-through' : 'none' }}
      >
        {task.description} ({task.category_name})
      </label>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  )
}
