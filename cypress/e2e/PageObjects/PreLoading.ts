class PreLoadingPage {
  get loadingHeader() {
    return cy.get(".small");
  }

  get loadingMessage() {
    return cy.get(".text.medium");
  }

  public validatePreLoadingPage() {
    this.validateLoadingHeader();
    this.validateLoadingMessage();
    cy.location("href").should("include", "/pre");
  }

  public validateLoadingHeader() {
    this.loadingHeader.should("exist").and("have.text", "Initializing...");
  }

  public validateLoadingMessage() {
    this.loadingMessage
      .should("exist")
      .and("have.text", "Fetching your friends from space.");
  }
}

export const preLoadingPage: PreLoadingPage = new PreLoadingPage();
