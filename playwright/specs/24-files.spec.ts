import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { FilesPage } from "playwright/PageObjects/FilesScreen";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { LoginPinPage } from "playwright/PageObjects/LoginPin";

test.describe("Files Page Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.goToFiles();
    await page.waitForURL("/files");
  });

  test("F3, F4 - Amount of Free and Total should appear in Toolbar", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

    // Validate Free and Total space data
    await filesPage.validateFreeSpaceInfo("2.15 GB");
    await filesPage.validateTotalSpaceInfo("2.15 GB");

    // F1 - Highlighted border should appear when user clicks Sync
    await filesPage.buttonFilesSync.focus();
    await expect(filesPage.buttonFilesSync).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );

    // F2 - Highlighted border should appear when user clicks Create Node
    await filesPage.buttonFilesCreateNode.focus();
    await expect(filesPage.buttonFilesCreateNode).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );

    // Highlighted border should appear when user clicks Gift Space
    await filesPage.buttonFilesGiftSpace.focus();
    await expect(filesPage.buttonFilesGiftSpace).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );

    // Highlighted border should appear when user clicks Rent Space
    await filesPage.buttonFilesRentSpace.focus();
    await expect(filesPage.buttonFilesRentSpace).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  test("F5 - Highlighted border should appaer when you click Create New Folder", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

    // User can upload an image file
    await filesPage.uploadFile("playwright/assets/banner.jpg");

    // File uploaded should be displayed
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");
  });

  test("F7 - User can create new folders on root", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

    // User can create folders on root
    await filesPage.createNewFolder("NewFolder");
    await filesPage.validateNewFolderCreated("NewFolder");
  });

  test("F8 - If user tries to create a folder with empty name or press Esc while name input is displayed, folder is not created", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

    // Empty folders are named as undefined
    await filesPage.newFolderButton.click();
    await filesPage.inputFileFolderName.fill("");
    await page.keyboard.press("Enter");
    await page.locator(`[data-cy="folder-"]`).waitFor({ state: "detached" });
  });

  test("F9 - User cannot create directories with existing name - Toast notification is shown", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

    // Create a folder
    await filesPage.createNewFolder("NewFolder");
    await filesPage.validateNewFolderCreated("NewFolder");

    // Create again the same folder
    await filesPage.createNewFolder("NewFolder");

    // Toast notification should be displayed
    await expect(filesPage.toastNotification).toBeVisible();
  });

  // Skipping since it needs research on how to fix this test in CI
  test.skip("F10 - User can create subfolders and navigate to parent folder with go back button", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

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

  // Skipping since it needs research on how to fix this test in CI
  test.skip("F12 - User can upload files in subfolder folder", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

    // Create a folder in root and enter on it
    await filesPage.createNewFolder("NewFolder");
    await filesPage.navigateToFolder("NewFolder");

    // Create a subfolder
    await filesPage.createNewFolder("Subfolder");
    await filesPage.validateNewFolderCreated("Subfolder");

    // User can upload an image file in subfolder
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");
  });

  // Skipping since it needs research on how to fix this test in CI
  test.skip("F13 - Files and folders are still visible after logging out and login again", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);
    const settingsProfile = new SettingsProfile(page);
    const loginPinPage = new LoginPinPage(page);
    const chatsMainPage = new ChatsMainPage(page);

    // User can upload an image file in root
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Create a folder in root and enter on it
    await filesPage.createNewFolder("NewFolder");
    await filesPage.navigateToFolder("NewFolder");

    // User can upload an image file in folder
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Go back to root
    await filesPage.goBackButton.click();

    // Logout from application
    await filesPage.goToSettings();
    await page.waitForURL("/settings/profile");

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
    await filesPage.navigateToFolder("NewFolder");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");
  });

  test("F14 - If user upload the same file again, file is uploaded but with different filename", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const filesPage = new FilesPage(page);

    // Upload a file
    await filesPage.uploadFile("playwright/assets/banner.jpg");
    await filesPage.validateUploadedImageInfo("banner", "jpg", "61.4 kB");

    // Attempt to upload the same file again
    await filesPage.uploadFile("playwright/assets/banner.jpg");

    // File banner.jpg is uploaded again but with name "banner (1).jpg"
    await filesPage.validateUploadedImageInfo("banner (1)", "jpg", "61.4 kB");
  });
});
