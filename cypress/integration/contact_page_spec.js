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
})
