import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsNotifications } from "../PageObjects/Settings/SettingsNotifications";

test.describe("Settings Notifications Tests", () => {
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
    await settingsProfile.buttonNotifications.click();
    await page.waitForURL("/settings/notifications");
  });

  test("Q1 - User should be able to toggle on/off Notifications", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsNotifications = new SettingsNotifications(page);
    await expect(settingsNotifications.enabledSectionLabel).toHaveText(
      "Enabled",
    );
    await expect(settingsNotifications.enabledSectionText).toHaveText(
      "Enable notifications for incoming calls, messages, and more.",
    );

    // Check the checkbox is checked
    await expect(settingsNotifications.enabledSectionCheckbox).toBeChecked();

    // Verify the toggle functionality
    await settingsNotifications.enabledSectionSlider.click();
    await expect(
      settingsNotifications.enabledSectionCheckbox,
    ).not.toBeChecked();

    // Click again and verify the checkbox is checked
    await settingsNotifications.enabledSectionSlider.click();
    await expect(settingsNotifications.enabledSectionCheckbox).toBeChecked();
  });

  test("Q2 - User should be able to toggle on/off Friend Request Notifications", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsNotifications = new SettingsNotifications(page);
    await expect(settingsNotifications.friendsSectionLabel).toHaveText(
      "Friends",
    );
    await expect(settingsNotifications.friendsSectionText).toHaveText(
      "Enable notifications for friend requests.",
    );

    // Check the checkbox is checked
    await expect(settingsNotifications.friendsSectionCheckbox).toBeChecked();

    // Verify the toggle functionality
    await settingsNotifications.friendsSectionSlider.click();
    await expect(
      settingsNotifications.friendsSectionCheckbox,
    ).not.toBeChecked();

    // Click again and verify the checkbox is checked
    await settingsNotifications.friendsSectionSlider.click();
    await expect(settingsNotifications.friendsSectionCheckbox).toBeChecked();
  });

  test("Q3 - User should be able to toggle on/off Message Notifications", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsNotifications = new SettingsNotifications(page);

    await expect(settingsNotifications.messagesSectionLabel).toHaveText(
      "Messages",
    );
    await expect(settingsNotifications.messagesSectionText).toHaveText(
      "Enable notifications for incoming messages.",
    );

    // Check the checkbox is checked
    await expect(settingsNotifications.messagesSectionCheckbox).toBeChecked();

    // Verify the toggle functionality
    await settingsNotifications.messagesSectionSlider.click();
    await expect(
      settingsNotifications.messagesSectionCheckbox,
    ).not.toBeChecked();

    // Click again and verify the checkbox is checked
    await settingsNotifications.messagesSectionSlider.click();
    await expect(settingsNotifications.messagesSectionCheckbox).toBeChecked();
  });

  test("Q4 - User should be able to toggle on/off Settings Notifications", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsNotifications = new SettingsNotifications(page);

    await expect(settingsNotifications.settingsSectionLabel).toHaveText(
      "Settings",
    );
    await expect(settingsNotifications.settingsSectionText).toHaveText(
      "Enable notifications for updates and important alerts.",
    );

    // Check the checkbox is checked
    await expect(settingsNotifications.settingsSectionCheckbox).toBeChecked();

    // Verify the toggle functionality
    await settingsNotifications.settingsSectionSlider.click();
    await expect(
      settingsNotifications.settingsSectionCheckbox,
    ).not.toBeChecked();

    // Click again and verify the checkbox is checked
    await settingsNotifications.settingsSectionSlider.click();
    await expect(settingsNotifications.settingsSectionCheckbox).toBeChecked();
  });
});