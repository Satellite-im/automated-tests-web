import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsAccessibility } from "playwright/PageObjects/Settings/SettingsAccessibility";

test.describe("Settings Accessibility Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.buttonAccessibility.click();
    await page.waitForURL("/settings/accessibility");
  });

  test("P1, P2 - User should be able to toggle on/off Dyslexic mode and changes are applied everywhere", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAccessibility = new SettingsAccessibility(page);
    const settingsProfile = new SettingsProfile(page);
    const chatsMainPage = new ChatsMainPage(page);

    // Label and texts for settings section are correct
    await expect(settingsAccessibility.openDyslexicSectionLabel).toHaveText(
      "Open Dyslexic",
    );
    await expect(settingsAccessibility.openDyslexicSectionText).toHaveText(
      "Open Dyslexic may help some users who suffer from dyslexia, it's a custom font you can enable.",
    );

    // Checkbox should be disabled by default
    await expect(
      settingsAccessibility.openDyslexicSectionCheckbox,
    ).not.toBeChecked();

    // User can toggle checkbox to on
    await settingsAccessibility.openDyslexicSectionSlider.click();
    await expect(
      settingsAccessibility.openDyslexicSectionCheckbox,
    ).toBeChecked();

    // Validate font size applied everywhere through the app
    await expect(settingsAccessibility.openDyslexicSectionText).toHaveCSS(
      "font-family",
      "OpenDyslexic",
    );

    // Validate font size applied on different page - Main Chat
    await settingsAccessibility.goToChat();
    const textElement = page.getByText("Let's get something started!");
    await expect(textElement).toHaveCSS("font-family", "OpenDyslexic");

    // Return to Settings Accessibility page
    await chatsMainPage.goToSettings();
    await settingsProfile.buttonAccessibility.click();
    await page.waitForURL("/settings/accessibility");

    // User can toggle again checkbox to off
    await settingsAccessibility.openDyslexicSectionSlider.click();
    await expect(
      settingsAccessibility.openDyslexicSectionCheckbox,
    ).not.toBeChecked();

    // Validate font size was restored to default everywhere through the app
    await expect(settingsAccessibility.openDyslexicSectionText).toHaveCSS(
      "font-family",
      "Poppins",
    );

    // Validate font size was restored to default everywhere through the app - Main Chat
    await settingsAccessibility.goToChat();
    await expect(textElement).toHaveCSS("font-family", "Poppins");
  });
});
