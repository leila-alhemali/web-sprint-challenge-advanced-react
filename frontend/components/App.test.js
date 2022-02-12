import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AppFunctional from './AppFunctional'

let upBtn, counter, resetBtn, downBtn

beforeEach(() => {
  render(<AppFunctional/>)
  upBtn = screen.queryByText('UP')
  downBtn = screen.queryByText('DOWN')
  counter = screen.queryByText('0')
  resetBtn = screen.queryByText('reset')
})

afterEach(()=> {
  document.body.innerHTML = ''
})

test('sanity', () => {
  expect(true).toBe(false)
})

test ('Functional and Class-based tabs render', () => {
  expect('Functional').toBeInTheDocument(),
  expect('Class-Based').toBeInTheDocument()
}


test ('Up button renders', () => {
     expect(upBtn).toBeInTheDocument()
})

test ('Down button renders', () => {
    expect(downBtn).toBeInTheDocument()
   
})


test('Down button renders error at lower grid wall', () => {
  fireEvent.click(downBtn)
  fireEvent.click(downBtn)
  screen.getByText("You can't go down")
})


test ('Up button renders error at upper grid wall', () => {
  fireEvent.click(upBtn)
  fireEvent.click(upBtn)
  screen.getByText("You can't go up")
})