declare namespace Cypress {
  interface Chainable<Subject> {
    getByTestAttr(
      selector: string,
      ...options: any
    ): Chainable<JQuery<HTMLElement>>;
    paste(subject: any, text: string): Chainable<JQuery<HTMLElement>>;
    getClipboardTextAndTriggerContextMenu(): void;
    getClipboardTextAndTriggerCopy(): void;
    assertText(
      element: Chainable<JQuery<HTMLElement>>,
      text: string,
      message: string,
    ): Chainable<JQuery<HTMLElement>>;
    validateBorderColor(
      element: Chainable<JQuery<HTMLElement>>,
      color: string,
    ): void;
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

// Command to trigger the context menu when doing right-click on the username
Cypress.Commands.add("getClipboardTextAndTriggerContextMenu", () => {
  return cy.window().then((win) => {
    return win.navigator.clipboard.readText().then((clipboardText) => {
      cy.wrap(clipboardText).as("clipboardText"); // Save clipboard text as an alias
      return cy
        .get('[data-cy="input-settings-profile-short-id"]')
        .then(($input) => {
          const element = $input[0];
          element.dispatchEvent(
            new MouseEvent("contextmenu", {
              bubbles: true,
              cancelable: false,
              view: window,
              button: 2,
            }),
          );
        });
    });
  });
});

// Command to trigger the copy when clicking on the username
Cypress.Commands.add("getClipboardTextAndTriggerCopy", () => {
  return cy
    .get('[data-cy="input-settings-profile-short-id"]')
    .then(($input) => {
      const element: any = $input[0];
      element.select(); // Select the input element
      document.execCommand("copy"); // Copy the selected text
      return cy.window().then((win) => {
        return win.navigator.clipboard.readText().then((clipboardText) => {
          cy.wrap(clipboardText).as("clipboardText"); // Save clipboard text as an alias
        });
      });
    });
});

// Command to assert text
Cypress.Commands.add(
  "assertText",
  (element: any, text: string, message: string) => {
    element.should("have.text", text, { log: false }).then(($el) => {
      expect($el.text()).to.eq(text, message);
    });
  },
);

Cypress.Commands.add(
  "validateBorderColor",
  (element: Chainable<JQuery<HTMLElement>>, color: string) => {
    element.should("have.css", "border-bottom-color", color);
  },
);
