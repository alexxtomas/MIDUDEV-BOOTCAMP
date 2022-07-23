Cypress.Commands.add('createUser', ({ username, password, name }) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username,
    password,
    name
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then((res) =>
    localStorage.setItem('loggedCredentiales', JSON.stringify(res.body))
  )
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', ({ title, author, link }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url: link },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedCredentiales')).token
      }`
    }
  })
  cy.visit('http://localhost:3000')
})
