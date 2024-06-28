import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import filesScreen from "./PageObjects/Files";
import SettingsProfile from "./PageObjects/Settings/SettingsProfile";

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

  it("F3, F4 - Amount of Free and Total should appear in Toolbar", () => {
    // Validate Free and Total space data
    filesScreen.validateFilesURL();
    filesScreen.validateFreeSpaceInfo("885 TB");
    filesScreen.validateTotalSpaceInfo("13.2 EB");
  });

  it("F5 - Highlighted border should appaer when you click Create New Folder", () => {
    // Validate border color when user clicks on New Folder button
    filesScreen.validateFilesURL();
    filesScreen.newFolderButton
      .should("have.css", "border-color", "rgb(28, 29, 43)")
      .focus();
    filesScreen.newFolderButton.should(
      "have.css",
      "border-color",
      "rgb(77, 77, 255)",
    );
  });

  it("F6, F11 -Clicking Upload should then open up the OS files browser and user can upload files in root folder", () => {
    // User can upload an image file
    filesScreen.validateFilesURL();
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");

    // File uploaded should be displayed
    filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  it("F7 - User can create new folders on root", () => {
    // User can create folders on root
    filesScreen.validateFilesURL();
    filesScreen.createNewFolder("NewFolder");
    filesScreen.validateNewFolderCreated("NewFolder");
  });

  it("F8 - If user tries to create a folder with empty name or press Esc while name input is displayed, folder is not created", () => {
    // Empty folders are named as undefined
    filesScreen.validateFilesURL();
    filesScreen.createNewFolder("");
    filesScreen.validateNewFolderCreated("", true);
  });

  it("F9 - User cannot create directories with existing name - Toast notification is shown", () => {
    // Create a folder
    filesScreen.validateFilesURL();
    filesScreen.createNewFolder("NewFolder");
    filesScreen.validateNewFolderCreated("NewFolder");

    // Create again the same folder
    filesScreen.createNewFolder("NewFolder");

    // Toast notification should be displayed
    filesScreen.toastNotificationText.should(
      "have.text",
      "Directory already exists",
    );
  });

  it("F10 - User can create subfolders and navigate to parent folder with go back button", () => {
    // Create a folder
    filesScreen.validateFilesURL();
    filesScreen.createNewFolder("NewFolder");
    filesScreen.navigateToFolder("NewFolder");

    // Create a subfolder
    filesScreen.createNewFolder("Subfolder");
    filesScreen.validateNewFolderCreated("Subfolder");

    // User can navigate to parent folder
    filesScreen.goBackButton.click();
    filesScreen.validateNewFolderCreated("NewFolder");
  });

  it("F12 - User can upload files in subfolder folder", () => {
    // Create a folder in root and enter on it
    filesScreen.validateFilesURL();
    filesScreen.createNewFolder("NewFolder");
    filesScreen.navigateToFolder("NewFolder");

    // Create a subfolder
    filesScreen.createNewFolder("Subfolder");
    filesScreen.validateNewFolderCreated("Subfolder");

    // User can upload an image file in subfolder
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");
    filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  it("F13 - Files and folders are still visible after logging out and login again", () => {
    // User can upload an image file in root
    filesScreen.validateFilesURL();
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");
    filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Create a folder in root and enter on it
    filesScreen.createNewFolder("NewFolder");
    filesScreen.navigateToFolder("NewFolder");

    // User can upload an image file in folder
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");
    filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Go back to root
    filesScreen.goBackButton.click();

    // Logout from application
    filesScreen.goToSettings();
    cy.location("href").should("include", "/settings/profile");
    SettingsProfile.logOutSectionButton.click();
    cy.url().should("include", "/auth/unlock");

    // Log in again entering the same pin
    loginPinPage.waitUntilPageIsLoaded();
    loginPinPage.enterPin(pin);
    loginPinPage.pinButtonConfirm.click();
    chatsMainPage.validateChatsMainPageIsShown();
    chatsMainPage.goToFiles();

    // Validate files are still visible
    filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
    filesScreen.validateNewFolderCreated("NewFolder", false, "61.4 kB");
    filesScreen.navigateToFolder("NewFolder");
    filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  it("F14 - User cannot upload the same file again", () => {
    // Upload a file
    filesScreen.validateFilesURL();
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");
    filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Attempt to upload the same file again
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");

    // Toast notification should be displayed
    filesScreen.toastNotificationText.should(
      "have.text",
      "File already exists",
    );
  });
});
