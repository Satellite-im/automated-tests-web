import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsCustomizations from "./PageObjects/Settings/SettingsCustomizations";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Customization", () => {
  const username =
    faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
  const status = faker.lorem.sentence(3);
  const pin = "1234";

  beforeEach(() => {
    // Login and setup user before each test
    loginPinPage.loginWithPin(pin);
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonCustomization.click();
  });

  const assertLabelAndText = (
    label: any,
    text: any,
    labelDescription: string,
    textDescription: string,
  ) => {
    cy.assertText(
      label,
      labelDescription,
      `${labelDescription} label should be present`,
    );
    cy.assertText(
      text,
      textDescription,
      `${textDescription} text should be present`,
    );
  };

  it("K1 - Language dropdown should display English", () => {
    assertLabelAndText(
      settingsCustomizations.appLanguageSectionLabel,
      settingsCustomizations.appLanguageSectionText,
      "App Language",
      "Change language.",
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
    assertLabelAndText(
      settingsCustomizations.fontSectionLabel,
      settingsCustomizations.fontSectionText,
      "Font",
      "Change the font used in the app.",
    );
    settingsCustomizations.fontSectionSelectorOption.should(
      "have.length",
      expectedFonts.length,
    );
    settingsCustomizations.validateFontNames(expectedFonts);
  });

  it("K3 - Selected Fonts should be applied everywhere throughout the app", () => {
    const selectedFont = "JosefinSans";
    settingsCustomizations.selectFont(selectedFont);
    settingsCustomizations.fontSectionText.should(
      "have.css",
      "font-family",
      selectedFont,
    );
    settingsCustomizations.goToChat();
    cy.contains("Let's get something started!").should(
      "have.css",
      "font-family",
      selectedFont,
    );
  });

  it.skip("K4 - Clicking OpenFolder should open the Fonts folder", () => {});

  // Skipped since a new bug was introduced for this test and font size is not refreshing after changing the font
  it.skip("K5 - Font size should have a minimum of .82", () => {
    assertLabelAndText(
      settingsCustomizations.fontScalingSectionLabel,
      settingsCustomizations.fontScalingSectionText,
      "Font Scaling",
      "Scale the font size up or down to your liking.",
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

  // Skipped since a new bug was introduced for this test and font size is not refreshing after changing the font
  it.skip("K6, K7 - Font size should have a maximum of 1.50 and can be applied correctly everywhere through the app", () => {
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
    assertLabelAndText(
      settingsCustomizations.themeSectionLabel,
      settingsCustomizations.themeSectionText,
      "Theme",
      "Change the theme of the app.",
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
    assertLabelAndText(
      settingsCustomizations.primaryColorSectionLabel,
      settingsCustomizations.primaryColorSectionText,
      "Primary Color",
      "Change the primary color of the app.",
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

  it("K14 - User should be able to add additional custom CSS to the application", () => {
    settingsCustomizations.slimbar.should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
    assertLabelAndText(
      settingsCustomizations.customCSSSectionLabel,
      settingsCustomizations.customCSSSectionText,
      "Custom CSS",
      "Add additional custom CSS to the application.",
    );
    settingsCustomizations.customCSSSectionTextArea.type(
      ".slimbar {background-color: rgb(255, 0, 141)}",
      { parseSpecialCharSequences: false },
    );
    settingsCustomizations.buttonCustomization.click();
    settingsCustomizations.slimbar.should(
      "have.css",
      "background-color",
      "rgb(255, 0, 141)",
    );
    settingsCustomizations.goToChat();
    chatsMain.slimbar.should(
      "have.css",
      "background-color",
      "rgb(255, 0, 141)",
    );
  });
});
