import { chatsMainPage } from "./PageObjects/ChatsMain";
import { loginPinPage } from "./PageObjects/LoginPin";
import { preLoadingPage } from "./PageObjects/PreLoading";

describe("Chats Sidebar Tests", () => {
  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    preLoadingPage.validatePreLoadingPage();
    chatsMainPage.validateChatsMainPageIsShown();
  });

  // To be automated
  xit("Clicking Create Chat should open modal with option for Group Name and Group Members", () => {});

  it("Hovering over Create Chat should show tooltips", () => {
    chatsMainPage.hoverCreateGroupChatButton();
    chatsMainPage.buttonCreateGroupChat.should(
      "have.attr",
      "data-tooltip",
      "Create Chat",
    );
  });

  it("Hovering over Nav buttons should show tooltips", () => {
    chatsMainPage.hoverWalletButton();
    chatsMainPage.buttonWallet.should("have.attr", "data-tooltip", "Wallet");
    chatsMainPage.hoverFilesButton();
    chatsMainPage.buttonFiles.should("have.attr", "data-tooltip", "Files");
    chatsMainPage.hoverChatsButton();
    chatsMainPage.buttonChat.should("have.attr", "data-tooltip", "Chat");
    chatsMainPage.hoverFriendsButton();
    chatsMainPage.buttonFriends.should("have.attr", "data-tooltip", "Friends");
    chatsMainPage.hoverSettingsButton();
    chatsMainPage.buttonSettings.should(
      "have.attr",
      "data-tooltip",
      "Settings",
    );
  });

  // To be automated
  xit("Clicking hamburger button should collapse sidebar", () => {});

  it("Nav bar buttons should redirect to correct page", () => {
    chatsMainPage.clickWallet();
    cy.url().should("include", "/wallet");
    chatsMainPage.clickFiles();
    cy.url().should("include", "/files");
    chatsMainPage.clickChat();
    cy.url().should("include", "/chat");
    chatsMainPage.clickFriends();
    cy.url().should("include", "/friends");
    chatsMainPage.clickSettings();
    cy.url().should("include", "/settings/profile");
  });

  // To be automated
  xit("Textbox should have highlighted border when clicking into Chat Search", () => {});

  // Cannot be automated at this moment
  xit("ProfilePicFrame should display for any friends that have one", () => {});

  // Cannot be automated at this moment
  xit("Favorites should appear on left side of Sidebar", () => {});

  // Cannot be automated at this moment
  xit("Number of members in group should appear on that chat in both Sidebar and Favorites", () => {});

  // Cannot be automated at this moment
  xit("Clicking a favorite should take you to that chat ", () => {});

  // Cannot be automated at this moment
  xit("Right clicking a chat in sidebar should open context menu", () => {});

  // Cannot be automated at this moment
  xit("Context menu should display: Favorite, Hide, Mark as read", () => {});

  // Cannot be automated at this moment
  xit("Timestamp of most recent message sent or recieved in chat should be displayed in the sidebar", () => {});

  // Cannot be automated at this moment
  xit("Typing indicator should be displayed around users profile picture when they are typing (this applys to favorites as well)", () => {});

  // Cannot be automated at this moment
  xit("After selecting Hide chat chat should no longer be displayed in sidebar", () => {});
});
