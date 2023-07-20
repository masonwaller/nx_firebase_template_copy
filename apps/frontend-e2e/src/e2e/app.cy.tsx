/* eslint-disable cypress/unsafe-to-chain-command */

describe('frontend', () => {
  beforeEach(() => cy.visit('/blogs'));

  it('should display blogs header', () => {
    cy.get('h1').contains('Blogs are a great way to share your thoughts and opinions with the world.');
  });

  it('should create a new blog', () => {
    cy.get('button').contains('Create Blog').click();
    cy.get('input[id="title"]').type('My First Blog');
    cy.get('textarea[id="description"]').type('This is my first blog.');
    cy.get('textarea[id="blog"]').type('This is my first blog.');
    cy.get('input[id="image"]').type('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
    cy.get('button').contains('Submit').click();
  });

  it('should display new blog', () => {
    cy.get('article').contains('My First Blog');
  });

  it('should edit a blog', () => {
    cy.get('button').contains('Edit').click();
    cy.get('input[id="title"]').clear().type('My First Blog (Edited)');
    cy.get('textarea[id="description"]').clear().type('This is my first blog. (Edited)');
    cy.get('textarea[id="blog"]').clear().type('This is my first blog. (Edited)');
    cy.get('input[id="image"]').clear().type('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
    cy.get('button').contains('Submit').click();
  });

  it('should delete a blog', () => {
    cy.get('button').contains('Delete').click();
  });

  it('should not display deleted blog', () => {
    cy.get('article').contains('My First Blog (Edited)').should('not.exist');
  });

});