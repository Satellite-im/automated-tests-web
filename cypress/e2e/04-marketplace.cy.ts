import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { authNewAccount } from "./PageObjects/AuthNewAccount";

describe("Marketplace Tests", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser();
    chatsMainPage.validateChatsMainPageIsShown();
  });

  it("D1 - Marketplace modal should appear when user clicks Marketplace", () => {
    chatsMainPage.buttonMarketplace.click();
    cy.contains("Uplink Marketplace").should("exist");
  });
});
