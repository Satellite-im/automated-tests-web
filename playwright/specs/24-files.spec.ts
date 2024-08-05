import { test, expect } from "../fixtures/setup";

test.describe("Files Page Tests", () => {
  const username = "test123";
  const status = "test status";

  test.beforeEach(
    async ({
      createOrImport,
      authNewAccount,
      loginPinPage,
      saveRecoverySeed,
      chatsMainPage,
      page,
    }) => {
      // Select Create Account
      await createOrImport.navigateTo();
      await createOrImport.clickCreateNewAccount();

      // Enter Username and Status
      await authNewAccount.validateLoadingHeader();
      await authNewAccount.typeOnUsername(username);
      await authNewAccount.typeOnStatus(status);
      await authNewAccount.buttonNewAccountCreate.click();

      // Enter PIN
      await loginPinPage.waitUntilPageIsLoaded();
      await loginPinPage.enterDefaultPin();

      // Click on I Saved It
      await saveRecoverySeed.buttonSavedPhrase.waitFor({ state: "attached" });
      await saveRecoverySeed.clickOnSavedIt();
      await chatsMainPage.addSomeone.waitFor({ state: "visible" });
      await page.waitForURL("/chat");

      // Go to Files
      await chatsMainPage.goToFiles();
      await page.waitForURL("/files");
    },
  );

  test.skip("F1 - Highlighted border should appear when user clicks Sync", async ({
    page,
  }) => {
    // Test code for F1
  });

  test.skip("F2 - Highlighted border should appear when user clicks Create Node", async ({
    page,
  }) => {
    // Test code for F2
  });

  test("F3, F4 - Amount of Free and Total should appear in Toolbar", async ({
    filesPage,
  }) => {
    // Validate Free and Total space data
    await filesPage.validateFreeSpaceInfo("2.15 GB");
    await filesPage.validateTotalSpaceInfo("2.15 GB");
  });

  test("F5 - Highlighted border should appaer when you click Create New Folder", async ({
    filesPage,
  }) => {
    // Validate border color when user clicks on New Folder button
    await expect(filesPage.newFolderButton).toHaveCSS(
      "border-color",
      "rgb(28, 29, 43)",
    );
    await filesPage.newFolderButton.focus();
    await expect(filesPage.newFolderButton).toHaveCSS(
      "border-color",
      "rgb(77, 77, 255)",
    );
  });

  test("F6, F11 -Clicking Upload should then open up the OS files browser and user can upload files in root folder", async ({
    filesPage,
  }) => {
    // User can upload an image file
    await filesPage.uploadFile("playwright/assets/banner.jpg");

    // File uploaded should be displayed
    await filesPage.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  test("F7 - User can create new folders on root", async ({ filesPage }) => {
    // User can create folders on root
    await filesPage.createNewFolder("NewFolder");
    await filesPage.validateNewFolderCreated("NewFolder");
  });

  test("F8 - If user tries to create a folder with empty name or press Esc while name input is displayed, folder is not created", async ({
    filesPage,
  }) => {
    // Empty folders are named as undefined
    await filesPage.createNewFolder("");
    await filesPage.validateNewFolderCreated("", true);
  });

  test("F9 - User cannot create directories with existing name - Toast notification is shown", async ({
    filesPage,
  }) => {
    // Create a folder
    await filesPage.createNewFolder("NewFolder");
    await filesPage.validateNewFolderCreated("NewFolder");

    // Create again the same folder
    await filesPage.createNewFolder("NewFolder");

    // Toast notification should be displayed
    await expect(filesPage.toastNotification).toBeVisible();
  });

  test("F10 - User can create subfolders and navigate to parent folder with go back button", async ({
    filesPage,
  }) => {
    // Create a folder
    await filesPage.createNewFolder("NewFolder");
    await filesPage.navigateToFolder("NewFolder");

    // Create a subfolder
    await filesPage.createNewFolder("Subfolder");
    await filesPage.validateNewFolderCreated("Subfolder");

    // User can navigate to parent folder
    await filesPage.goBackButton.click();
    await filesPage.validateNewFolderCreated("NewFolder");
  });

  test("F12 - User can upload files in subfolder folder", async ({
    filesPage,
  }) => {
    // Create a folder in root and enter on it
    await filesPage.createNewFolder("NewFolder");
    await filesPage.navigateToFolder("NewFolder");

    // Create a subfolder
    await filesPage.createNewFolder("Subfolder");
    await filesPage.validateNewFolderCreated("Subfolder");

    // User can upload an image file in subfolder
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  // Skipping broken test due to open bug on logging back into the application
  test.skip("F13 - Files and folders are still visible after logging out and login again", async ({
    chatsMainPage,
    filesPage,
    loginPinPage,
    settingsProfile,
    page,
  }) => {
    // User can upload an image file in root
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Create a folder in root and enter on it
    await filesPage.createNewFolder("NewFolder");
    await filesPage.navigateToFolder("NewFolder");

    // User can upload an image file in folder
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Go back to root
    await filesPage.goBackButton.click();

    // Logout from application
    await filesPage.goToSettings();
    await page.waitForURL("/settings/profile");

    await settingsProfile.logOutSectionButton.click();
    await page.waitForURL("/auth");

    // Log in again entering the same pin
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();
    await loginPinPage.pinButtonConfirm.click();
    await chatsMainPage.validateChatsMainPageIsShown();
    await chatsMainPage.goToFiles();

    // Validate files are still visible
    await filesPage.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
    await filesPage.validateNewFolderCreated("NewFolder", false, "61.4 kB");
    await filesPage.navigateToFolder("NewFolder");
    await filesPage.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  test("F14 - If user upload the same file again, file is uploaded but with different filename", async ({
    filesPage,
  }) => {
    // Upload a file
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Attempt to upload the same file again
    await filesPage.uploadFile("playwright/assets/banner.jpg");

    // File banner.jpg is uploaded again but with name "banner (1).jpg"
    await filesPage.validateUploadedFileInfo("banner (1)", "jpg", "61.4 kB");
  });
});