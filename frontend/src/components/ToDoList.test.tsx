import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ToDoList } from './ToDoList'
import * as api from '../api/api'

vi.mock('../api/api')

const mockTasks = [
  { id: 1, description: 'Tâche 1', is_completed: false, category: 1, category_name: 'Travail', created_at: '' },
  { id: 2, description: 'Tâche 2', is_completed: false, category: 1, category_name: 'Travail', created_at: '' },
]

describe('ToDoList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche un indicateur de chargement pendant le fetch', () => {
    vi.mocked(api.getCategories).mockReturnValue(new Promise(() => {}))
    vi.mocked(api.getTasks).mockReturnValue(new Promise(() => {}))
    render(<ToDoList />)
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument()
  })

  it('affiche les tâches après un fetch réussi', async () => {
    vi.mocked(api.getCategories).mockResolvedValueOnce([])
    vi.mocked(api.getTasks).mockResolvedValueOnce(mockTasks)
    render(<ToDoList />)
    expect(await screen.findByText(/Tâche 1/)).toBeInTheDocument()
    expect(screen.getByText(/Tâche 2/)).toBeInTheDocument()
  })

  it('affiche un message d\'erreur si le fetch échoue', async () => {
    vi.mocked(api.getCategories).mockResolvedValueOnce([])
    vi.mocked(api.getTasks).mockRejectedValueOnce(new Error('Erreur serveur'))
    render(<ToDoList />)
    expect(await screen.findByText('Erreur serveur')).toBeInTheDocument()
  })
})
