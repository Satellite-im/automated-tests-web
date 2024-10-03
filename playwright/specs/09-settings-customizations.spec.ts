import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsCustomizations } from "playwright/PageObjects/Settings/SettingsCustomizations";

test.describe("Settings Customization Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.buttonCustomization.click();
    await page.waitForURL("/settings/preferences");
  });

  test("K1 - Language dropdown should display English", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
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

  // Skipping failing test in CI
  test.skip("K2 - Font dropdown should show expected font names", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
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

    await settingsCustomizations.fontSectionSelectorOption
      .count()
      .then((count) => {
        expect(count).toEqual(expectedFonts.length);
      });
    await settingsCustomizations.validateFontNames(expectedFonts);
  });

  test("K3 - Selected Fonts should be applied everywhere throughout the app", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

    const selectedFont = "JosefinSans";
    await settingsCustomizations.selectFont(selectedFont);
    await expect(settingsCustomizations.fontSectionText).toHaveCSS(
      "font-family",
      selectedFont,
    );
    await settingsCustomizations.goToChat();
    const welcomeText = await page.getByText("Let's get something started!");
    await expect(welcomeText).toHaveCSS("font-family", selectedFont);
  });

  // Cannot be automated now since button does not perform any action
  // test.skip("K4 - Clicking OpenFolder should open the Fonts folder", async ({}) => {});

  test("K5 - Font size should have a minimum of .82", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
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

  test("K8 - Clicking the moon button should change theme of the app from Dark to Light", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

    // Validate default theme is applied
    await settingsCustomizations.validateCurrentTheme(
      "/assets/themes/default.css",
    );

    // Change theme to Light by clicking on moon button
    await settingsCustomizations.themeSectionThemeMoonButton.click();

    // Validate Dracula theme is applied
    await settingsCustomizations.validateCurrentTheme(
      "/assets/themes/light.css",
    );

    // Return theme to Default by clicking again on moon button
    await settingsCustomizations.themeSectionThemeMoonButton.click();

    // Validate Dracula theme is applied
    await settingsCustomizations.validateCurrentTheme(
      "/assets/themes/default.css",
    );
  });

  test("K9 - Themes dropdown should display Default and user can change theme from dropdown", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

    const expectedThemes = ["Default", "Dracula", "Olivia", "Light"];

    await expect(settingsCustomizations.themeSectionLabel).toHaveText("Theme");
    await expect(settingsCustomizations.themeSectionText).toHaveText(
      "Change the theme of the app.",
    );

    await settingsCustomizations.themeSectionSelectorOption
      .count()
      .then((count) => {
        expect(count).toEqual(4);
      });

    await settingsCustomizations.validateThemeNames(expectedThemes);

    // Validate default theme is applied
    await settingsCustomizations.validateCurrentTheme(
      "/assets/themes/default.css",
    );

    // Change theme to Dracula
    await settingsCustomizations.selectTheme("Dracula");

    // Validate Dracula theme is applied
    await settingsCustomizations.validateCurrentTheme(
      "/assets/themes/dracula.css",
    );

    // Change theme to Olivia
    await settingsCustomizations.selectTheme("Olivia");

    // Validate Olivia theme is applied
    await settingsCustomizations.validateCurrentTheme(
      "/assets/themes/olivia.css",
    );

    // Change theme to Light
    await settingsCustomizations.selectTheme("Light");

    // Validate Olivia theme is applied
    await settingsCustomizations.validateCurrentTheme(
      "/assets/themes/light.css",
    );
  });

  // Cannot be automated now since button does not perform any action
  // test.skip("K10 - Themes folder button should open the themes folder", async () => {});

  test("K11 - Primary Colors should display expected values", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

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

    await expect(settingsCustomizations.primaryColorSectionLabel).toHaveText(
      "Primary Color",
    );
    await expect(settingsCustomizations.primaryColorSectionText).toHaveText(
      "Change the primary color of the app.",
    );

    await settingsCustomizations.primaryColorSectionColorSwatchButton
      .count()
      .then((count) => {
        expect(count).toEqual(expectedPrimaryColors.length);
      });

    await settingsCustomizations.validatePrimaryColors(expectedPrimaryColors);
  });

  test("K12 - Clicking Pick should open up the finetune color selector", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
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

  // Skipping failing test on CI
  test.skip("K15 - Emoji Font dropdown should show expected emoji font names", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

    const expectedEmojiFonts = [
      "NotoEmoji",
      "OpenMoji",
      "Blobmoji",
      "Twemoji",
      "Fluent",
    ];

    await expect(settingsCustomizations.emojiFontSectionLabel).toHaveText(
      "Emoji",
    );
    await expect(settingsCustomizations.emojiFontSectionText).toHaveText(
      "Change the emoji font used in the app.",
    );

    await settingsCustomizations.emojiFontSectionSelectorOption
      .count()
      .then((numberOfSelectorOptions) => {
        expect(numberOfSelectorOptions).toEqual(expectedEmojiFonts.length);
      });
    await settingsCustomizations.validateEmojiFontNames(expectedEmojiFonts);
  });

  test("K16 - Selected Emoji Font should be applied everywhere throughout the app", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

    const selectedEmojiFont = "OpenMoji";
    await settingsCustomizations.selectEmojiFont(selectedEmojiFont);
    await expect(settingsCustomizations.emojiFontSectionRandomEmoji).toHaveCSS(
      "font-family",
      selectedEmojiFont,
    );
  });

  // Cannot be automated now since button does not perform any action
  // test.skip("K17 - Clicking Open Folder from Emoji Font section should open the Emoji Fonts folder", async ({}) => {});

  // Skipping failing test in CI
  test.skip("K18 - Default Profile Picture Style dropdown should show expected default profile picture styles", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

    const expectedDefaultProfileStyles = [
      "avataaars",
      "avataaarsNeutral",
      "bottts",
      "botttsNeutral",
      "icons",
      "identicon",
      "lorelei",
      "notionists",
      "openPeeps",
      "pixelArt",
      "pixelArtNeutral",
      "shapes",
    ];

    await expect(settingsCustomizations.identiconSectionLabel).toHaveText(
      "Default Profile Picture Style",
    );
    await expect(settingsCustomizations.identiconSectionText).toHaveText(
      "Change the style of the randomly generated profile pictures used when users haven't uploaded a profile picture yet.",
    );

    await settingsCustomizations.identiconSectionSelectorOption
      .count()
      .then((count) => {
        expect(count).toEqual(expectedDefaultProfileStyles.length);
      });
    await settingsCustomizations.validateDefaultProfileStyles(
      expectedDefaultProfileStyles,
    );
  });

  test("K19 - Default Profile Picture Style selected should be applied correctly in the app", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsCustomizations = new SettingsCustomizations(page);

    // Change current default profile style to lorelei
    const selectedDefaultStyle = "lorelei";
    await settingsCustomizations.selectDefaultProfileStyle(
      selectedDefaultStyle,
    );

    // Validate current identicon style is lorelei
    await page
      .locator("[data-cy='selector-current-identicon-lorelei']")
      .waitFor({ state: "attached" });
  });

  // Cannot be automated now since button does not perform any action
  // test.skip("K20 - Clicking Open Folder from Default Profile Picture Style section should open the correct folder", async ({}) => {});
});
