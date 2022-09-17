describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', {
      username: 'testuser',
      name: 'Test User',
      password: 'salainen',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
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
          url: 'a test url',
        })
      })

      it('a blog is visible', function () {
        cy.contains('a test blog')
        cy.contains('a test author')
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: '1 like',
          author: 'test author',
          url: 'test url',
          likes: 1,
        })
        cy.createBlog({
          title: '3 likes',
          author: 'test author',
          url: 'test url',
          likes: 3,
        })
        cy.createBlog({
          title: '2 likes',
          author: 'test author',
          url: 'test url',
          likes: 2,
        })
      })

      it('blogs are ordered by likes', function () {
        cy.get('#blogdisplay').then((blogs) => {
          cy.wrap(blogs[0]).contains('3 likes')
          cy.wrap(blogs[1]).contains('2 likes')
          cy.wrap(blogs[2]).contains('1 like')
        })
      })
    })

    describe('blog view', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a test blog',
          author: 'a test author',
          url: 'a test url',
        })

        cy.contains('a test blog').click()
      })

      it('a blog can be liked', function () {
        cy.contains('like').click()
        cy.contains('1 likes')
      })

      it('a blog can be removed', function () {
        cy.clock(new Date())
        cy.contains('remove').click()

        cy.get('#notification').contains(
          'blog a test blog by a test author removed'
        )
        cy.tick(6000)
        cy.contains('a test blog').should('not.exist')
      })

      it('comments can be added', function () {
        cy.get('[type=text]').type('a test comment')
        cy.contains('add comment').click()

        cy.contains('a test comment')
      })
    })

    describe('blogs by other users', function () {
      beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/users/', {
          username: 'testuser2',
          name: 'Test User 2',
          password: 'salainen',
        })
        cy.login({ username: 'testuser2', password: 'salainen' })
        cy.createBlog({
          title: 'a test blog 2',
          author: 'a test author 2',
          url: 'a test url 2',
        })
        cy.login({ username: 'testuser', password: 'salainen' })
        cy.contains('a test blog 2').click()
      })

      it('a blog created by other user can not be removed', function () {
        cy.contains('remove').click()
        cy.get('#notification')
          .should('contain', 'error: only the creator of a blog can delete it')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
        cy.contains('a test blog 2')
      })
    })
  })
})
