declare namespace Cypress {
  interface Chainable<Subject> {
    getByTestAttr(
      selector: string,
      ...options: any
    ): Chainable<JQuery<HTMLElement>>;
    login(pin: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("getByTestAttr", (value: string, ...options: any) => {
  return cy.get(`[data-cy=${value}]`, ...options);
});
