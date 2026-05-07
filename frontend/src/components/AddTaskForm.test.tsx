import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTaskForm } from './AddTaskForm'
import { Category } from '../types/types'

const categories: Category[] = [{ id: 1, name: 'Travail' }]

describe('AddTaskForm', () => {
  it('contient un champ texte et un select de catégorie', () => {
    render(<AddTaskForm categories={categories} onSubmit={vi.fn()} />)
    expect(screen.getByPlaceholderText('Add new task')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('le bouton est désactivé si le titre est vide', () => {
    render(<AddTaskForm categories={categories} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /ajouter/i })).toBeDisabled()
  })

  it('le bouton est désactivé si aucune catégorie n\'est sélectionnée', async () => {
    const user = userEvent.setup()
    render(<AddTaskForm categories={categories} onSubmit={vi.fn()} />)
    await user.type(screen.getByPlaceholderText('Add new task'), 'Ma tâche')
    expect(screen.getByRole('button', { name: /ajouter/i })).toBeDisabled()
  })

  it('appelle onSubmit avec les bonnes données quand le formulaire est soumis', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<AddTaskForm categories={categories} onSubmit={onSubmit} />)

    await user.type(screen.getByPlaceholderText('Add new task'), 'Ma nouvelle tâche')
    await user.selectOptions(screen.getByRole('combobox'), '1')
    await user.click(screen.getByRole('button', { name: /ajouter/i }))

    expect(onSubmit).toHaveBeenCalledWith('Ma nouvelle tâche', 1)
  })
})
