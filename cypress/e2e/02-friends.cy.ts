import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Chat Page Tests", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    preLoadingPage.validatePreLoadingPage();
    chatsMainPage.validateChatsMainPageIsShown();
  });

  it("B1, B2 - Add Friends should navigate to Friends Page", () => {
    chatsMainPage.buttonAddFriends.click();
    cy.location("href").should("include", "/friends");
  });
});
