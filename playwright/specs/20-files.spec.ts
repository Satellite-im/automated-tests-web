import { test, expect } from "../fixtures/setup";

test.describe("Files Page Tests", () => {
  const username = "test123";
  const status = "fixed status";

  test.beforeEach(async ({ page }) => {
    // Declare the page object implementations
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);

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

    // Go to Files Page
    await chatsMainPage.goToFiles();
    await page.waitForURL("/files");
  });

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
    page,
  }) => {
    // Validate Free and Total space data
    const filesScreen = new FilesPage(page);
    await filesScreen.validateFreeSpaceInfo("885 TB");
    await filesScreen.validateTotalSpaceInfo("13.2 EB");
  });

  test("F5 - Highlighted border should appaer when you click Create New Folder", async ({
    page,
  }) => {
    // Validate border color when user clicks on New Folder button
    const filesScreen = new FilesPage(page);
    await expect(filesScreen.newFolderButton).toHaveCSS(
      "border-color",
      "rgb(28, 29, 43)",
    );
    await filesScreen.newFolderButton.focus();
    await expect(filesScreen.newFolderButton).toHaveCSS(
      "border-color",
      "rgb(77, 77, 255)",
    );
  });

  test("F6, F11 -Clicking Upload should then open up the OS files browser and user can upload files in root folder", async ({
    page,
  }) => {
    // User can upload an image file
    const filesScreen = new FilesPage(page);
    await filesScreen.uploadFile("playwright/assets/banner.jpg");

    // File uploaded should be displayed
    await filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  test("F7 - User can create new folders on root", async ({ page }) => {
    // User can create folders on root
    const filesScreen = new FilesPage(page);
    await filesScreen.createNewFolder("NewFolder");
    await filesScreen.validateNewFolderCreated("NewFolder");
  });

  test("F8 - If user tries to create a folder with empty name or press Esc while name input is displayed, folder is not created", async ({
    page,
  }) => {
    // Empty folders are named as undefined
    const filesScreen = new FilesPage(page);
    await filesScreen.createNewFolder("");
    await filesScreen.validateNewFolderCreated("", true);
  });

  test("F9 - User cannot create directories with existing name - Toast notification is shown", async ({
    page,
  }) => {
    // Create a folder
    const filesScreen = new FilesPage(page);
    await filesScreen.createNewFolder("NewFolder");
    await filesScreen.validateNewFolderCreated("NewFolder");

    // Create again the same folder
    await filesScreen.createNewFolder("NewFolder");

    // Toast notification should be displayed
    await expect(filesScreen.toastNotification).toBeVisible();
  });

  test("F10 - User can create subfolders and navigate to parent folder with go back button", async ({
    page,
  }) => {
    // Create a folder
    const filesScreen = new FilesPage(page);
    await filesScreen.createNewFolder("NewFolder");
    await filesScreen.navigateToFolder("NewFolder");

    // Create a subfolder
    await filesScreen.createNewFolder("Subfolder");
    await filesScreen.validateNewFolderCreated("Subfolder");

    // User can navigate to parent folder
    await filesScreen.goBackButton.click();
    await filesScreen.validateNewFolderCreated("NewFolder");
  });

  test("F12 - User can upload files in subfolder folder", async ({ page }) => {
    // Create a folder in root and enter on it
    const filesScreen = new FilesPage(page);
    await filesScreen.createNewFolder("NewFolder");
    await filesScreen.navigateToFolder("NewFolder");

    // Create a subfolder
    await filesScreen.createNewFolder("Subfolder");
    await filesScreen.validateNewFolderCreated("Subfolder");

    // User can upload an image file in subfolder
    await filesScreen.uploadFile("playwright/assets/banner.jpg");
    await filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  // Skipping broken test due to open bug on logging back into the application
  test.skip("F13 - Files and folders are still visible after logging out and login again", async ({
    page,
  }) => {
    // User can upload an image file in root
    const filesScreen = new FilesPage(page);
    const settingsProfile = new SettingsProfile(page);
    const loginPinPage = new LoginPinPage(page);
    const chatsMainPage = new ChatsMainPage(page);
    await filesScreen.uploadFile("playwright/assets/banner.jpg");
    await filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Create a folder in root and enter on it
    await filesScreen.createNewFolder("NewFolder");
    await filesScreen.navigateToFolder("NewFolder");

    // User can upload an image file in folder
    await filesScreen.uploadFile("playwright/assets/banner.jpg");
    await filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Go back to root
    await filesScreen.goBackButton.click();

    // Logout from application
    await filesScreen.goToSettings();
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
    await filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
    await filesScreen.validateNewFolderCreated("NewFolder", false, "61.4 kB");
    await filesScreen.navigateToFolder("NewFolder");
    await filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");
  });

  test("F14 - If user upload the same file again, file is uploaded but with different filename", async ({
    page,
  }) => {
    // Upload a file
    const filesScreen = new FilesPage(page);
    await filesScreen.uploadFile("playwright/assets/banner.jpg");
    await filesScreen.validateUploadedFileInfo("banner", "jpg", "61.4 kB");

    // Attempt to upload the same file again
    await filesScreen.uploadFile("playwright/assets/banner.jpg");

    // File banner.jpg is uploaded again but with name "banner (1).jpg"
    await filesScreen.validateUploadedFileInfo("banner (1)", "jpg", "61.4 kB");
  });
});
