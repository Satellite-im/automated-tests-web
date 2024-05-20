class ChatsMainPage {
  get addSomeone() {
    return cy.get(".add-someone");
  }

  public validateAddSomeoneIsShown() {
    this.addSomeone.should("exist");
  }

  public validateURL() {
    cy.location("href").should("include", "/chat");
  }
}

export const chatsMainPage: ChatsMainPage = new ChatsMainPage();
