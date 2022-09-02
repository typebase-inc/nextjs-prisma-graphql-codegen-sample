import { waitFor } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { customRender } from '~/libs/test'

import { TodoList } from '.'

test('render loading text correctly', () => {
  const { getByText } = customRender(<TodoList />)
  expect(getByText('loading...')).toBeInTheDocument()
})

test('render todoList correctly', async () => {
  const { findByText } = customRender(<TodoList />)
  expect(await findByText('Todo List')).toBeInTheDocument()
})

test('add todo item correctly', async () => {
  const { user, findByRole, findByText, getByRole } = customRender(<TodoList />)
  const textbox = await findByRole('textbox')
  await user.type(textbox, 'testAddTodo')
  await user.click(getByRole('button', { name: '追加' }))
  expect(await findByText('👀 testAddTodo')).toBeInTheDocument()
})

test('update todo completed correctly', async () => {
  const { user, findAllByRole, getAllByRole } = customRender(<TodoList />)
  await user.click((await findAllByRole('checkbox'))[0])
  await waitFor(() => void expect(getAllByRole('checkbox')[0]).toBeChecked())
})

test('delete todo correctly', async () => {
  const { user, getAllByRole, findAllByRole } = customRender(<TodoList />)
  const windowConfirmSpy = vi.spyOn(window, 'confirm')
  windowConfirmSpy.mockImplementation(() => true)
  await waitFor(() => void expect(getAllByRole('listitem').length).toBe(2))
  await user.click((await findAllByRole('button', { name: '🗑' }))[0])
  await waitFor(() => void expect(getAllByRole('listitem').length).toBe(1))
  windowConfirmSpy.mockRestore()
})
