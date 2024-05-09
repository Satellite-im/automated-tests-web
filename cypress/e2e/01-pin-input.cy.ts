describe("Pin Screen", () => {
  it("Enter Pin Screen", () => {
    cy.visit("");
    cy.url().should("include", "/auth/unlock");
  });
});
