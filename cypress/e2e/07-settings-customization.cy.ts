import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsCustomizations from "./PageObjects/Settings/SettingsCustomizations";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Customization", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonCustomization.click();
  });

  it("K1 - Language dropdown should display English", () => {
    cy.assertText(
      settingsCustomizations.appLanguageSectionLabel,
      "App Language",
      "App Language label should be present",
    );
    cy.assertText(
      settingsCustomizations.appLanguageSectionText,
      "Change language.",
      "App Language text should be present",
    );
    settingsCustomizations.appLanguageSectionSelectorOption.should(
      "have.length",
      1,
    );
    settingsCustomizations.appLanguageSectionSelectorOption
      .should("have.value", "english")
      .and("have.text", "English (USA)");
  });

  it("K2 - Font dropdown should show expected font names", () => {
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
    cy.assertText(
      settingsCustomizations.fontSectionLabel,
      "Font",
      "Font label should be present",
    );
    cy.assertText(
      settingsCustomizations.fontSectionText,
      "Change the font used in the app.",
      "Font text should be present",
    );
    settingsCustomizations.fontSectionSelectorOption.should(
      "have.length",
      expectedFonts.length,
    );
    settingsCustomizations.validateFontNames(expectedFonts);
  });

  it("K3 - Selected Fonts should be applied everywhere throughout the app", () => {
    settingsCustomizations.selectFont("JosefinSans");
    settingsCustomizations.fontSectionText.should(
      "have.css",
      "font-family",
      "JosefinSans",
    );
    settingsCustomizations.goToChat();
    cy.contains("Let's get something started!").should(
      "have.css",
      "font-family",
      "JosefinSans",
    );
  });

  it.skip("K4 - Clicking OpenFolder should open the Fonts folder", () => {});

  it("K5 - Font size should have a minimum of .82", () => {
    cy.assertText(
      settingsCustomizations.fontScalingSectionLabel,
      "Font Scaling",
      "Font Scaling label should be present",
    );
    cy.assertText(
      settingsCustomizations.fontScalingSectionText,
      "Scale the font size up or down to your liking.",
      "Font Scaling text should be present",
    );
    settingsCustomizations.fontScalingSectionInput.should("have.value", "1.00");

    for (let i = 0; i < 10; i++) {
      settingsCustomizations.fontScalingSectionDecreaseButton.click();
    }

    settingsCustomizations.fontScalingSectionInput.should("have.value", "0.82");
    settingsCustomizations.fontScalingSectionText.should(
      "have.css",
      "font-size",
      "13.12px",
    );
  });

  it("K6, K7 - Font size should have a maximum of 1.50 and can be applied correctly everywhere through the app", () => {
    settingsCustomizations.fontScalingSectionInput.should("have.value", "1.00");

    for (let i = 0; i < 20; i++) {
      settingsCustomizations.fontScalingSectionIncreaseButton.click();
    }

    settingsCustomizations.fontScalingSectionInput.should("have.value", "1.50");
    settingsCustomizations.fontScalingSectionText.should(
      "have.css",
      "font-size",
      "24px",
    );
    settingsCustomizations.goToChat();
    cy.contains("Let's get something started!").should(
      "have.css",
      "font-size",
      "24px",
    );
  });

  it.skip("K8 - Clicking the moon button should change theme of the app from Dark to Light", () => {});

  it("K9 - Themes dropdown should display Default", () => {
    const expectedThemes = ["Default"];
    cy.assertText(
      settingsCustomizations.themeSectionLabel,
      "Theme",
      "Theme label should be present",
    );
    cy.assertText(
      settingsCustomizations.themeSectionText,
      "Change the theme of the app.",
      "Theme text should be present",
    );
    settingsCustomizations.themeSectionSelectorOption.should("have.length", 1);
    settingsCustomizations.validateThemes(expectedThemes);
  });

  it.skip("K10 - Themes folder button should open the themes folder", () => {});

  it("K11 - Primary Colors should display expected values", () => {
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
    cy.assertText(
      settingsCustomizations.primaryColorSectionLabel,
      "Primary Color",
      "Primary Color label should be present",
    );
    cy.assertText(
      settingsCustomizations.primaryColorSectionText,
      "Change the primary color of the app.",
      "Primary Color text should be present",
    );
    settingsCustomizations.primaryColorSectionColorSwatchButton.should(
      "have.length",
      expectedPrimaryColors.length,
    );
    settingsCustomizations.validatePrimaryColors(expectedPrimaryColors);
  });

  it("K12 - Clicking Pick should open up the finetune color selector", () => {
    settingsCustomizations.primaryColorSectionPopUpButton.click();
    settingsCustomizations.customColorPicker.should("be.visible");
    settingsCustomizations.customColorInput.clear().type("#ff8fb8");
    settingsCustomizations.buttonCustomization.click({ force: true });
    settingsCustomizations.buttonCustomization.should(
      "have.css",
      "background-color",
      "rgb(255, 143, 184)",
    );
  });

  it("K13 - Selected primary color should be applied throughout the entire app", () => {
    settingsCustomizations.buttonCustomization.should(
      "have.css",
      "background-color",
      "rgb(77, 77, 255)",
    );

    settingsCustomizations.selectColorSwatch("Traffic Cone");
    settingsCustomizations.buttonCustomization.should(
      "have.css",
      "background-color",
      "rgb(255, 60, 0)",
    );

    settingsCustomizations.goToChat();
    chatsMain.buttonAddFriends.should(
      "have.css",
      "background-color",
      "rgb(255, 60, 0)",
    );
  });

  // Skipping due to animations bug introduced for mobile changes - GH issue # to be added
  it.skip("K14 - User should be able to add additional custom CSS to the application", () => {
    settingsCustomizations.sidebar.should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
    cy.assertText(
      settingsCustomizations.customCSSSectionLabel,
      "Custom CSS",
      "Custom CSS label should be present",
    );
    cy.assertText(
      settingsCustomizations.customCSSSectionText,
      "Add additional custom CSS to the application.",
      "Custom CSS text should be present",
    );
    settingsCustomizations.customCSSSectionTextArea.type(
      ".sidebar {background-color: rgb(255, 0, 141)}",
      { parseSpecialCharSequences: false },
    );
    settingsCustomizations.buttonCustomization.click();
    settingsCustomizations.sidebar.should(
      "have.css",
      "background-color",
      "rgb(255, 0, 141)",
    );

    settingsCustomizations.goToChat();
    chatsMain.sidebar.should(
      "have.css",
      "background-color",
      "rgb(255, 0, 141)",
    );
  });
});
