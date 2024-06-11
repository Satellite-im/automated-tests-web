import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMainPage from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsCustomizations from "./PageObjects/Settings/SettingsCustomizations";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Customization", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMainPage.validateChatsMainPageIsShown();
    chatsMainPage.goToSettings();
    settingsProfile.buttonCustomization.click();
  });

  it("K1 - Language dropdown should display English", () => {
    settingsCustomizations.appLanguageSectionLabel.should(
      "have.text",
      "App Language",
    );
    settingsCustomizations.appLanguageSectionText.should(
      "have.text",
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
    const expectedFonts: string[] = [
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
    settingsCustomizations.fontSectionLabel.should("have.text", "Font");
    settingsCustomizations.fontSectionText.should(
      "have.text",
      "Change the font used in the app.",
    );
    settingsCustomizations.fontSectionSelectorOption.should("have.length", 16);
    settingsCustomizations.validateFontNames(expectedFonts);
  });

  it("K3 - Selected Fonts should be applied everywhere throughout the app", () => {
    cy.get('[data-cy="selector-current-font-poppins"]')
      .find("select")
      .select("JosefinSans");
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

  // Cannot be tested for now since its not working on Uplink Web
  it.skip("K4 - Clicking OpenFolder should open the Fonts folder", () => {});

  it.skip("K5 - Font size should have a minimum of .82", () => {
    // Test code for K5
  });

  it.skip("K6 - Font size should have a maximum of 1.50", () => {
    // Test code for K6
  });

  it.skip("K7 - Font size should be applied correctly everywhere through the app", () => {
    // Test code for K7
  });

  it.skip("K8 - Clicking the moon button should change theme of the app from Dark to Light", () => {
    // Test code for K8
  });

  // Cannot be tested for now since its not working on Uplink Web
  it.skip("K9 - Themes dropdown should display Default", () => {
    // Test code for K9
  });

  it.skip("K10 - Themes folder button should open the themes folder", () => {
    // Test code for K10
  });

  it.skip("K11 - Primary Colors should display: Neo Orbit, Creamy Peach, Neon Sunflower, TV Character Purple, Traffic cone, Fire House, Purple Mountain Majesty, Rogue Pink, Squeaky, Apple Valley, Pencil Lead", () => {
    // Test code for K11
  });

  it.skip("K12 - Clicking Pick should open up the finetune color selector", () => {
    // Test code for K12
  });

  it.skip("K13 - Selected primary color should be applied throughout the entire app", () => {
    // Test code for K13
  });

  it.skip("K14 - User should be able to add additional custom CSS to the application", () => {
    // Test code for K14
  });
});
