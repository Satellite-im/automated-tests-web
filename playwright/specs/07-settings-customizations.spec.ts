import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsCustomizations } from "../PageObjects/Settings/SettingsCustomizations";

test.describe("Settings Customization Tests", () => {
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
    await settingsProfile.buttonCustomization.click();
    await page.waitForURL("/settings/preferences");
  });

  test("K1 - Language dropdown should display English", async ({ page }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    await expect(settingsCustomizations.appLanguageSectionLabel).toHaveText(
      "App Language",
    );
    await expect(settingsCustomizations.appLanguageSectionText).toHaveText(
      "Change language.",
    );

    await expect(
      settingsCustomizations.appLanguageSectionSelectorOption,
    ).toHaveText("English (USA)");
  });

  test("K2 - Font dropdown should show expected font names", async ({
    page,
  }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    const expectedFonts = [
      "Poppins",
      "SpaceMono",
      "ChakraPetch",
      "Comfortaa",
      "Dosis",
      "IBMPlexMono",
      "PixelifySans",
      "IndieFlower",
      "JosefinSans",
      "Noto",
      "SourceCodePro",
      "SpaceGrotesk",
      "MajorMono",
      "Merriweather",
      "PoiretOne",
      "OpenDyslexic",
    ];

    await expect(settingsCustomizations.fontSectionLabel).toHaveText("Font");
    await expect(settingsCustomizations.fontSectionText).toHaveText(
      "Change the font used in the app.",
    );

    const numberOfSelectorOptions =
      await settingsCustomizations.fontSectionSelectorOption.count();
    expect(numberOfSelectorOptions).toEqual(expectedFonts.length);
    await settingsCustomizations.validateFontNames(expectedFonts);
  });

  test("K3 - Selected Fonts should be applied everywhere throughout the app", async ({
    page,
  }) => {
    const selectedFont = "JosefinSans";
    const settingsCustomizations = new SettingsCustomizations(page);
    await settingsCustomizations.selectFont(selectedFont);
    await expect(settingsCustomizations.fontSectionText).toHaveCSS(
      "font-family",
      selectedFont,
    );
    await settingsCustomizations.goToChat();
    const welcomeText = await page.getByText("Let's get something started!");
    await expect(welcomeText).toHaveCSS("font-family", selectedFont);
  });

  test.skip("K4 - Clicking OpenFolder should open the Fonts folder", async ({}) => {});

  test("K5 - Font size should have a minimum of .82", async ({ page }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    await expect(settingsCustomizations.fontScalingSectionLabel).toHaveText(
      "Font Scaling",
    );
    await expect(settingsCustomizations.fontScalingSectionText).toHaveText(
      "Scale the font size up or down to your liking.",
    );

    await expect(settingsCustomizations.fontScalingSectionInput).toHaveValue(
      "1.00",
    );
    for (let i = 0; i < 10; i++) {
      await settingsCustomizations.fontScalingSectionDecreaseButton.click();
    }
    await expect(settingsCustomizations.fontScalingSectionInput).toHaveValue(
      "0.82",
    );
    await expect(settingsCustomizations.fontScalingSectionText).toHaveCSS(
      "font-size",
      "13.12px",
    );
  });

  test("K6, K7 - Font size should have a maximum of 1.50 and can be applied correctly everywhere through the app", async ({
    page,
  }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    await expect(settingsCustomizations.fontScalingSectionInput).toHaveValue(
      "1.00",
    );
    for (let i = 0; i < 20; i++) {
      await settingsCustomizations.fontScalingSectionIncreaseButton.click();
    }
    await expect(settingsCustomizations.fontScalingSectionInput).toHaveValue(
      "1.50",
    );
    await expect(settingsCustomizations.fontScalingSectionText).toHaveCSS(
      "font-size",
      "24px",
    );
  });

  test.skip("K8 - Clicking the moon button should change theme of the app from Dark to Light", async () => {});

  test("K9 - Themes dropdown should display Default", async ({ page }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    const expectedThemes = ["Default"];

    await expect(settingsCustomizations.themeSectionLabel).toHaveText("Theme");
    await expect(settingsCustomizations.themeSectionText).toHaveText(
      "Change the theme of the app.",
    );

    const numberOfDropdownThemes =
      await settingsCustomizations.themeSectionSelectorOption.count();
    expect(numberOfDropdownThemes).toEqual(1);
    await settingsCustomizations.validateThemeNames(expectedThemes);
  });

  test.skip("K10 - Themes folder button should open the themes folder", async () => {});

  test("K11 - Primary Colors should display expected values", async ({
    page,
  }) => {
    const expectedPrimaryColors = [
      "Neo Orbit",
      "Creamy Peach",
      "Neon Sunflower",
      "TV Character Purple",
      "Traffic Cone",
      "Firehouse",
      "Purple Mountain Majesty",
      "Rogue Pink",
      "Squeaky",
      "Apple Valley",
      "Pencil Lead",
    ];

    const settingsCustomizations = new SettingsCustomizations(page);
    await expect(settingsCustomizations.primaryColorSectionLabel).toHaveText(
      "Primary Color",
    );
    await expect(settingsCustomizations.primaryColorSectionText).toHaveText(
      "Change the primary color of the app.",
    );

    const numberOfColorSwatches =
      await settingsCustomizations.primaryColorSectionColorSwatchButton.count();
    expect(numberOfColorSwatches).toEqual(expectedPrimaryColors.length);
    await settingsCustomizations.validatePrimaryColors(expectedPrimaryColors);
  });

  test("K12 - Clicking Pick should open up the finetune color selector", async ({
    page,
  }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    await expect(settingsCustomizations.buttonCustomization).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await settingsCustomizations.primaryColorSectionPopUpButton.click();

    const customColorInput =
      settingsCustomizations.primaryColorSectionPopUpButton.getByLabel(
        "hex color",
      );
    const customColorPicker =
      settingsCustomizations.primaryColorSectionPopUpButton.locator(
        ".color-picker",
      );

    await expect(customColorPicker).toBeVisible();
    await customColorInput.clear();
    await customColorInput.fill("#ff8fb8");
    await settingsCustomizations.buttonCustomization.click({ force: true });
    await expect(settingsCustomizations.buttonCustomization).toHaveCSS(
      "background-color",
      "color(srgb 1 0.604706 0.749412)",
    );
  });

  test("K13 - Selected primary color should be applied throughout the entire app", async ({
    page,
  }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    const chatsMainPage = new ChatsMainPage(page);
    await expect(settingsCustomizations.buttonCustomization).toHaveCSS(
      "background-color",
      "color(srgb 0.371765 0.371765 1)",
    );
    await settingsCustomizations.selectColorSwatch("Traffic Cone");
    await expect(settingsCustomizations.buttonCustomization).toHaveCSS(
      "background-color",
      "rgb(255, 60, 0)",
    );
    await settingsCustomizations.goToChat();
    await expect(chatsMainPage.buttonAddFriends).toHaveCSS(
      "background-color",
      "rgb(255, 60, 0)",
    );
  });

  test("K14 - User should be able to add additional custom CSS to the application", async ({
    page,
  }) => {
    const settingsCustomizations = new SettingsCustomizations(page);
    await expect(settingsCustomizations.slimbar).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );

    await expect(settingsCustomizations.customCSSSectionLabel).toHaveText(
      "Custom CSS",
    );
    await expect(settingsCustomizations.customCSSSectionText).toHaveText(
      "Add additional custom CSS to the application.",
    );

    await settingsCustomizations.customCSSSectionTextArea.fill(
      ".slimbar {background-color: rgb(255, 0, 141)}",
    );

    await settingsCustomizations.buttonCustomization.click();
    await expect(settingsCustomizations.slimbar).toHaveCSS(
      "background-color",
      "rgb(255, 0, 141)",
    );

    await settingsCustomizations.goToChat();
    await expect(settingsCustomizations.slimbar).toHaveCSS(
      "background-color",
      "rgb(255, 0, 141)",
    );
  });
});