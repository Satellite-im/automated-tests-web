import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Marketplace Tests", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    preLoadingPage.validatePreLoadingPage();
    chatsMainPage.validateChatsMainPageIsShown();
  });

  it("D1 - Marketplace modal should appear when user clicks Marketplace", () => {
    chatsMainPage.buttonMarketplace.click();
    cy.contains("Uplink Marketplace").should("exist");
  });
});
