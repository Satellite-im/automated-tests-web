import { test, expect } from "../fixtures/setup";

test.describe("Settings Accessibility Tests", () => {
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
    await settingsProfile.buttonAccessibility.click();
    await page.waitForURL("/settings/accessibility");
  });

  test("P1, P2 - User should be able to toggle on/off Dyslexic mode and changes are applied everywhere", async ({
    page,
  }) => {
    // Declare the page object implementations
    const chatsMain = new ChatsMainPage(page);
    const settingsAccessibility = new SettingsAccessibility(page);
    const settingsProfile = new SettingsProfile(page);

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
    await chatsMain.goToSettings();
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
