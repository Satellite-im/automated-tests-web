import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsExtensions } from "../PageObjects/Settings/SettingsExtensions";

test.describe("Settings Extensions Tests", () => {
  const username = "test123";
  const status = "test status";

  test.beforeEach(async ({ page }) => {
    // Declare the page object implementations
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);
    const settingsProfile = new SettingsProfile(page);

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

    // Go to Settings Profile and then Settings Inventory page
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
    await settingsProfile.buttonExtensions.click();
    await page.waitForURL("/settings/extensions");
  });

  test("N1 - User should land on Installed when navigating to this page", async ({
    page,
  }) => {
    const settingsExtensions = new SettingsExtensions(page);
    await expect(settingsExtensions.installedButton).toBeVisible();
    await expect(settingsExtensions.exploreButton).toBeVisible();
    await expect(settingsExtensions.settingsButton).toBeVisible();
    await expect(settingsExtensions.underConstructionIndicator).toBeVisible();
    await expect(settingsExtensions.underConstructionIndicator).toHaveText(
      "Under Construction",
    );
    await expect(settingsExtensions.noExtensionsInstalledLabel).toBeVisible();
  });

  test.skip("N2 - Clicking Explore should take user to Explore page", ({
    page,
  }) => {
    // Test code for N2
  });

  test.skip("N3 - Clicking Settings should take user to Settings page", ({
    page,
  }) => {
    // Test code for N3
  });
});
