import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsNotifications } from "playwright/PageObjects/Settings/SettingsNotifications";

test.describe("Settings Notifications Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.buttonNotifications.click();
    await page.waitForURL("/settings/notifications");
  });

  test("Q1 - User should be able to toggle on/off Notifications", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsNotifications = new SettingsNotifications(page);

    // Label and texts for settings section are correct
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsNotifications = new SettingsNotifications(page);

    // Label and texts for settings section are correct
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsNotifications = new SettingsNotifications(page);

    // Label and texts for settings section are correct
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsNotifications = new SettingsNotifications(page);

    // Label and texts for settings section are correct
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
