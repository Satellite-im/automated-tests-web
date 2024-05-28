import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Chats Sidebar Tests", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    preLoadingPage.validatePreLoadingPage();
    chatsMainPage.validateChatsMainPageIsShown();
  });

  it("C1 - Clicking Create Chat should open modal with option for Group Name and Group Members", () => {
    chatsMainPage.buttonCreateGroupChat.click();
    chatsMainPage.createGroupModal.should("be.visible");
    chatsMainPage.createGroupLabelGroupName.should("have.text", "Group Name:");
    chatsMainPage.createGroupInputGroupName.should("be.visible");
    chatsMainPage.createGroupLabelGroupMembers.should(
      "have.text",
      "Group Members:",
    );
    chatsMainPage.createGroupLabelSelectMembers.should(
      "have.text",
      "Select member(s)",
    );
    chatsMainPage.createGroupButton.should("be.visible");
  });

  it("C2 - Hovering over Create Chat should show tooltips", () => {
    chatsMainPage.buttonCreateGroupChat.realHover();
    chatsMainPage.buttonCreateGroupChat.should(
      "have.attr",
      "data-tooltip",
      "Create Chat",
    );
  });

  it("C3 - Hovering over Nav buttons should show tooltips", () => {
    chatsMainPage.buttonWallet.realHover();
    chatsMainPage.buttonWallet.should("have.attr", "data-tooltip", "Wallet");
    chatsMainPage.buttonFiles.realHover();
    chatsMainPage.buttonFiles.should("have.attr", "data-tooltip", "Files");
    chatsMainPage.buttonChat.realHover();
    chatsMainPage.buttonChat.should("have.attr", "data-tooltip", "Chat");
    chatsMainPage.buttonFriends.realHover();
    chatsMainPage.buttonFriends.should("have.attr", "data-tooltip", "Friends");
    chatsMainPage.buttonSettings.realHover();
    chatsMainPage.buttonSettings.should(
      "have.attr",
      "data-tooltip",
      "Settings",
    );
  });

  it("C4 - Clicking hamburger button should collapse sidebar", () => {
    chatsMainPage.ensureSidebarIsDisplayed();
    chatsMainPage.buttonHideSidebar.click();
    chatsMainPage.sidebar.should("not.exist");
    chatsMainPage.buttonShowSidebar.click();
    chatsMainPage.sidebar.should("be.visible");
  });

  it("C5, C6, C7, C8, C9 - Nav bar buttons should redirect to correct page", () => {
    chatsMainPage.buttonWallet.click();
    cy.url().should("include", "/wallet");
    chatsMainPage.buttonFiles.click();
    cy.url().should("include", "/files");
    chatsMainPage.buttonChat.click();
    cy.url().should("include", "/chat");
    chatsMainPage.buttonFriends.click();
    cy.url().should("include", "/friends");
    chatsMainPage.buttonSettings.click();
    cy.url().should("include", "/settings/profile");
  });

  it("C10 - Textbox should have highlighted border when clicking into Chat Search", () => {
    chatsMainPage.ensureSidebarIsDisplayed();
    chatsMainPage.inputSidebarSearch.click().type("test");
    chatsMainPage.inputSidebarSearch
      .parents(".input-group")
      .should("have.css", "border-color", "rgb(215, 226, 255)");
  });
});
