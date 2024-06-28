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
  it("F3, F4 -	Amount of Free and Total should appear in Toolbar", () => {
    cy.url().should("include", "/files");
    filesScreen.freeSpaceLabel.should("have.text", "Free Space");
    filesScreen.freeSpaceValue.should("have.text", "885 TB");
    filesScreen.totalSpaceLabel.should("have.text", "Total Space");
    filesScreen.totalSpaceValue.should("have.text", "13.2 EB");
  });

  it("F5 -	Highlighted border should appaer when you click Create New Folder", () => {
    cy.url().should("include", "/files");
    filesScreen.newFolderButton
      .should("have.css", "border-color", "rgb(28, 29, 43)")
      .focus()
      .wait(1000)
      .should("have.css", "border-color", "rgb(77, 77, 255)");
  });

  it("F6, F11 -Clicking Upload should then open up the OS files browser and user can upload files in root folder", () => {
    cy.url().should("include", "/files");
    filesScreen.uploadFileButton.click();

    // User can upload an image file
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");

    // File uploaded should be displayed
    filesScreen.getFileByName("banner").then(($file) => {
      cy.wrap($file)
        .should("exist")
        .find("[data-cy='file-folder-name']")
        .should("have.text", "banner.jpg");
      cy.wrap($file)
        .find("[data-cy='file-folder-size']")
        .should("have.text", "61.4 kB");
      cy.wrap($file).find(".svg-icon").should("be.visible");
    });
  });

  it("F7 -	User can create new folders on root", () => {
    cy.url().should("include", "/files");
    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("New Folder{Enter}");
    filesScreen.getFolderByName("New Folder").then(($folder) => {
      cy.wrap($folder)
        .should("exist")
        .find("[data-cy='file-folder-name']")
        .should("have.text", "New Folder");
      cy.wrap($folder)
        .find("[data-cy='file-folder-size']")
        .should("have.text", "0 B");
      cy.wrap($folder).find(".svg-icon").should("be.visible");
    });
  });

  it("F8 -	If user tries to create a folder with empty name or press Esc while name input is displayed, folder is not created", () => {
    cy.url().should("include", "/files");
    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("{Enter}");
    filesScreen.getFolderByName("").then(($folder) => {
      cy.wrap($folder)
        .should("exist")
        .find("[data-cy='file-folder-name']")
        .should("have.text", "undefined");
      cy.wrap($folder)
        .find("[data-cy='file-folder-size']")
        .should("have.text", "0 B");
      cy.wrap($folder).find(".svg-icon").should("be.visible");
    });
  });

  it("F9 -	User cannot create directories with existing name - Toast notification is shown", () => {
    cy.url().should("include", "/files");
    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("New Folder{Enter}");
    filesScreen.getFolderByName("New Folder").then(($folder) => {
      cy.wrap($folder).should("exist");
    });

    // Create again the same folder
    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("New Folder{Enter}");

    // Toast notification should be displayed
    filesScreen.toastNotification.should("be.visible");
    filesScreen.toastNotificationText.should(
      "have.text",
      "Directory already exists",
    );
  });

  it("F10 - User can create subfolders and navigate to parent folder with go back button", () => {
    cy.url().should("include", "/files");
    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("New Folder{Enter}");
    filesScreen.getFolderByName("New Folder").then(($folder) => {
      cy.wrap($folder).should("exist").dblclick();
    });

    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("New Subfolder{Enter}");
    filesScreen.getFolderByName("New Subfolder").then(($folder) => {
      cy.wrap($folder)
        .should("exist")
        .click()
        .find("[data-cy='file-folder-name']")
        .should("have.text", "New Subfolder");
      cy.wrap($folder)
        .find("[data-cy='file-folder-size']")
        .should("have.text", "0 B");
      cy.wrap($folder).find(".svg-icon").should("be.visible");
    });

    filesScreen.goBackButton.click();
    filesScreen.getFolderByName("New Folder").then(($folder) => {
      cy.wrap($folder).should("exist");
    });
  });

  it("F12 - User can upload files in subfolder folder", () => {
    cy.url().should("include", "/files");

    // Create a folder in root and enter on it
    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("New Folder{Enter}");
    filesScreen.getFolderByName("New Folder").then(($folder) => {
      cy.wrap($folder).should("exist").dblclick();
    });

    // Create a subfolder
    filesScreen.newFolderButton.click();
    filesScreen.inputFileFolderName.type("New Subfolder{Enter}");
    filesScreen.getFolderByName("New Subfolder").then(($folder) => {
      cy.wrap($folder).should("exist");
    });

    // User can upload an image file in subfolder
    filesScreen.uploadFileButton.click();
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");

    // File uploaded should be displayed
    filesScreen.getFileByName("banner").then(($file) => {
      cy.wrap($file)
        .should("exist")
        .find("[data-cy='file-folder-name']")
        .should("have.text", "banner.jpg");
      cy.wrap($file)
        .find("[data-cy='file-folder-size']")
        .should("have.text", "61.4 kB");
      cy.wrap($file).find(".svg-icon").should("be.visible");
    });
  });

  it.skip("F13 - Files and folders are still visible after logging out and login again", () => {
    // Test code for F13
  });

  it("F14 - User cannot upload the same file again", () => {
    cy.url().should("include", "/files");
    filesScreen.uploadFileButton.click();

    // User can upload an image file
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");

    // File uploaded should be displayed
    filesScreen.getFileByName("banner").then(($file) => {
      cy.wrap($file).should("exist");
    });

    // Attempt to upload the same file again
    filesScreen.uploadFile("cypress/fixtures/banner.jpg");

    // Toast notification should be displayed
    filesScreen.toastNotification.should("be.visible");
    filesScreen.toastNotificationText.should("have.text", "File already exists");
  });
});
