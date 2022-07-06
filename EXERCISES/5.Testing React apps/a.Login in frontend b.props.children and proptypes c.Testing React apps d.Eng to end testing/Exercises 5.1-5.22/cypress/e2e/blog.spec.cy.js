const defaultUser = {
  username: 'atomas',
  password: 'laalexpassword',
  name: 'Alex'
}
const { username, password, name } = defaultUser

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username, password, name })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.get('[name="Username"]')
    cy.get('[name="Password"]')
  })

  describe('Login', () => {
    it('succesds with correct credentials', () => {
      cy.get('[name="Username"]').type(username)
      cy.get('[name="Password"]').type(password)
      cy.contains('Login').click()

      cy.contains('Create New Blog')
    })

    it('fails with wrong credentials', () => {
      cy.get('[name="Username"]').type('wrongUsername')
      cy.get('[name="Password"]').type('wrongPassword')
      cy.contains('Login').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in ', () => {
    const blog = {
      title: 'Blog created with Cypress',
      author: 'Cypress',
      url: 'https://byCypress.com'
    }
    const { title, author, url } = blog
    beforeEach(() => {
      cy.login({ username, password })
    })
    it('A blog can be created', () => {
      cy.contains('Create New Blog').click()
      cy.get('[name="title"]').type(title)
      cy.get('[name="author"]').type(author)
      cy.get('[name="url"]').type(url)
      cy.get('[name="create-blog-button"]').click()
      cy.get('.succesfully').contains(`A new blog ${title} by ${author} added`)
      cy.contains(`${title} by ${author}`)
    })

    describe('User can interact with a created Blog', () => {
      beforeEach(() => {
        cy.createBlog({ title, author, link: url })
      })

      it('like a blog', () => {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains(1)
      })

      it.only('delete a blog', () => {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.visit('http://localhost:3000')
        cy.get(`${title} with ${author}`).should('not.exist')
      })
    })
  })
})
