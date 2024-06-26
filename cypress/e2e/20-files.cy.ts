import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import filesScreen from "./PageObjects/Files";

describe("Files", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);
  const pin = "1234";

  beforeEach(() => {
    // Login and set up user before each test
    loginPinPage.loginWithPin(pin);
    authNewAccount.createRandomUser(username, status);
    chatsMainPage.validateChatsMainPageIsShown();
    chatsMainPage.goToFiles();
  });

  it("F1 - Highlighted border should appear when user clicks Sync", () => {
    cy.url().should("include", "/files");

    filesScreen.syncButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(28, 29, 43)",
    );
    filesScreen.syncButton.click();
    filesScreen.syncButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  it.skip("F2 - Highlighted border should appear when user clicks Gift Space", () => {
    // Test code for F2
  });

  it.skip("F3 - Highlighted border should appear when user clicks Rent Space", () => {
    // Test code for F3
  });

  it.skip("F4 - Highlighted border should appear when user clicks Create Node", () => {
    // Test code for F4
  });

  it.skip("F5 - Amount of Free Space should appear in Toolbar", () => {
    // Test code for F5
  });

  it.skip("F6 - Amount used of Total Space should appear in Toolbar", () => {
    // Test code for F6
  });

  it.skip("F7 - Amount of Sync Size should appear in Toolbar", () => {
    // Test code for F7
  });

  it.skip("F8 - Amount used of Shuttle Space should appear in Toolbar", () => {
    // Test code for F8
  });

  it.skip("F9 - Highlighted border should appear when you click Create New Folder", () => {
    // Test code for F9
  });

  it.skip("F10 - Clicking Upload should then open up the OS files browser", () => {
    // Test code for F10
  });
});
