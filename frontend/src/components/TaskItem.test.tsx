import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskItem } from './TaskItem'
import { Task } from '../types/types'

const baseTask: Task = {
  id: 1,
  description: 'Rédiger le rapport',
  is_completed: false,
  category: 1,
  category_name: 'Travail',
  created_at: '2024-01-01',
}

describe('TaskItem', () => {
  it('affiche la description et le nom de la catégorie', () => {
    render(<TaskItem task={baseTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    expect(screen.getByText('Rédiger le rapport (Travail)')).toBeInTheDocument()
  })

  it('applique le style barré quand la tâche est terminée', () => {
    const completedTask: Task = { ...baseTask, is_completed: true }
    render(<TaskItem task={completedTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    const label = screen.getByText('Rédiger le rapport (Travail)')
    expect(label).toHaveStyle({ textDecoration: 'line-through' })
  })

  it('n\'applique pas de style barré quand la tâche est non terminée', () => {
    render(<TaskItem task={baseTask} onDelete={vi.fn()} onToggle={vi.fn()} />)
    const label = screen.getByText('Rédiger le rapport (Travail)')
    expect(label).toHaveStyle({ textDecoration: 'none' })
  })
})
