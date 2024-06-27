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

  it.skip("F1 - Highlighted border should appear when user clicks Sync", () => {
    // Test code for F1
  });
  it.skip("F2 - Highlighted border should appear when user clicks Create Node", () => {
    // Test code for F2
  });
  it.skip("F3, F4 -	Amount of Free and Total should appear in Toolbar", () => {
    cy.url().should("include", "/files");
    filesScreen.freeSpaceLabel.should("have.text", "Free Space");
    filesScreen.freeSpaceValue.should("have.text", "885 TB");
    filesScreen.totalSpaceLabel.should("have.text", "Total Space");
    filesScreen.totalSpaceValue.should("have.text", "13.2 EB");
  });

  it.skip("F5 -	Highlighted border should appaer when you click Create New Folder", () => {
    cy.url().should("include", "/files");
    filesScreen.newFolderButton
      .should("have.css", "border-color", "rgb(28, 29, 43)")
      .focus()
      .should("have.css", "border-color", "rgb(77, 77, 255)");
  });

  it.skip("F6 -	Clicking Upload should then open up the OS files browser", () => {
    // Test code for F6
  });
  it.skip("F7 -	User can create new folders on root", () => {
    // Test code for F7
  });
  it.skip("F8 -	If user tries to create a folder with empty name or press Esc while name input is displayed, folder is not created", () => {
    // Test code for F8
  });
  it.skip("F9 -	User cannot create directories with existing name - Toast notification is shown", () => {
    // Test code for F9
  });
  it.skip("F10 - User can create subfolders and navigate to parent folder with go back button", () => {
    // Test code for F10
  });
  it.skip("F11 - User can upload files in root folder", () => {
    // Test code for F11
  });
  it.skip("F12 - User can upload files in subfolder folder", () => {
    // Test code for F12
  });
  it.skip("F13 - Files and folders are still visible after logging out and login again", () => {
    // Test code for F13
  });
});
