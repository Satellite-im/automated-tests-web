declare namespace Cypress {
  interface Chainable<Subject> {
    getByTestAttr(
      selector: string,
      ...options: any
    ): Chainable<JQuery<HTMLElement>>;
    paste(subject: any, text: string): Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("getByTestAttr", (value: string, ...options: any) => {
  return cy.get(`[data-cy=${value}]`, ...options);
});

Cypress.Commands.add("paste", { prevSubject: true }, (subject, text) => {
  const clipboardEvent = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer(),
  });
  clipboardEvent.clipboardData.setData("text/plain", text);
  subject[0].dispatchEvent(clipboardEvent);
  return subject;
});
