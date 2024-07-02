import { faker } from "@faker-js/faker";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import authNewAccount from "./PageObjects/AuthNewAccount";

describe("Chats Sidebar Tests", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
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
    const buttonsWithTooltips = [
      { button: chatsMainPage.buttonWallet, tooltip: "Wallet" },
      { button: chatsMainPage.buttonFiles, tooltip: "Files" },
      { button: chatsMainPage.buttonChat, tooltip: "Chat" },
      { button: chatsMainPage.buttonFriends, tooltip: "Friends" },
      { button: chatsMainPage.buttonSettings, tooltip: "Settings" },
    ];

    buttonsWithTooltips.forEach(({ button, tooltip }) => {
      button.realHover();
      button.should("have.attr", "data-tooltip", tooltip);
    });
  });

  it("C4 - Clicking hamburger button should collapse sidebar", () => {
    chatsMainPage.buttonHideSidebar.click().should("not.exist");
    chatsMainPage.sidebar.should("have.class", "closed");
    chatsMainPage.buttonShowSidebar
      .should("have.length", 1)
      .click()
      .should("not.exist");
    chatsMainPage.sidebar.should("have.class", "open");
  });

  it("C5, C6, C7, C8, C9 - Nav bar buttons should redirect to correct page", () => {
    const navButtons = [
      { button: chatsMainPage.buttonWallet, url: "/wallet" },
      { button: chatsMainPage.buttonFiles, url: "/files" },
      { button: chatsMainPage.buttonChat, url: "/chat" },
      { button: chatsMainPage.buttonFriends, url: "/friends" },
      { button: chatsMainPage.buttonSettings, url: "/settings/profile" },
    ];

    navButtons.forEach(({ button, url }) => {
      button.click();
      cy.url().should("include", url);
    });
  });

  it("C10 - Textbox should have highlighted border when clicking into Chat Search", () => {
    chatsMainPage.ensureSidebarIsDisplayed();
    chatsMainPage.inputSidebarSearch.focus();
    chatsMainPage.inputSidebarSearch
      .parents(".input-container")
      .should("have.css", "box-shadow", "rgb(77, 77, 255) 0px 0px 0px 1px");
  });

  // Cannot be automated until app is wired
  it.skip("C11 - ProfilePicFrame should display for any friends that have one", () => {
    // Test code for C11
  });

  // Cannot be automated until app is wired
  it.skip("C12 - Favorites should appear on left side of Sidebar", () => {
    // Test code for C12
  });

  // Cannot be automated until app is wired
  it.skip("C13 - Number of members in group should appear on that chat in both Sidebar and Favorites", () => {
    // Test code for C13
  });

  // Cannot be automated until app is wired
  it.skip("C14 - Clicking a favorite should take you to that chat", () => {
    // Test code for C14
  });

  // Cannot be automated until app is wired
  it.skip("C15 - Right clicking a chat in sidebar should open context menu", () => {
    // Test code for C15
  });

  // Cannot be automated until app is wired
  it.skip("C16 - Context menu should display: Favorite, Hide, Mark as read", () => {
    // Test code for C16
  });

  // Cannot be automated until app is wired
  it.skip("C17 - Timestamp of most recent message sent or received in chat should be displayed in the sidebar", () => {
    // Test code for C17
  });

  // Cannot be automated until app is wired
  it.skip("C18 - Typing indicator should be displayed around users profile picture when they are typing (this applies to favorites as well)", () => {
    // Test code for C18
  });

  // Cannot be automated until app is wired
  it.skip("C19 - After selecting Hide chat chat should no longer be displayed in sidebar", () => {
    // Test code for C19
  });
});
