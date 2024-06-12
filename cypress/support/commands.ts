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

let last8Chars; // Declare the variable outside the tests to make it accessible

// Command to trigger the context menu when doing right-click on the username
Cypress.Commands.add('getClipboardTextAndTriggerContextMenu', () => {
  return cy.window().then((win) => {
    return win.navigator.clipboard.readText().then((clipboardText) => {
      cy.wrap(clipboardText).as('clipboardText'); // Save clipboard text as an alias
      return cy.get('[data-cy="input-settings-profile-short-id"]').then(($input) => {
        const element = $input[0];
        element.dispatchEvent(
          new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: false,
            view: window,
            button: 2,
          })
        );
      });
    });
  });
});

// Command to trigger the copy when clicking on the username
Cypress.Commands.add('getClipboardTextAndTriggerCopy', () => {
  return cy.get('[data-cy="input-settings-profile-short-id"]').then(($input) => {
    const element = $input[0];
    element.select(); // Select the input element
    document.execCommand('copy'); // Copy the selected text
    return cy.window().then((win) => {
      return win.navigator.clipboard.readText().then((clipboardText) => {
        cy.wrap(clipboardText).as('clipboardText'); // Save clipboard text as an alias
      });
    });
  });
});
