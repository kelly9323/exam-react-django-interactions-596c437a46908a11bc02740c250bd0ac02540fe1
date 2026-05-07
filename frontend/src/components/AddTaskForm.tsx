import { useState } from 'react'
import { Category } from '../types/types'

interface AddTaskFormProps {
  categories: Category[]
  onSubmit: (description: string, categoryId: number) => void
}

export function AddTaskForm({ categories, onSubmit }: AddTaskFormProps) {
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const isDisabled = !description.trim() || !categoryId

  const handleSubmit = () => {
    onSubmit(description, Number(categoryId))
    setDescription('')
    setCategoryId('')
  }

  return (
    <div style={{ marginTop: '1em', display: 'flex' }}>
      <input
        type="text"
        placeholder="Add new task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} disabled={isDisabled}>
        Ajouter
      </button>
    </div>
  )
}
