class PreLoadingPage {
  public validateURL() {
    cy.location("href").should("include", "/pre");
  }
}

export const preLoadingPage: PreLoadingPage = new PreLoadingPage();
