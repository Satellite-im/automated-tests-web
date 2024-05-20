class ChatsMainPage {
  public validateURL() {
    cy.location("href").should("include", "/chat");
  }
}

export const chatsMainPage: ChatsMainPage = new ChatsMainPage();
