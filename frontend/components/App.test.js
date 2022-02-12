import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from './AppFunctional'

let upBtn, counter, resetBtn

beforeEach(() => {
  render(<AppFunctional/>)
  upBtn = screen.queryByText('UP')
  counter = screen.queryByText('0')
  resetBtn = screen.queryByText('reset')
})

afterEach(()=> {
  document.body.innerHTML = ''
})

test('sanity', () => {
  expect(true).toBe(false)
})

test ('Counter updates on direction button click', () => {
    fireEvent.click(upBtn)
    console.log(upBtn)
    expect(counter).toBe('1')
})

test ('Header renders', () => {
     const header = screen.getByText('Welcome to the GRID')
     expect(header).toBeInTheDocument()
})

test ('we can submit an email address', () => {
    const emailInput = screen.getAllByPlaceholderText('type email')
    const submitBtn = screen.queryAllByText('Submit')
    fireEvent.change(emailInput, { target: { value: 'valid@email.address' }})
    fireEvent.click(submitBtn)
    expect('valid win').toBeInTheDocument()
})


test('we can reset the grid', () => {
    fireEvent.click(upBtn)
    fireEvent.click(resetBtn)
    expect(counter).toBe('0')
})

test ('Up button renders error at upper grid wall', () => {
  fireEvent.click(upBtn)
  fireEvent.click(upBtn)
  expect("You can't go up").toBeInTheDocument
})