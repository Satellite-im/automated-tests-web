import { ChatsMainPage } from "playwright/PageObjects/ChatsElements/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { FilesPage } from "playwright/PageObjects/FilesScreen";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";

test.describe("Files Page Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const chatsMainPage = new ChatsMainPage(page, viewport);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToFiles();
    await page.waitForURL("/files");
  });

  test("F3, F4 - Amount of Free and Total should appear in Toolbar", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // Validate Free and Total space data
    await filesPage.validateFreeSpaceInfo("2.15 GB");
    await filesPage.validateTotalSpaceInfo("2.15 GB");
  });

  test("F5 - Highlighted border should appaer when you click Create New Folder", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // Validate border color when user clicks on New Folder button
    if (viewport === "desktop-chrome") {
      await expect(filesPage.newFolderButton).toHaveCSS(
        "border-color",
        "rgb(28, 29, 43)",
      );
      await filesPage.newFolderButton.focus();
      await expect(filesPage.newFolderButton).toHaveCSS(
        "border-color",
        "rgb(77, 77, 255)",
      );
    }
  });

  test("F6, F11 -Clicking Upload should then open up the OS files browser and user can upload files in root folder", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // User can upload an image file
    await filesPage.uploadFile("playwright/assets/banner.jpg");

    // File uploaded should be displayed
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Validate file uploaded is displayed in sidebar tree
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("banner");
  });

  test("F7 - User can create new folders on root", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // User can create folders on root
    await filesPage.createNewFolder("NewFolder");
    await filesPage.validateNewFolderCreated("NewFolder");

    // Validate folder created is displayed in sidebar tree
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("NewFolder");
  });

  test("F8 - If user tries to create a folder with empty name or press Esc while name input is displayed, folder is not created", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // Empty folders are named as undefined
    await filesPage.clickOnCreateFolderButton();
    await filesPage.inputFileFolderName.fill("");
    await page.keyboard.press("Enter");
    await page.locator(`[data-cy="folder-"]`).waitFor({ state: "detached" });

    // Validate no items are displayed in sidebar tree
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(0);
  });

  test("F9 - User cannot create directories with existing name - Toast notification is shown", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // Create a folder
    await filesPage.createNewFolder("NewFolder");
    await filesPage.validateNewFolderCreated("NewFolder");

    // Create again the same folder
    await filesPage.createNewFolder("NewFolder");

    // Validate only one folder is created
    const countOfFolders = await page
      .locator('[data-cy^="folder-"]:not([data-cy="folder-list"])')
      .count();
    expect(countOfFolders).toEqual(1);

    // Toast notification should be displayed
    await filesPage.toastNotification.last().waitFor({ state: "attached" });

    // Validate folder created is displayed in sidebar tree
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("NewFolder");
  });

  test("F10 - User can create subfolders and navigate to parent folder with go back button", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // Create a folder, validate structure and enter on it
    await filesPage.createNewFolder("NewFolder");
    await filesPage.validateNewFolderCreated("NewFolder");

    // Validate tree structure for folder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateTreeItemExists("NewFolder");

    // Create a subfolder
    await filesPage.hideSidebarOnMobileView();
    await filesPage.navigateToFolder("NewFolder");
    await filesPage.createNewFolder("Subfolder");
    await expect(filesPage.freeSpaceValue).toHaveText("2.15 GB");
    await filesPage.validateNewFolderCreated("Subfolder");

    // Validate tree structure for subfolder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("Subfolder");

    // User can navigate to parent folder
    await filesPage.hideSidebarOnMobileView();
    await filesPage.goBackToPreviousFolder();
    await filesPage.validateNewFolderCreated("NewFolder");

    // Validate tree structure for folder subfolder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateTreeItemExists("NewFolder");
    await filesPage.expandTreeFolder("NewFolder");
    await filesPage.validateTreeItemExists("Subfolder");
    await filesPage.validateTreeItemExists("NewFolder");
    await filesPage.validateNumberOfItemsInTree(2);
  });

  test("F12 - User can upload files in subfolder folder", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // Create a folder in root and enter on it
    await filesPage.createNewFolder("NewFolder");
    await expect(filesPage.freeSpaceValue).toHaveText("2.15 GB");
    await filesPage.validateNewFolderCreated("NewFolder");

    // Validate tree structure for folder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateTreeItemExists("NewFolder");

    // Navigate into folder
    await filesPage.hideSidebarOnMobileView();
    await filesPage.navigateToFolder("NewFolder");

    // Create a subfolder
    await filesPage.createNewFolder("Subfolder");
    await expect(filesPage.freeSpaceValue).toHaveText("2.15 GB");
    await filesPage.validateNewFolderCreated("Subfolder");

    // Validate tree structure for subfolder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("Subfolder");

    // User can upload an image file in subfolder
    await filesPage.hideSidebarOnMobileView();
    await filesPage.navigateToFolder("Subfolder");
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Validate tree structure inside subfolder after file is uploaded
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("banner");
  });

  test("F13 - Files and folders are still visible after logging out and login again", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);
    const settingsProfile = new SettingsProfile(page, viewport);
    const loginPinPage = new LoginPinPage(page, viewport);
    const chatsMainPage = new ChatsMainPage(page, viewport);

    // User can upload an image file in root
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Create a folder in root and enter on it
    await filesPage.createNewFolder("NewFolder");
    await expect(filesPage.freeSpaceValue).toHaveText("2.15 GB");
    await filesPage.validateNewFolderCreated("NewFolder");

    // Validate tree structure for folder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(2);
    await filesPage.validateTreeItemExists("banner");
    await filesPage.validateTreeItemExists("NewFolder");

    // Navigate into folder
    await filesPage.hideSidebarOnMobileView();
    await filesPage.navigateToFolder("NewFolder");

    // User can upload an image file in folder
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Validate tree structure inside folder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("banner");

    // Go back to root
    await filesPage.hideSidebarOnMobileView();
    await filesPage.goBackToPreviousFolder();

    // Logout from application
    await filesPage.goToSettings();
    await page.waitForURL("/settings/profile");

    await settingsProfile.hideSidebarOnMobileView();
    await settingsProfile.logOutSectionButton.click();
    await page.waitForURL("/auth");

    // Log in again entering the same pin
    await loginPinPage.enterDefaultPin();
    await page.waitForURL("/pre");
    await page.waitForURL("/chat");
    await chatsMainPage.goToFiles();

    // Validate files are still visible
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");
    await filesPage.validateNewFolderCreated("NewFolder", false, "61.4 kB");

    // Validate tree structure after logging back
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(2);
    await filesPage.validateTreeItemExists("banner");
    await filesPage.validateTreeItemExists("NewFolder");
  });

  test("F14 - If user upload the same file again, file is uploaded but with different filename", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const filesPage = new FilesPage(page, viewport);

    // Upload a file
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Validate tree structure inside folder
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(1);
    await filesPage.validateTreeItemExists("banner");

    // Attempt to upload the same file again
    await filesPage.hideSidebarOnMobileView();
    await filesPage.uploadFile("playwright/assets/banner.jpg");

    // File banner.jpg is uploaded again but with name "banner (1).jpg"
    await filesPage.validateUploadedImageInfo("banner (1)", "jpg", "61.4 kB");

    // Validate tree structure inside folder after uploading the same file again
    await filesPage.clickOnShowSidebarIfClosed();
    await filesPage.validateNumberOfItemsInTree(2);
    await filesPage.validateTreeItemExists("banner");
    await filesPage.validateTreeItemExists("banner (1)");
  });
});
