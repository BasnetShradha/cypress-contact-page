describe('Contact Form', () => {
  let url = 'http://sample-website.beforeyoubid.com.au/contact'
  let long_string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  context('when none of the fields are filled', () => {
    it('returns validation error messages', () => {
      cy.visit(url)

      cy.contains('Submit').click()

      cy.contains('Your name is required')
      cy.contains('Your email is required')
      cy.contains('Did you forget to leave us a message?')
    })
  })

  context('when some of the fields have various forms of data', () => {
    context('contact name', () => {
      beforeEach(() => {
        cy.visit(url)

        cy.get('[data-cy=input-email]')
          .click()
          .type('bella.vista@test.com')

        cy.get('[data-cy=input-phone]')
          .click()
          .type('1234456789')

        cy.get('[data-cy=input-message]')
          .click()
          .type('Hi, This is Bella Vista.')
      })

      context('when contact name has special characters', () => {
        it('does not return validation error message', () => {
          cy.get('[data-cy=input-name]')
            .click()
            .type('Bella %%% Vista')

          cy.contains('Submit').click()
          cy.contains('Your message has been sent :)')
        })
      })

      context('when contact name are numbers', () => {
        it('does not return validation error message', () => {
          cy.get('[data-cy=input-name]')
            .click()
            .type('123456')

          cy.contains('Submit').click()
          cy.contains('Your message has been sent :)')
        })
      })

      context('when contact name has long string', () => {
        it('does not return validation error message', () => {
          cy.get('[data-cy=input-name]')
            .click()
            .type(long_string)

          cy.contains('Submit').click()
          cy.contains('Your message has been sent :)')
        })
      })
    })

    context('contact email', () => {
      beforeEach(() => {
        cy.visit(url)

        cy.get('[data-cy=input-name]')
          .click()
          .type('Bella Vista')

        cy.get('[data-cy=input-phone]')
          .click()
          .type('1234456789')

        cy.get('[data-cy=input-message]')
          .click()
          .type('Hi, This is Bella Vista.')
      })

      context('when contact email has only numbers', () => {
        it('does not return validation error message', () => {
          cy.get('[data-cy=input-email]')
            .click()
            .type('123455')

          cy.contains('Submit').click()
          cy.contains('Your message has been sent :)')
        })
      })

      context('when contact email has alphanumeric and special characters', () => {
        it('does not return validation error message', () => {
          cy.get('[data-cy=input-email]')
            .click()
            .type('hey%%@tesst.23#acom')

          cy.contains('Submit').click()
          cy.contains('Your message has been sent :)')
        })
      })

      context('when contact email is not in correct format', () => {
        it('does not return validation error message', () => {
          cy.get('[data-cy=input-email]')
            .click()
            .type('hello@@test..com')

          cy.contains('Submit').click()
          cy.contains('Your message has been sent :)')
        })
      })

      context('when contact email has long string', () => {
        it('does not return validation error message', () => {
          cy.get('[data-cy=input-email]')
            .click()
            .type(long_string)

          cy.contains('Submit').click()
          cy.contains('Your message has been sent :)')
        })
      })
    })
  })

  context('when all the fields have valid data', () => {
    it('returns success messages', () => {
      cy.visit(url)

      cy.get('[data-cy=input-name]')
        .click()
        .type('Bella Vista')

      cy.get('[data-cy=input-email]')
        .click()
        .type('bella.vista@test.com')

      cy.get('[data-cy=input-phone]')
        .click()
        .type('1234456789')

      cy.get('[data-cy=input-message]')
        .click()
        .type('Hi, This is Bella Vista.')

      cy.contains('Submit').click()

      cy.contains('Your message has been sent :)')
    })
  })
})
