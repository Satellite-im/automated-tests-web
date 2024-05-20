describe("Pin Screen", () => {
  it("Enter Pin Screen - Enter valid PIN", () => {
    cy.visit("/");
    cy.getByTestAttr("pin-keypad", { timeout: 30000 }).should("exist");
    cy.location("href").should("include", "/auth/unlock");
    cy.getByTestAttr("button-pin-1").should("exist").click();
    cy.getByTestAttr("button-pin-2").should("exist").click();
    cy.getByTestAttr("button-pin-3").should("exist").click();
    cy.getByTestAttr("button-pin-4").should("exist").click();
    cy.getByTestAttr("button-confirm-pin").should("exist").click();
    cy.getByTestAttr("button-confirm-pin").should("not.exist");
    cy.location("href").should("include", "/pre");
    cy.location("href").should("include", "/chat");
  });

  it("Enter Pin Screen - Enter PIN with 3 digits", () => {
    cy.visit("/");
    cy.location("href").should("include", "/auth/unlock");
    cy.getByTestAttr("button-pin-1").should("exist").click();
    cy.getByTestAttr("button-pin-2").should("exist").click();
    cy.getByTestAttr("button-pin-3").should("exist").click();
    cy.getByTestAttr("button-confirm-pin").should("exist").and("be.disabled");
  });
});
