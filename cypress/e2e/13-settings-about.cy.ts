import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsAbout from "./PageObjects/Settings/SettingsAbout";
import createOrImport from "./PageObjects/CreateOrImport";
import saveRecoverySeed from "./PageObjects/SaveRecoverySeed";

const USERNAME =
  faker.person.firstName() + faker.number.int({ min: 100, max: 10000 });
const STATUS = faker.lorem.sentence(3);
const PIN = "1234";
const BASE_URL = "https://satellite.im/";
const VERSION = "0.2.5";
const GITHUB_URL = "https://github.com/Satellite-im";

describe("Settings - About", () => {
  // Reusable function for logging in and navigating to the About section
  const loginAndNavigateToAbout = () => {
    createOrImport.launchCleanApplication();
    createOrImport.clickCreateNewAccount();
    authNewAccount.createRandomUser(USERNAME, STATUS);
    loginPinPage.loginWithPin(PIN);
    saveRecoverySeed.clickOnSavedIt();
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAbout.click();
  };

  beforeEach(() => {
    loginAndNavigateToAbout();
  });

  it('R1 - "About Uplink" should appear at top of page', () => {
    cy.url().should("include", "/settings/about");
    // Label and texts for settings section are correct
    settingsAbout.aboutSectionLabel.should("have.text", "About");
    settingsAbout.aboutSectionText.should("have.text", "Uplink");
  });

  it("R2 - Current version of Uplink should be displayed", () => {
    // Label and texts for settings section are correct
    settingsAbout.versionSectionLabel.should("have.text", "Version");
    settingsAbout.versionSectionText.should("have.text", VERSION);
  });

  // Skipped since button is not performing any action now
  it.skip("R3 - Clicking Check for Updates should check for newest version of Uplink available", () => {
    settingsAbout.versionSectionButton.click();
  });

  it("R4 - Clicking Open Website should take you to the Uplink website", () => {
    // Label and texts for settings section are correct
    settingsAbout.websiteSectionLabel.should("have.text", "Website");
    settingsAbout.websiteSectionText.should(
      "have.text",
      "Open a new browser window to our official website.",
    );

    // Intercept window.open calls
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    // Click the button
    settingsAbout.websiteSectionButton.click();

    // Assert that window.open was called with the correct URL and target
    cy.get("@windowOpen").should("be.calledWith", BASE_URL, "_blank");
  });

  it("R5 - Clicking Open Source Code should take you to the source code", () => {
    // Label and texts for settings section are correct
    settingsAbout.openSourceCodeSectionLabel.should(
      "have.text",
      "Open Source Code",
    );
    settingsAbout.openSourceCodeSectionText.should(
      "have.text",
      "Open a new browser window to our open source repository.",
    );

    // Intercept window.open calls
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });

    // Click the button
    settingsAbout.openSourceCodeSectionButton.click();

    // Assert that window.open was called with the correct URL and target
    cy.get("@windowOpen").should("be.calledWith", GITHUB_URL, "_blank");
  });

  it("R6 and R7 - Made In header text, description and flags displayed", () => {
    // Label and texts for settings section are correct
    settingsAbout.madeInSectionLabel.should("have.text", "Made In");
    settingsAbout.madeInSectionText.should(
      "have.text",
      "Our team is all over the world with different backgrounds and different day-to-day lives all working on a common goal to build this app.",
    );

    // Validate flags displayed are correct in made in section
    settingsAbout.madeInSectionFlags.should(
      "have.text",
      "🇺🇸 🇮🇹 🇩🇪 🇵🇹 🇧🇷 🇺🇦 🇧🇾 🇯🇵 🇦🇺 🇮🇩 🇲🇽 🇨🇦",
    );
  });

  it("R8 - Clicking DevMode button 10 times should enable DevMode", () => {
    // Label and texts for settings section are correct
    settingsAbout.devModeSectionLabel.should("have.text", "DevMode");
    settingsAbout.devModeSectionText.should(
      "have.text",
      "Click 10 times to enable developer settings.",
    );

    // Open DevMode
    settingsAbout.openDevMode();

    cy.url().should("include", "/settings/developer");
  });
});
