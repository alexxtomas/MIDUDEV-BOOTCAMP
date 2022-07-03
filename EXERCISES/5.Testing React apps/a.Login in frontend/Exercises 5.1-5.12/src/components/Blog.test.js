import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import Toggable from './Togglable'

let blog = null
beforeEach(() => {
  blog = {
    title: 'The most important thing',
    author: 'Alex Tomas',
    url: 'https://helloWorld.com',
    likes: 12
  }
})

test('all info in showed when the component is not a child of Toggable', () => {
  const { container } = render(<Blog blog={blog} />)

  const blogElements = container.querySelector('.blog-elements')

  expect(blogElements).toBeInTheDocument()

  expect(blogElements).toHaveTextContent('The most important thing')
  expect(blogElements).toHaveTextContent('Alex Tomas')
  expect(blogElements).toHaveTextContent('https://helloWorld.com')
  expect(blogElements).toHaveTextContent('likes')
})
