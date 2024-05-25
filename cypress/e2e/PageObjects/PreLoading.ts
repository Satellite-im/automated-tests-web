class PreLoadingPage {
  get loadingHeader() {
    return cy.get(".small", { timeout: 30000 });
  }

  get loadingMessage() {
    return cy.get(".text.medium");
  }

  public validateLoadingHeader() {
    this.loadingHeader.should("exist").and("have.text", "Initializing...");
  }

  public validateLoadingMessage() {
    this.loadingMessage
      .should("exist")
      .and("have.text", "Fetching your friends from space.");
  }

  public validateURL() {
    cy.location("href").should("include", "/pre");
  }
}

export const preLoadingPage: PreLoadingPage = new PreLoadingPage();
