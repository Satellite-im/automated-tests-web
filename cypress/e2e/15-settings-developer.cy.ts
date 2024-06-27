import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsAbout from "./PageObjects/Settings/SettingsAbout";
import settingsDeveloper from "./PageObjects/Settings/SettingsDeveloper";

describe("Settings - Developer Mode", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAbout.click();
  });

  it("T1, T2 - Clicking Exit Devmode should exit user out of Devmode", () => {
    // Open DevMode
    settingsAbout.openDevMode();
    cy.url().should("include", "/settings/developer");

    // Validate header and description texts
    settingsDeveloper.devModeSectionLabel.should("have.text", "Devmode");
    settingsDeveloper.devModeSectionText.should(
      "have.text",
      "Disable devmode.",
    );

    // Click on Exit DevMode
    settingsDeveloper.devModeSectionButton.click();
    settingsDeveloper.devModeSectionButton.should("not.exist");
    cy.url().should("include", "/settings/about");
  });

  it("T3 - Clicking Load MockData should load all mock data throughout app", () => {
    // Open DevMode
    settingsAbout.openDevMode();
    cy.url().should("include", "/settings/developer");

    // Validate header and description texts
    settingsDeveloper.loadMockSectionLabel.should("have.text", "Load Mock");
    settingsDeveloper.loadMockSectionText.should(
      "have.text",
      "Loads mock data into state.",
    );

    // Click on Load Mock
    settingsDeveloper.loadMockSectionButton.click();

    // Favorites bubble from mock is added to slimbar
    settingsDeveloper.slimbar.find(".fave").should("exist");

    // Mock data is loaded into chats
    settingsDeveloper.goToChat();
    chatsMain.sidebar.find(".chat-preview").should("have.length", 6);
  });

  // Skipped since button is not performing any action now
  it.skip("T4 - Clicking Clear State should clear users state", () => {
    // Open DevMode
    settingsAbout.openDevMode();
    cy.url().should("include", "/settings/developer");

    // Validate header and description texts
    settingsDeveloper.clearStateSectionLabel.should("have.text", "Clear State");
    settingsDeveloper.clearStateSectionText.should(
      "have.text",
      "Reset the application state.",
    );

    // Click on Clear State
    settingsDeveloper.clearStateSectionButton.click();
  });

  it("T5 - Highlighted border should appear around Exit DevMode when clicked", () => {
    // Open DevMode
    settingsAbout.openDevMode();
    cy.url().should("include", "/settings/developer");

    // Focus on Exit DevMode
    settingsDeveloper.devModeSectionButton.focus();

    // Validate that the border color changes to blue
    settingsDeveloper.devModeSectionButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  it("T6 - Highlighted border should appear around Load MockData when clicked", () => {
    // Open DevMode
    settingsAbout.openDevMode();
    cy.url().should("include", "/settings/developer");

    // Click on Load Mock Data button
    settingsDeveloper.loadMockSectionButton.click();

    // Validate that the border color changes to blue
    settingsDeveloper.loadMockSectionButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  it("T7 - Highlighted border should appear around Clear State when clicked", () => {
    // Open DevMode
    settingsAbout.openDevMode();
    cy.url().should("include", "/settings/developer");

    // Click on Clear State button
    settingsDeveloper.clearStateSectionButton.focus();

    // Validate that the border color changes to blue
    settingsDeveloper.clearStateSectionButton.should(
      "have.css",
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  it("T8 - Clicking Test Voice State should open debug voice page", () => {
    // Open DevMode
    settingsAbout.openDevMode();
    cy.url().should("include", "/settings/developer");

    // Validate header and description texts
    settingsDeveloper.testVoiceSectionLabel.should("have.text", "Test Voice");
    settingsDeveloper.testVoiceSectionText.should("have.text", "Dev Voice");

    // Click on Test Voice
    settingsDeveloper.testVoiceSectionButton.click();

    // Validate that the URL is redirected correctly
    cy.url().should("include", "/developer/debug/voice");
  });
});
