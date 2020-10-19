describe('Contact Form', () => {
  let url = 'http://sample-website.beforeyoubid.com.au/contact'

  context('when none of the fields are filled', () => {
    it('returns validation error messages', () => {
      cy.visit(url)

      cy.contains('Submit').click()

      cy.contains('Your name is required')
      cy.contains('Your email is required')
      cy.contains('Did you forget to leave us a message?')
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
