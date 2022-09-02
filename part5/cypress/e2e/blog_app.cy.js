describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', {
      username: 'testuser',
      name: 'Test User',
      password: 'salainen'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a test blog')
      cy.get('#author').type('a test author')
      cy.get('#url').type('a test url')
      cy.get('#create-button').click()

      cy.get('#blogdisplay').contains('a test blog')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a test blog',
          author: 'a test author',
          url: 'a test url'
        })
      })

      it('a blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1 likes')
      })

      it('a blog can be removed', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('#blogdisplay').should('not.contain', 'a test blog')
      })
    })
  })

  describe('blogs by other users', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/users/', {
        username: 'testuser2',
        name: 'Test User 2',
        password: 'salainen'
      })
      cy.login({ username: 'testuser2', password: 'salainen' })
      cy.createBlog({
        title: 'a test blog 2',
        author: 'a test author 2',
        url: 'a test url 2',
      })
      cy.login({ username: 'testuser', password: 'salainen' })
    })

    it('a blog created by other user can not be removed', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('#blogdisplay').should('contain', 'a test blog 2')
      cy.get('.error')
        .should('contain', 'error: only the creator of a blog can delete it')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})