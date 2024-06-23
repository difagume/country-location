import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../src/pages/index'

test('Page', () => {
  render(<Home country={null} />)
  const heading = screen.getByText('Country location') // Buscamos el texto dentro del componente
  expect(heading).toBeDefined()
})